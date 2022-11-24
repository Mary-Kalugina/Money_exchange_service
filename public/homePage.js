const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => ApiConnector.logout(() => location.reload());

ApiConnector.current((response) => {
    responseCurrent = response;
    if (responseCurrent.success) {
        ProfileWidget.showProfile(responseCurrent.data);
    };
});
0.

function ratesBoardUpdate() {
    ApiConnector.getStocks((response) => {
      if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
      }
    });
  }
  
  ratesBoardUpdate();
  let updateBoard = setInterval(ratesBoardUpdate, 10000);

moneyManager.addMoneyCallback = (data) => {ApiConnector.addMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, "Баланс успешно пополнен");
    } else {
        moneyManager.setMessage(false, response.error)
    };
  })
};


moneyManager.conversionMoneyCallback = (data) => {ApiConnector.convertMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, "Конвертация успешно выполнена");
    } else {
        moneyManager.setMessage(false, response.error)
    };
  })
};

moneyManager.sendMoneyCallback = (data) => {ApiConnector.transferMoney(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(true, "Перевод средств успешно выполнен");
    } else {
        moneyManager.setMessage(false, response.error)
    };
  })
};

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);

    };
});

favoritesWidget.addUserCallback = (data) => {ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true, "Пользователь успешно добавлен");
    } else {
        favoritesWidget.setMessage(false, response.error)
    };
  })
};


favoritesWidget.removeUserCallback = (data) => {ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true, "Пользователь успешно удален");
    } else {
        favoritesWidget.setMessage(false, response.error)
    };
  })
};


