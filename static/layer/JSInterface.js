/**
 * Created by Hamking on 2017/3/9.
 */

function isLocalStorageSupported() {
  var testKey = 'test',
    storage = window.sessionStorage;
  try {
    storage.setItem(testKey, 'testValue');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

if (typeof iBHLYZX == "undefined") {
  iBHLYZX = {
    isLogined: function () {
      //judge is logined
      return isLocalStorageSupported() && window.localStorage.getItem('islogined') && window.localStorage.getItem('islogined') == 'true';
    },
    getToken: function () {
      if (isLocalStorageSupported() && window.localStorage.getItem('islogined') && window.localStorage.getItem('islogined') == 'true') {
        var storage = window.localStorage;
        return '{"userid":"' + storage.getItem('userid') + '","token":"' + storage.getItem('token') + '"}';
      }
      return null;
    },
    setToken: function (userid, token) {
      if (isLocalStorageSupported()) {
        var localstorage = window.localStorage;
        localstorage.setItem('userid', userid);
        localstorage.setItem('token', token);
        localstorage.setItem('islogined', 'true');
      }
    },
    logout: function () {
      if (isLocalStorageSupported()) {
        var localstorage = window.localStorage;
        localstorage.setItem('islogined', 'false');
      }
    },
    openCustormerService: function (url) {
      return;
    },
    share: function (url) {
      return;
    },
    drawFrame: function () {
      return;
    },
    showFrame: function () {
      return;
    },
    hideFrame: function () {
      return;
    },
    dismissFrame: function () {
      return;
    },
    shareWithTitleTextIcon: function (url, title, text, icon) {
      return;
    },
    extopen: function (url) {
      layer.open({
        content: '打开获取支付页面失败:-12',
        skin: 'msg',
        time: 3 //2秒后自动关闭
      });
    }
  }
}
