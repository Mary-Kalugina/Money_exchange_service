const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();
let responseLogout;
let responseCurrent;
let getResponseStocks;
let moneyManagerResponse;
let convertMoneyRresponse;
let sendMoneyRresponse;
let favoritesWidgetresponse;
let addUserToFavoritesResponse;
let removeUserFromFavoritesResponse;

logoutButton.action = () => ApiConnector.logout(() => location.reload());

ApiConnector.current((response) => {
    responseCurrent = response;
    if (responseCurrent.success) {
        ProfileWidget.showProfile(responseCurrent.data);
    };
});
0.

ApiConnector.getStocks((response) => {
    getResponseStocks = response;
    if (getResponseStocks.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(getResponseStocks.data);
    };
});

setInterval(ApiConnector.getStocks, 10000);



moneyManager.addMoneyCallback = (data) => {ApiConnector.addMoney(data, response => {
    moneyManagerResponse = response; 
    if (moneyManagerResponse.success) {
        ProfileWidget.showProfile(moneyManagerResponse.data);
        moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
        moneyManager.setMessage(false, moneyManagerResponse.error)
    };
  })
};


moneyManager.conversionMoneyCallback = (data) => {ApiConnector.convertMoney(data, response => {
    convertMoneyRresponse = response;
    if (convertMoneyRresponse.success) {
        ProfileWidget.showProfile(convertMoneyRresponse.data);
        moneyManager.setMessage(true, "Конвертация успешно выполнена");
    } else {
        moneyManager.setMessage(false, convertMoneyRresponse.error)
    };
  })
};


moneyManager.sendMoneyCallback = (data) => {ApiConnector.transferMoney(data, response => {
    sendMoneyRresponse = response;
    if (sendMoneyRresponse.success) {
        ProfileWidget.showProfile(sendMoneyRresponse.data);
        moneyManager.setMessage(true, "Перевод средств успешно выполнен");
    } else {
        moneyManager.setMessage(false, sendMoneyRresponse.error)
    };
  })
};


ApiConnector.getFavorites(response => {
    favoritesWidgetresponse = response;
    if (favoritesWidgetresponse.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    };
});
//Неверно добавляется в избранное
favoritesWidget.addUserCallback = (data) => {ApiConnector.addUserToFavorites(data, response => {
    addUserToFavoritesResponse = response;
    if (addUserToFavoritesResponse.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
        moneyManager.setMessage(true, "Пользователь успешно добавлен");
    } else {
        favoritesWidget.setMessage(false, addUserToFavoritesResponse.error)
    };
  })
};


favoritesWidget.removeUserCallback = (data) => {ApiConnector.removeUserFromFavorites(data, response => {
    removeUserFromFavoritesResponse = response;
    if (removeUserFromFavoritesResponse.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
        moneyManager.setMessage(true, "Пользователь успешно удален");
    } else {
        favoritesWidget.setMessage(false, removeUserFromFavoritesResponse.error)
    };
  })
};


