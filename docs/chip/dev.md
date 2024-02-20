<div markdown class="px-6 py-3">
# Opera UI - Roadmap 24H1

This issue describes key development goals of Opera UI within the first half of 2024.


### Documentation

- Add support for release branch selection on documentation site

### Component Library

- Release the next version after 0.6, featuring:
	- Improvements in current components
	- New components
		- Authentication code input
		- Card
		- Code snippet
		- Data table
		- Email input
		- Grid
		- List
		- Payment card input
		- Phone input
		- Progress indicator
		- Timeline
	- Dark mode support
	- Client-side input validation support
	- Enhanced accessibility, focusing on keyboard navigation

## Test
</div>
```js
<div id='abc' data-heading="Types">
  <div class="px-6 py-3">
    <h2 class="text-heading-03 text-gray-900">Types</h2>
  </div>  
  <div class="mb-6 flex flex-col gap-4 px-6">
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
      <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <div data-accordion="single-active" class="accordion">
          <div class="accordion-item">
            <button type="button" class="accordion-item-btn icon-right">
              <span class="accordion-item-btn-text">Chapter 1</span>
            </button>
            <div class="accordion-item-content hidden">           
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-item-btn icon-right">
              <span class="accordion-item-btn-text">Chapter 2</span>
            </button>
            <div class="accordion-item-content hidden">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div class="accordion-item">
            <button type="button" class="accordion-item-btn icon-right">
              <span class="accordion-item-btn-text">Chapter 3</span>
            </button>
            <div class="accordion-item-content hidden">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div data-info-pane>
        <h2 class="text-heading-01">Single-active</h2>
      </div>
    </div>
  </div>
</div>
```
```js
  <legend class="text-label-02 text-gray-700">Label</legend>
  <div data-dropdown="multi-select" class="relative">
    <button type="button" class="dropdown-btn">
      <span class="dropdown-btn-text">Options</span><span class="dropdown-clear-btn hidden">Clear</span>
      <span class="dropdown-btn-icon"><i class="far fa-chevron-down"></i></span>
    </button>
    <div hidden="" class="dropdown-menu" role="menu" tabindex="-1">
      <button type="button" class="menu-item" role="menuitem">
        <img src="https://flagsapi.com/VN/flat/64.png">
        <span class="menu-item-text">Vietnam</span>
      <span class="selected-icon"><i class="far fa-check"></i></span></button>
      <button type="button" class="menu-item" role="menuitem">
        <img src="https://flagsapi.com/US/flat/64.png">
        <span class="menu-item-text">United States of America</span>
      <span class="selected-icon"><i class="far fa-check"></i></span></button>
      <button type="button" class="menu-item" role="menuitem">
        <img src="https://flagsapi.com/CA/flat/64.png">
        <span class="menu-item-text">Canada</span>
      <span class="selected-icon"><i class="far fa-check"></i></span></button>
      <button type="button" class="menu-item" role="menuitem">
        <img src="https://flagsapi.com/AU/flat/64.png">
        <span class="menu-item-text">Australia</span>
      <span class="selected-icon"><i class="far fa-check"></i></span></button>
      <button type="button" class="menu-item" role="menuitem">
        <img src="https://flagsapi.com/GB/flat/64.png">
        <span class="menu-item-text">Great Britain</span>
      <span class="selected-icon"><i class="far fa-check"></i></span></button>
    </div>
  </div>
</div>
```

```js
<button class="btn success" onclick="ToastExample.createAccount()">Create account</button>
```