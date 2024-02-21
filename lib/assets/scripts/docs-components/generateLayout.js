const jsonDataElement = document.querySelector('script[type="application/json"]');

const validate = (dataObject) => {
  if (typeof dataObject.component !== "string") {
    throw new Error("Invalid layout data ");
  }

  if (typeof dataObject.description !== "string") {
    throw new Error("Invalid layout data ");
  }

  if (!Array.isArray(dataObject.tabs)) {
    throw new Error("Invalid layout data ");
  }
};

const generateLayout = (dataObject) => {
  const htmlLayout = `
<div data-page-title class="flex flex-col gap-2 px-6 py-4">
  <h1 class="text-heading-06 text-gray-900">${dataObject.component}</h1>
  <div class="flex flex-wrap gap-x-3 gap-y-2">
    <span class="text-label-02 flex items-center gap-1"
      >Development:
        <span class="badge green small">Release</span>
    </span>
    <span class="text-label-02 flex items-center gap-1"
      >Documentation:
        <span class="badge blue small">3/5</span>
      </span>
  </div>
</div>

<div class="tabs" id="tabs">
<div class="tabs-nav tabs-lg sticky top-0 bg-white px-6 shadow-sm">
  ${dataObject.tabs
    .map((tab) => {
        const href = tab.toLowerCase()
      return `<a href="${href}.html" class="tab-button">${tab}</a>`;
    })
    .join("")}
</div>

    `;

    // Tạo một DOMParser
    const parser = new DOMParser();
    const parsedLayout = parser.parseFromString(htmlLayout, 'text/html');
    document.body.prepend(parsedLayout.firstChild);
};

if (jsonDataElement) {
  const jsonData = jsonDataElement.textContent;
  const dataObject = JSON.parse(jsonData);

  try {
    validate(dataObject);
    document.addEventListener('DOMContentLoaded', () => {
        generateLayout(dataObject);
    })
  } catch (error) {
    // do nothing
  }
}
