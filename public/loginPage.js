'use strict';

const userForm = new UserForm();
//Login
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    console.log(response)
    if (response.success) {
        location.reload();
    } else {
        console.log(response)
        userForm.setLoginErrorMessage(response.error);
    };
});



//Register
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    response = response;
    if (response.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(response.error);
    };
});

