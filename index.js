var _syms = '!@#$%^&*-_'; // 0:10
var _sa = 'abcdefghijklmnopqrstuvwxyz'; // 1:26
var _ca = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 2:26
var _nums = '0123456789'; // 3:10

function generatePassword() {
  var masterI = document.getElementById('master');
  var master = masterI.value;
  var purposeI = document.getElementById('purpose');
  var purpose = purposeI.value;
  var resultI = document.getElementById('result');
  var pinResultI = document.getElementById('pin-result');
  var key = master + '::' + purpose;
  masterI.value = '';
  purposeI.value = '';
  resultI.value = _genpass(key);
  pinResultI.value = _genPin(key);
}

function _genPin(key) {
  Math.seedrandom(key);
  var result = '';
  for (var i = 0; i < 6; i++) {
    var nc = parseInt(Math.random() * 10);
    result += _nums[nc];
  }
  return result;
}

function _genpass(key) {
  Math.seedrandom(key);
  var result = '';
  for (var i = 64; i > 0; i--) {
    var nextType = parseInt(Math.random() * 4);
    switch (nextType) {
      case 0:
        var nextI = parseInt(Math.random() * 10);
        result += _syms[nextI];
        break;
      case 1:
        var nextI = parseInt(Math.random() * 26);
        result += _sa[nextI];
        break;
      case 2:
        var nextI = parseInt(Math.random() * 26);
        result += _ca[nextI];
        break;
      case 3:
        var nextI = parseInt(Math.random() * 10);
        result += _nums[nextI];
        break;
      default:
        result += '';
        break;
    }
  }
  return result;
}

function peek() {
  var masterI = document.getElementById('master');
  var master = masterI.value;
  var purposeI = document.getElementById('purpose');
  var purpose = purposeI.value;
  console.log(master + '::' + purpose)
}

function _toggleInput(x) {
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function togglePassword() {
  var masterI = document.getElementById('master');
  var purposeI = document.getElementById('purpose');
  _toggleInput(masterI);
  _toggleInput(purposeI);
}

function togglePinResult() {
  var pinResultI = document.getElementById('pin-result');
  _toggleInput(pinResultI);
}

function toggleResult() {
  var resultI = document.getElementById('result');
  _toggleInput(resultI);
}

function init() {
  var cb = document.getElementById('pass-toggle');
  cb.checked = false;
  var cbr = document.getElementById('result-toggle');
  cbr.checked = false;
  var cbpr = document.getElementById('pin-result-toggle');
  cbpr.checked = false;
}