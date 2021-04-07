console.log("loaded popup");

let wishly = angular.module("wishly", ["ui.router"]);
chrome.tabs.query(
  { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
  function (tabs) {
    alert(tabs[0].url);
  }
);
wishly.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "../views/home.html",
    })
    .state("login", {
      url: "/login",
      templateUrl: "../views/login.html",
    })
    .state("signup", {
      url: "/signup",
      templateUrl: "../views/signup.html",
    });

  $urlRouterProvider.otherwise("login");
});

function PopupCtrl($scope, $state) {
  $scope.login = function (formData) {
    console.log("logging in", formData);
    chrome.runtime.sendMessage(
      { type: "login", data: formData },
      function (response) {
        console.log("res", response);
      }
    );
  };
  $scope.signup = function (formData) {
    console.log("signup", formData);
    chrome.runtime.sendMessage(
      { type: "signup", data: formData },
      function (response) {
        console.log("response", response);
      }
    );
  };
}

wishly.controller("PopupCtrl", ["$scope", "$state", PopupCtrl]);
