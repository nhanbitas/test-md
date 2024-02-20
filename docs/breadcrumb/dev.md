<div class="mb-6 flex flex-col gap-4 px-6">
  <div class="flex min-h-[3.625rem] flex-wrap rounded-2xl border border-gray-200">
    <div
      data-demo-pane="auto"
      class="flex w-3/5 flex-col flex-wrap items-center gap-2 rounded-tl-2xl bg-gray-50 p-4"
    >
      <button class="btn success" onclick="ToastExample.createAccount()">Create account</button>

      <script>
        const createAccount = () => {
          //call api create account...

          //show toast
          const configActionToast = {
            type: 'success',
            title: 'Create account successful',
            duration: 4000,
            message: 'Your account was created successful',
            details: '<a class="text-blue-500" href="#">Go to login</a>',
          };
          const newToast = Opera.createToast(configActionToast);
          newToast.show();
        };
      </script>
    </div>
    <div data-info-pane>
      <h2 class="text-heading-01">Example</h2>
    </div>
  </div>
</div>