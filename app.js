const rawCertFiles = [
  "AdvancedResponsiveLayoutswithCSSFlexbox_CertificateOfCompletion.pdf",
  "Bootstrap3EssentialTraining_CertificateOfCompletion.pdf",
  "Bootstrap4FirstLook_CertificateOfCompletion.pdf",
  "BuildingaWebInterfacewithReactjs_CertificateOfCompletion.pdf",
  "BuildingaWebsitewithNodejsandExpressjs(2014)_CertificateOfCompletion.pdf",
  "CreatinganOpenSourceJavaScriptLibrary_CertificateOfCompletion.pdf",
  "CSS-Animation_CertificateOfCompletion.pdf",
  "DesigntheWeb-StylingaNumberedList_CertificateOfCompletion.pdf",
  "GraphQL-DataFetchingwithRelay_CertificateOfCompletion.pdf",
  "HTTP-2-DevelopingforPerformance_CertificateOfCompletion.pdf",
  "JavaScript-Functions_CertificateOfCompletion.pdf",
  "JavaScript-Templating_CertificateOfCompletion.pdf",
  "JavaScriptandAJAX-IntegrationTechniques_CertificateOfCompletion.pdf",
  "JavaScriptandJSON-IntegrationTechniques_CertificateOfCompletion.pdf",
  "JavaScriptEssentialTraining(2011)_CertificateOfCompletion.pdf",
  "LearningBackbonejs_CertificateOfCompletion.pdf",
  "LearningCSS_CertificateOfCompletion.pdf",
  "LearningECMAScript6_CertificateOfCompletion.pdf",
  "LearningGitandGitHub_CertificateOfCompletion.pdf",
  "LearningJavaScriptDebugging_CertificateOfCompletion.pdf",
  "LearningNodejs_CertificateOfCompletion.pdf",
  "LearningNPMtheNodePackageManager_CertificateOfCompletion.pdf",
  "LearningReactjs_CertificateOfCompletion.pdf",
  "LearningRedux_CertificateOfCompletion.pdf",
  "LearningResponsiveDesign_CertificateOfCompletion.pdf",
  "LearningVuejs_CertificateOfCompletion.pdf",
  "LearningWebpack1_CertificateOfCompletion.pdf",
  "ProgrammingFoundations-Fundamentals_CertificateOfCompletion.pdf",
  "ProgrammingFoundations-Open-SourceLicensing_CertificateOfCompletion.pdf",
  "React-BuildingLargeApps_CertificateOfCompletion.pdf",
  "React-Ecosystems_CertificateOfCompletion.pdf",
  "SassEssentialTraining_CertificateOfCompletion.pdf",
  "ToolingwithNPMScripts_CertificateOfCompletion.pdf",
  "UserExperienceforWebDesigners_CertificateOfCompletion.pdf",
  "UXFoundations-Accessibility_CertificateOfCompletion.pdf",
  "WebDevelopmentFoundations-Full-StackvsFront-End_CertificateOfCompletion.pdf",
];

function deriveTitle(fileName) {
  let title = fileName.replace("_CertificateOfCompletion.pdf", "");
  title = title.replace(/_/g, " ");
  title = title.replace(/-/g, " - ");
  return title;
}

function deriveCategory(title) {
  const t = title.toLowerCase();

  if (
    t.includes("flexbox") ||
    t.includes("responsive") ||
    t.includes("layout") ||
    t.includes("bootstrap") ||
    t.includes("css") ||
    t.includes("sass")
  ) {
    return "CSS & Layout";
  }
  if (t.includes("react")) {
    return "React";
  }
  if (t.includes("vue")) {
    return "Vue";
  }
  if (t.includes("node") || t.includes("npm") || t.includes("webpack")) {
    return "Node & Tooling";
  }
  if (t.includes("graphql") || t.includes("relay")) {
    return "GraphQL";
  }
  if (
    t.includes("ux") ||
    t.includes("user experience") ||
    t.includes("accessibility")
  ) {
    return "UX & Design";
  }
  if (
    t.includes("programming foundations") ||
    t.includes("foundations") ||
    t.includes("webdevelopment foundations")
  ) {
    return "Foundations";
  }
  if (t.includes("git") || t.includes("open-source")) {
    return "Dev Workflow";
  }
  if (t.includes("javascript")) {
    return "JavaScript";
  }

  return "Other";
}

function deriveTags(title, category) {
  const tags = new Set();
  const t = title.toLowerCase();

  if (t.includes("flexbox")) tags.add("Flexbox");
  if (t.includes("responsive")) tags.add("Responsive");
  if (t.includes("animation")) tags.add("Animation");
  if (t.includes("backbone")) tags.add("Backbone.js");
  if (t.includes("relay")) tags.add("Relay");
  if (t.includes("graphql")) tags.add("GraphQL");
  if (t.includes("debugging")) tags.add("Debugging");
  if (t.includes("ajax")) tags.add("AJAX");
  if (t.includes("json")) tags.add("JSON");
  if (t.includes("accessibility")) tags.add("Accessibility");
  if (t.includes("open source")) tags.add("Open Source");

  if (category === "JavaScript") tags.add("JavaScript");
  if (category === "React") tags.add("React");
  if (category === "Vue") tags.add("Vue");
  if (category === "Node & Tooling") {
    tags.add("Node");
    tags.add("Tooling");
  }
  if (category === "UX & Design") {
    tags.add("UX");
    tags.add("Design");
  }

  // Ensure every category has at least one clear tag
  switch (category) {
    case "CSS & Layout":
      tags.add("CSS");
      tags.add("Layout");
      break;
    case "Foundations":
      tags.add("Foundations");
      break;
    case "Dev Workflow":
      tags.add("Workflow");
      break;
    case "GraphQL":
      tags.add("GraphQL");
      break;
    case "Other":
      tags.add("General");
      break;
    default:
      break;
  }

  return Array.from(tags);
}

