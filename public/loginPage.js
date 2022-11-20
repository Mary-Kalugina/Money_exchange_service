'use strict';

const userForm = new UserForm();
let responseLoginObj;
let responseRegisterObj
//Login
userForm.loginFormCallback = data => ApiConnector.login(data, response => {
    responseLoginObj = response
    if (responseLoginObj.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(ApiConnector.login.asyncPart);
    };
});



//Register
userForm.registerFormCallback = data => ApiConnector.register(data, response => {
    responseRegisterObj = response;
    if (responseRegisterObj.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(ApiConnector.register.asyncPart);
    };
});

