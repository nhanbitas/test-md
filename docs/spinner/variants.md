
<!-- Types -->
<div data-heading="Types">
<div class="px-6 py-3">
    <h2 class="text-heading-03 text-gray-900">Types</h2>
</div>
<div class="mb-6 flex flex-col gap-4 px-6">
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <svg class="spinner-svg spinner-logo-01"></svg>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Single</h2>
    </div>
    </div>

    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-logo-01"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Inline loading</h2>
    </div>
    </div>

    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <button id="btn-spinner" type="button" data-spinner="auto" class="btn system w-32">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Pay now</span>
        </button>

        <script>
        const button = document.getElementById('btn-spinner');

        button.onclick = () => {
            button._instance.startAnimation();
            setTimeout(() => {
            button._instance.stopAnimation();
            }, 2500);
        };
        </script>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Button inline loading</h2>
    </div>
    </div>
</div>
</div>

<!-- Sizes -->
<div data-heading="Sizes">
<div class="px-6 py-3">
    <h2 class="text-heading-03 text-gray-900">Sizes</h2>
</div>
<div class="mb-6 flex flex-col gap-4 px-6">
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-circle-01"></svg>
        <svg class="spinner-svg spinner-circle-01 large"></svg>
        <svg class="spinner-svg spinner-circle-01 extra-large"></svg>
        </div>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Size</h2>
    </div>
    </div>
</div>
</div>

<!-- Kinds -->
<div data-heading="Kinds">
<div class="px-6 py-3">
    <h2 class="text-heading-03 text-gray-900">Kinds</h2>
</div>
<div class="mb-6 flex flex-col gap-4 px-6">
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-logo-01"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-logo-02"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-logo-03"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-logo-04"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Logo</h2>
    </div>
    </div>
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-circle-01"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
        <div class="flex items-center gap-2">
        <svg class="spinner-svg spinner-circle-02"></svg>
        <span class="text-gray-500">Loading...</span>
        </div>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Circle</h2>
    </div>
    </div>
</div>
</div>

<!-- Button inline loading  -->
<div data-heading="Button inline loading">
<div class="px-6 py-3">
    <h2 class="text-heading-03 text-gray-900">Button inline loading</h2>
</div>
<div class="mb-6 flex flex-col gap-4 px-6">
    <!-- Default -->
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <button id="btn-spinner-default" type="button" data-spinner="auto" class="btn system w-32">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Pay now</span>
        </button>

        <script>
        const buttonDefault = document.getElementById('btn-spinner-default');
        buttonDefault.onclick = () => {
            buttonDefault._instance.startAnimation();
            setTimeout(() => {
            buttonDefault._instance.stopAnimation();
            }, 2500);
        };
        </script>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Default</h2>
        <p class="text-helper-02 text-gray-500">Loading with the default spinner</p>
        <p class="text-helper-02 text-gray-500">Supported methods: startAnimation & stopAnimation</p>
    </div>
    </div>

    <!-- Start animation -->
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <button id="btn-startanimation-1" type="button" data-spinner="auto" class="btn system min-w-[8rem]">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Pay now</span>
        </button>
        <button id="btn-startanimation-2" type="button" data-spinner="auto" class="btn system min-w-[8rem]">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Submit </span>
        </button>

        <script>
        const buttonStartAnimation1 = document.getElementById('btn-startanimation-1');
        buttonStartAnimation1.onclick = () => {
            buttonStartAnimation1._instance.startAnimation('Loading...');
        };

        const buttonStartAnimation2 = document.getElementById('btn-startanimation-2');
        buttonStartAnimation2.onclick = () => {
            buttonStartAnimation2._instance.startAnimation('Waiting...');
        };
        </script>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Starting loading with message</h2>
        <p class="text-helper-02 text-gray-500">startAnimation(message)</p>
    </div>
    </div>

    <!-- Stop animation -->
    <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div data-demo-pane="auto" class="flex w-3/5 flex-wrap gap-2 rounded-tl-2xl bg-gray-50 p-4">
        <button id="btn-stopanimation-1" type="button" data-spinner="auto" class="btn system min-w-[8rem]">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Pay now</span>
        </button>
        <button id="btn-stopanimation-2" type="button" data-spinner="auto" class="btn system min-w-[8rem]">
        <i class="far fa-credit-card-check h-4 w-4"></i>
        <span class="truncate">Submit </span>
        </button>

        <script>
        const buttonStopAnimation1 = document.getElementById('btn-stopanimation-1');
        buttonStopAnimation1.onclick = () => {
            buttonStopAnimation1._instance.startAnimation();

            setTimeout(() => {
            buttonStopAnimation1._instance.stopAnimation('success', 'Success!');
            }, 2500);
        };

        const buttonStopAnimation2 = document.getElementById('btn-stopanimation-2');
        buttonStopAnimation2.onclick = () => {
            buttonStopAnimation2._instance.startAnimation();

            setTimeout(() => {
            buttonStopAnimation2._instance.stopAnimation('error', 'Please try again!', 3000);
            }, 2500);
        };
        </script>
    </div>
    <div data-info-pane>
        <h2 class="text-heading-01">Stop loading with status, message and delay</h2>
        <p class="text-helper-02 text-gray-500">stopAnimation(status, message, delay(ms))</p>
    </div>
    </div>
</div>
</div>
