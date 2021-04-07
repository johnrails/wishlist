console.log("background ran");
let dev = true;
let domain = dev ? "http://localhost:8000" : "www.wishly.com";
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let userData;
  switch (message.type) {
    case "login":
      console.log("login from background", message);
      userData = message.data;
      ajaxCall("POST", "/user/login", userData, function (response) {
        console.log("response from server", response);
      });
      return true;
    case "signup":
      console.log("signup from background", message);
      userData = message.data;
      userData.username = userData.email.split("@")[0];
      ajaxCall("POST", "/user/signup", userData, function (response) {
        console.log("response from server", response);
      });
      return true;
    default:
      console.log("couldnt find matching case");
  }
});

function ajaxCall(type, path, data, callback) {
  $.ajax({
    url: domain + path,
    data: data,
    type: type,
    success: function (res) {
      console.log("response", res);
      callback(res);
    },
    error: function (res) {
      console.log("err", res);
      callback(res);
    },
  });
}