const certifications = rawCertFiles.map((file) => {
  const title = deriveTitle(file);
  const category = deriveCategory(title);
  const tags = deriveTags(title, category);

  return {
    id: file,
    file,
    title,
    category,
    provider: "LinkedIn Learning",
    tags,
  };
});

function buildCategoryCounts(data) {
  const counts = new Map();
  for (const item of data) {
    const key = item.category || "Other";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

function renderCategories(container, data, activeCategory) {
  const counts = buildCategoryCounts(data);
  const total = data.length;

  const categories = [
    "All",
    ...Array.from(counts.keys()).sort((a, b) => a.localeCompare(b)),
  ];

  container.innerHTML = "";

  categories.forEach((cat) => {
    const count = cat === "All" ? total : counts.get(cat) || 0;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (cat === activeCategory ? " chip--active" : "");
    chip.dataset.category = cat;
    chip.setAttribute("role", "radio");
    chip.setAttribute(
      "aria-checked",
      cat === activeCategory ? "true" : "false",
    );
    chip.innerHTML = `<span>${cat}</span><span class="count">${count}</span>`;
    container.appendChild(chip);
  });
}

function renderGrid(container, data) {
  container.innerHTML = "";

  if (!data.length) {
    const empty = document.createElement("div");
    empty.textContent = "No certifications match your filters yet.";
    empty.style.padding = "16px";
    empty.style.color = "#9ca3af";
    container.appendChild(empty);
    return;
  }

  data.forEach((cert) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;

    const linkUrl = `certifications/${encodeURIComponent(cert.file)}`;

    card.innerHTML = `
      <div class="card-header">
        <h2 class="card-title">${cert.title}</h2>
        <span class="card-badge">${cert.category}</span>
      </div>
      <div class="card-meta">
        <div class="card-meta-left">
          <span class="card-provider">${cert.provider}</span>
          <div class="card-tags">
            ${cert.tags
              .slice(0, 3)
              .map(
                (tag, index) =>
                  `<span class="tag${index === 0 ? "" : " tag--secondary"}">${tag}</span>`,
              )
              .join("")}
          </div>
        </div>
        <div class="card-cta">
          <span>View certificate</span>
          <span class="card-cta-icon">↗</span>
        </div>
      </div>
    `;

    const openPdf = () => {
      window.open(linkUrl, "_blank", "noopener");
    };

    card.addEventListener("click", openPdf);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPdf();
      }
    });

    container.appendChild(card);
  });
}

function updateSummary(element, total, filtered) {
  if (filtered === total) {
    element.textContent = `${total} certifications`;
  } else {
    element.textContent = `${filtered} of ${total} certifications shown`;
  }
}

function applyFilters(data, searchTerm, activeCategory) {
  const term = searchTerm.trim().toLowerCase();

  return data.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      !activeCategory ||
      item.category === activeCategory;

    if (!matchesCategory) return false;

    if (!term) return true;

    const haystack =
      `${item.title} ${item.category} ${item.provider} ${item.tags.join(" ")}`.toLowerCase();
    return haystack.includes(term);
  });
}

(function init() {
  const searchInput = document.getElementById("searchInput");
  const categoryChips = document.getElementById("categoryChips");
  const grid = document.getElementById("certGrid");
  const resultCount = document.getElementById("resultCount");

  if (!searchInput || !categoryChips || !grid || !resultCount) {
    console.error("Certification UI root elements missing");
    return;
  }

  let activeCategory = "All";
  let searchTerm = "";

  renderCategories(categoryChips, certifications, activeCategory);
  const filteredInitial = applyFilters(
    certifications,
    searchTerm,
    activeCategory,
  );
  renderGrid(grid, filteredInitial);
  updateSummary(resultCount, certifications.length, filteredInitial.length);

  categoryChips.addEventListener("click", (event) => {
    const button = event.target.closest("button.chip");
    if (!button) return;

    const selectedCategory = button.dataset.category;
    if (!selectedCategory) return;

    activeCategory = selectedCategory;

    renderCategories(categoryChips, certifications, activeCategory);

    const filtered = applyFilters(certifications, searchTerm, activeCategory);
    renderGrid(grid, filtered);
    updateSummary(resultCount, certifications.length, filtered.length);
  });

  let searchTimeout;
  searchInput.addEventListener("input", () => {
    const value = searchInput.value || "";
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTerm = value;
      const filtered = applyFilters(certifications, searchTerm, activeCategory);
      renderGrid(grid, filtered);
      updateSummary(resultCount, certifications.length, filtered.length);
    }, 120);
  });
})();
