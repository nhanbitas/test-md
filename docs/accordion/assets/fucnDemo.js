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