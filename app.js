/* =========================================================
   HireWave  app.js
   Wires up: search, filters, sort, save, full JD modal,
   categories, trending chips, and stats.
   ========================================================= */
(function () {
  "use strict";

  const jobs = (window.JOBS || []).slice();

  // ---------- State ----------
  const SAVED_KEY = "hirewave:saved";
  const APPLIED_KEY = "hirewave:applied";

  const state = {
    keyword: "",
    location: "",
    expRange: "",
    workModes: new Set(),
    departments: new Set(),
    types: new Set(),
    minSalaryLpa: 0,
    sort: "recent",
    saved: loadSet(SAVED_KEY),
    applied: loadSet(APPLIED_KEY),
  };

  function loadSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch (_) {
      return new Set();
    }
  }
  function persistSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }

  // ---------- DOM ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const els = {
    form: $("#searchForm"),
    keyword: $("#searchKeyword"),
    location: $("#searchLocation"),
    experience: $("#searchExperience"),
    list: $("#jobsList"),
    empty: $("#emptyState"),
    emptyClear: $("#emptyClear"),
    title: $("#resultsTitle"),
    meta: $("#resultsMeta"),
    sortBy: $("#sortBy"),
    activeChips: $("#activeChips"),
    clearFilters: $("#clearFilters"),
    salaryRange: $("#salaryRange"),
    salaryReadout: $("#salaryReadout"),
    savedBtn: $("#savedBtn"),
    savedCount: $("#savedCount"),
    modal: $("#jobModal"),
    modalContent: $("#modalContent"),
    toast: $("#toast"),
    allCount: $("#allCount"),
  };

  // ---------- Helpers ----------
  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }

  function workModeTagClass(mode) {
    return (
      { Remote: "remote", Hybrid: "hybrid", Onsite: "onsite" }[mode] || ""
    );
  }

  function postedLabel(days) {
    if (days <= 0) return "Posted today";
    if (days === 1) return "Posted 1 day ago";
    if (days < 7) return `Posted ${days} days ago`;
    if (days < 14) return "Posted last week";
    if (days < 30) return `Posted ${Math.floor(days / 7)} weeks ago`;
    return `Posted ${Math.floor(days / 30)} months ago`;
  }

  function expLabel(exp) {
    if (!exp) return "";
    if (exp.max <= 1) return "0  1 yrs";
    return `${exp.min}  ${exp.max} yrs`;
  }

  function salaryLabel(s) {
    if (!s) return "Not disclosed";
    return `${s.min}  ${s.max} ${s.currency}`;
  }

  // The dataset uses both LPA and K/month. Normalize to a comparable LPA-ish
  // value for filtering by min salary slider (which is in LPA).
  function minSalaryInLpa(s) {
    if (!s) return 0;
    if (s.currency === "LPA") return s.min;
    if (s.currency === "K/month") return (s.min * 12) / 100; // 60K/m  7.2 LPA
    return s.min;
  }

  function expRangeMatches(jobExp, range) {
    if (!range) return true;
    const mid = (jobExp.min + jobExp.max) / 2;
    if (range === "0-1") return jobExp.min <= 1;
    if (range === "1-3") return mid >= 1 && jobExp.min <= 3;
    if (range === "3-6") return mid >= 3 && jobExp.min <= 6;
    if (range === "6-10") return mid >= 6 && jobExp.min <= 10;
    if (range === "10+") return jobExp.max >= 10;
    return true;
  }

  function locationMatches(jobLoc, query) {
    if (!query) return true;
    const q = query.trim().toLowerCase();
    return jobLoc.toLowerCase().includes(q);
  }

  function keywordMatches(job, query) {
    if (!query) return true;
    const q = query.trim().toLowerCase();
    const haystack = [
      job.title,
      job.company,
      job.summary,
      job.department,
      ...(job.skills || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  }

  // ---------- Filtering & Sorting ----------
  function filteredJobs() {
    return jobs.filter((j) => {
      if (!keywordMatches(j, state.keyword)) return false;
      if (!locationMatches(j.location, state.location)) return false;
      if (!expRangeMatches(j.experience, state.expRange)) return false;
      if (state.workModes.size && !state.workModes.has(j.workMode)) return false;
      if (state.departments.size && !state.departments.has(j.department)) return false;
      if (state.types.size && !state.types.has(j.type)) return false;
      if (state.minSalaryLpa > 0 && minSalaryInLpa(j.salary) < state.minSalaryLpa)
        return false;
      return true;
    });
  }

  function sortedJobs(list) {
    const out = list.slice();
    switch (state.sort) {
      case "salaryDesc":
        out.sort((a, b) => minSalaryInLpa(b.salary) - minSalaryInLpa(a.salary));
        break;
      case "salaryAsc":
        out.sort((a, b) => minSalaryInLpa(a.salary) - minSalaryInLpa(b.salary));
        break;
      case "applicants":
        out.sort((a, b) => a.applicants - b.applicants);
        break;
      case "recent":
      default:
        out.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }
    // Featured floats up within the same sort bucket (recent only).
    if (state.sort === "recent") {
      out.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return out;
  }

  // ---------- Rendering ----------
  function jobCardHtml(job) {
    const isSaved = state.saved.has(job.id);
    const isApplied = state.applied.has(job.id);
    return `
      <article
        class="job-card ${job.featured ? "featured" : ""}"
        data-job-id="${job.id}"
        tabindex="0"
        role="button"
        aria-label="View job ${job.title} at ${job.company}"
      >
        <div class="job-logo" style="--logo:${job.logoColor}">${initials(job.company)}</div>

        <div class="job-head">
          <div class="job-title">${job.title}</div>
          <div class="job-company">
            <strong>${job.company}</strong> <span style="color:var(--text-subtle)"></span> ${job.companyTag}
          </div>
        </div>

        <div class="job-action">
          <button
            class="icon-btn save-btn"
            type="button"
            aria-pressed="${isSaved ? "true" : "false"}"
            aria-label="${isSaved ? "Unsave job" : "Save job"}"
            data-action="save"
            data-job-id="${job.id}"
            title="${isSaved ? "Saved" : "Save"}"
          >${bookmarkIcon(isSaved)}</button>
        </div>

        <p class="job-summary">${job.summary}</p>

        <div class="job-meta">
          <span class="meta-item"> <strong>${job.location}</strong></span>
          <span class="meta-item"> ${expLabel(job.experience)}</span>
          <span class="meta-item"> ${salaryLabel(job.salary)}</span>
          <span class="meta-item"> ${job.department}</span>
          <span class="tag ${workModeTagClass(job.workMode)}">${job.workMode}</span>
          ${job.type === "Internship" ? `<span class="tag intern">Internship</span>` : ""}
        </div>

        <div class="job-skills">
          ${job.skills.map((s) => `<span class="skill">${s}</span>`).join("")}
        </div>

        <div class="job-footer">
          <span class="applied">
             ${postedLabel(job.postedDaysAgo)}
            <span class="dot"></span>
            ${job.applicants} applicants
          </span>
          <span class="footer-actions">
            ${
              isApplied
                ? `<span class="tag" style="background:var(--green-50);color:var(--green-600)"> Applied</span>`
                : ""
            }
            <button class="btn btn-outline" data-action="view" data-job-id="${job.id}">View details</button>
            <button class="btn btn-primary" data-action="apply" data-job-id="${job.id}">${
              isApplied ? "Applied" : "Apply now"
            }</button>
          </span>
        </div>
      </article>
    `;
  }

  function bookmarkIcon(filled) {
    return `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z"
          fill="${filled ? "currentColor" : "none"}"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
    `;
  }

  function render() {
    const filtered = sortedJobs(filteredJobs());
    els.list.innerHTML = filtered.map(jobCardHtml).join("");
    els.empty.hidden = filtered.length !== 0;
    els.list.style.display = filtered.length === 0 ? "none" : "";

    // Title + meta
    const total = jobs.length;
    if (filtered.length === total) {
      els.title.textContent = "All jobs";
      els.meta.textContent = `Showing ${total} live roles`;
    } else {
      els.title.textContent = "Filtered jobs";
      els.meta.textContent = `${filtered.length} of ${total} roles match your filters`;
    }

    renderActiveChips();
    renderSavedCount();
  }

  function renderActiveChips() {
    const chips = [];
    if (state.keyword) chips.push({ label: `"${state.keyword}"`, clear: () => (state.keyword = "", els.keyword.value = "") });
    if (state.location) chips.push({ label: ` ${state.location}`, clear: () => (state.location = "", els.location.value = "") });
    if (state.expRange) {
      const map = {
        "0-1": "Fresher",
        "1-3": "1  3 yrs",
        "3-6": "3  6 yrs",
        "6-10": "6  10 yrs",
        "10+": "10+ yrs",
      };
      chips.push({
        label: `Exp: ${map[state.expRange]}`,
        clear: () => {
          state.expRange = "";
          els.experience.value = "";
          const radio = $('input[name="expRange"][value=""]');
          if (radio) radio.checked = true;
        },
      });
    }
    state.workModes.forEach((m) =>
      chips.push({ label: m, clear: () => toggleSetValue(state.workModes, m, "workMode") })
    );
    state.departments.forEach((d) =>
      chips.push({ label: d, clear: () => toggleSetValue(state.departments, d, "department") })
    );
    state.types.forEach((t) =>
      chips.push({ label: t, clear: () => toggleSetValue(state.types, t, "type") })
    );
    if (state.minSalaryLpa > 0)
      chips.push({
        label: `${state.minSalaryLpa}+ LPA`,
        clear: () => {
          state.minSalaryLpa = 0;
          els.salaryRange.value = 0;
          els.salaryReadout.textContent = "0 LPA+";
        },
      });

    els.activeChips.innerHTML = chips
      .map(
        (c, i) => `
          <span class="active-chip">
            ${c.label}
            <button type="button" data-chip-clear="${i}" aria-label="Remove filter ${c.label}"></button>
          </span>
        `
      )
      .join("");

    $$("[data-chip-clear]", els.activeChips).forEach((btn) =>
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-chip-clear"));
        chips[idx].clear();
        render();
      })
    );
  }

  function toggleSetValue(set, value, inputName) {
    if (set.has(value)) set.delete(value);
    else set.add(value);
    const cb = $(`input[name="${inputName}"][value="${value}"]`);
    if (cb) cb.checked = set.has(value);
  }

  function renderSavedCount() {
    const n = state.saved.size;
    els.savedCount.textContent = n;
    els.savedCount.hidden = n === 0;
  }

  // ---------- Modal (full JD) ----------
  function openJob(jobId) {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    const isSaved = state.saved.has(job.id);
    const isApplied = state.applied.has(job.id);

    els.modalContent.innerHTML = `
      <div class="jd-header">
        <div class="jd-logo" style="--logo:${job.logoColor}">${initials(job.company)}</div>
        <div>
          <div class="jd-title">${job.title}</div>
          <div class="jd-company">
            <strong>${job.company}</strong>  ${job.companyTag}
          </div>
        </div>
      </div>

      <div class="jd-meta">
        <span class="meta-item"> <strong>${job.location}</strong></span>
        <span class="meta-item"> <strong>${expLabel(job.experience)}</strong></span>
        <span class="meta-item"> <strong>${salaryLabel(job.salary)}</strong></span>
        <span class="meta-item"> <strong>${job.department}</strong></span>
        <span class="tag ${workModeTagClass(job.workMode)}">${job.workMode}</span>
        ${job.type === "Internship" ? `<span class="tag intern">Internship</span>` : ""}
      </div>

      <div class="jd-meta" style="margin-top:8px;color:var(--text-subtle);font-size:13px">
        <span> ${postedLabel(job.postedDaysAgo)}</span>
        <span> ${job.applicants} applicants</span>
      </div>

      <div class="jd-actions">
        <button class="btn btn-primary btn-lg" data-action="apply" data-job-id="${job.id}">
          ${isApplied ? "Applied " : "Apply now"}
        </button>
        <button class="btn btn-outline" data-action="save" data-job-id="${job.id}" aria-pressed="${isSaved}">
          ${isSaved ? "Saved" : "Save job"}
        </button>
        <button class="btn btn-ghost" data-action="share" data-job-id="${job.id}">Share</button>
      </div>

      <section class="jd-section">
        <h3>About the role</h3>
        <p>${job.summary}</p>
      </section>

      <section class="jd-section">
        <h3>About ${job.company}</h3>
        <p>${job.about}</p>
      </section>

      <section class="jd-section">
        <h3>What you'll do</h3>
        <ul class="jd-list">
          ${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}
        </ul>
      </section>

      <section class="jd-section">
        <h3>What we're looking for</h3>
        <ul class="jd-list">
          ${job.requirements.map((r) => `<li>${r}</li>`).join("")}
        </ul>
      </section>

      ${
        job.niceToHave && job.niceToHave.length
          ? `<section class="jd-section">
              <h3>Nice to have</h3>
              <ul class="jd-list">
                ${job.niceToHave.map((r) => `<li>${r}</li>`).join("")}
              </ul>
            </section>`
          : ""
      }

      <section class="jd-section">
        <h3>Skills</h3>
        <div class="jd-skills">
          ${job.skills.map((s) => `<span class="skill">${s}</span>`).join("")}
        </div>
      </section>

      <section class="jd-section">
        <h3>Benefits</h3>
        <ul class="jd-list">
          ${job.benefits.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </section>

      <section class="jd-section">
        <div class="jd-actions">
          <button class="btn btn-primary btn-lg" data-action="apply" data-job-id="${job.id}">
            ${isApplied ? "Applied " : "Apply for this role"}
          </button>
          <button class="btn btn-outline" data-action="save" data-job-id="${job.id}">
            ${isSaved ? "Saved" : "Save for later"}
          </button>
        </div>
      </section>
    `;

    els.modal.hidden = false;
    document.body.style.overflow = "hidden";
    // focus the close button for a11y
    setTimeout(() => $(".modal-close", els.modal)?.focus(), 0);
  }

  function closeModal() {
    els.modal.hidden = true;
    document.body.style.overflow = "";
  }

  // ---------- Toast ----------
  let toastTimer = null;
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("visible"), 1800);
  }

  // ---------- Actions ----------
  function handleAction(action, jobId) {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    switch (action) {
      case "save": {
        if (state.saved.has(jobId)) {
          state.saved.delete(jobId);
          toast(`Removed "${job.title}" from saved`);
        } else {
          state.saved.add(jobId);
          toast(`Saved "${job.title}"`);
        }
        persistSet(SAVED_KEY, state.saved);
        // re-render: card list and (if open) modal
        render();
        if (!els.modal.hidden) openJob(jobId);
        break;
      }
      case "apply": {
        if (state.applied.has(jobId)) {
          toast("You've already applied to this role");
          return;
        }
        state.applied.add(jobId);
        persistSet(APPLIED_KEY, state.applied);
        toast(`Application sent to ${job.company} `);
        render();
        if (!els.modal.hidden) openJob(jobId);
        break;
      }
      case "view": {
        openJob(jobId);
        break;
      }
      case "share": {
        const url = location.href.split("#")[0] + "#job=" + jobId;
        if (navigator.share) {
          navigator.share({ title: `${job.title}  ${job.company}`, url }).catch(() => {});
        } else {
          navigator.clipboard?.writeText(url);
          toast("Link copied to clipboard");
        }
        break;
      }
    }
  }

  // ---------- Event wiring ----------
  function wire() {
    // Search submit
    els.form.addEventListener("submit", (e) => {
      e.preventDefault();
      state.keyword = els.keyword.value.trim();
      state.location = els.location.value.trim();
      state.expRange = els.experience.value;
      // Sync the radio set in the sidebar
      const radio = $(`input[name="expRange"][value="${state.expRange}"]`);
      if (radio) radio.checked = true;
      render();
      // Scroll to results
      document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    // Live update keyword/location with light debounce
    let kt;
    [els.keyword, els.location].forEach((input) => {
      input.addEventListener("input", () => {
        clearTimeout(kt);
        kt = setTimeout(() => {
          state.keyword = els.keyword.value.trim();
          state.location = els.location.value.trim();
          render();
        }, 220);
      });
    });

    // Trending chips
    $$(".chip[data-trend]").forEach((chip) =>
      chip.addEventListener("click", () => {
        els.keyword.value = chip.dataset.trend;
        els.form.dispatchEvent(new Event("submit"));
      })
    );

    // Filter checkboxes
    $$('input[name="workMode"]').forEach((cb) =>
      cb.addEventListener("change", () => {
        cb.checked ? state.workModes.add(cb.value) : state.workModes.delete(cb.value);
        render();
      })
    );
    $$('input[name="department"]').forEach((cb) =>
      cb.addEventListener("change", () => {
        cb.checked ? state.departments.add(cb.value) : state.departments.delete(cb.value);
        render();
      })
    );
    $$('input[name="type"]').forEach((cb) =>
      cb.addEventListener("change", () => {
        cb.checked ? state.types.add(cb.value) : state.types.delete(cb.value);
        render();
      })
    );
    $$('input[name="expRange"]').forEach((r) =>
      r.addEventListener("change", () => {
        state.expRange = r.value;
        els.experience.value = r.value;
        render();
      })
    );

    // Salary range
    els.salaryRange.addEventListener("input", () => {
      const v = Number(els.salaryRange.value);
      state.minSalaryLpa = v;
      els.salaryReadout.textContent = `${v} LPA+`;
    });
    els.salaryRange.addEventListener("change", render);

    // Sort
    els.sortBy.addEventListener("change", () => {
      state.sort = els.sortBy.value;
      render();
    });

    // Clear filters
    function clearAll() {
      state.keyword = "";
      state.location = "";
      state.expRange = "";
      state.workModes.clear();
      state.departments.clear();
      state.types.clear();
      state.minSalaryLpa = 0;
      state.sort = "recent";

      els.keyword.value = "";
      els.location.value = "";
      els.experience.value = "";
      els.salaryRange.value = 0;
      els.salaryReadout.textContent = "0 LPA+";
      els.sortBy.value = "recent";
      $$('input[type="checkbox"]', document).forEach((cb) => (cb.checked = false));
      const anyRadio = $('input[name="expRange"][value=""]');
      if (anyRadio) anyRadio.checked = true;
      render();
    }
    els.clearFilters.addEventListener("click", clearAll);
    els.emptyClear.addEventListener("click", clearAll);

    // Card delegated clicks (view, apply, save) and card click  open
    els.list.addEventListener("click", (e) => {
      const actionEl = e.target.closest("[data-action]");
      if (actionEl) {
        e.stopPropagation();
        const action = actionEl.dataset.action;
        const id = actionEl.dataset.jobId;
        handleAction(action, id);
        return;
      }
      const card = e.target.closest(".job-card");
      if (card) openJob(card.dataset.jobId);
    });
    els.list.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".job-card");
      if (card) {
        e.preventDefault();
        openJob(card.dataset.jobId);
      }
    });

    // Modal: backdrop & close & ESC, and delegated actions inside modal
    els.modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-modal-close]") || e.target.closest("[data-modal-close]")) {
        closeModal();
        return;
      }
      const actionEl = e.target.closest("[data-action]");
      if (actionEl) {
        handleAction(actionEl.dataset.action, actionEl.dataset.jobId);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modal.hidden) closeModal();
    });

    // Saved button: filter to saved jobs
    let showingSaved = false;
    els.savedBtn.addEventListener("click", () => {
      if (state.saved.size === 0) {
        toast("No saved jobs yet  tap the bookmark on any card.");
        return;
      }
      showingSaved = !showingSaved;
      if (showingSaved) {
        // hijack render: filter list to saved only
        const savedJobs = jobs.filter((j) => state.saved.has(j.id));
        els.list.innerHTML = savedJobs.map(jobCardHtml).join("");
        els.title.textContent = "Saved jobs";
        els.meta.textContent = `${savedJobs.length} saved`;
        els.empty.hidden = savedJobs.length !== 0;
        els.savedBtn.classList.add("btn-outline");
        els.savedBtn.classList.remove("btn-ghost");
      } else {
        els.savedBtn.classList.add("btn-ghost");
        els.savedBtn.classList.remove("btn-outline");
        render();
      }
    });

    // Categories
    $$(".cat-card[data-cat]").forEach((card) =>
      card.addEventListener("click", () => {
        const dep = card.dataset.cat;
        // toggle: clear other deps and set just this one (or clear if "")
        state.departments.clear();
        $$('input[name="department"]').forEach((cb) => (cb.checked = false));
        if (dep) {
          state.departments.add(dep);
          const cb = $(`input[name="department"][value="${dep}"]`);
          if (cb) cb.checked = true;
        }
        render();
        document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );
  }

  // ---------- Category counts ----------
  function renderCategoryCounts() {
    $$("[data-cat-count]").forEach((el) => {
      const cat = el.getAttribute("data-cat-count");
      const n = jobs.filter((j) => j.department === cat).length;
      el.textContent = `${n} role${n === 1 ? "" : "s"}`;
    });
    if (els.allCount) els.allCount.textContent = `${jobs.length} roles`;
  }

  // ---------- Init ----------
  function init() {
    if (!jobs.length) {
      els.list.innerHTML = "";
      els.empty.hidden = false;
      return;
    }
    renderCategoryCounts();
    wire();
    render();

    // Deep link: #job=<id>
    const hashMatch = location.hash.match(/job=([\w-]+)/);
    if (hashMatch) openJob(hashMatch[1]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
