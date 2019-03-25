var data = {
  games: [
    {
      className: 'passive',
      href: 'http://minmaxia.com/c2/',
      title: 'Clickpocalypse 2'
    },
    {
      className: 'passive',
      href: 'http://shimage.net/megamiquest2/en.html',
      title: 'Megami Quest 2'
    },
    {
      className: 'active',
      href: 'http://structure.zefiris.su/',
      title: 'Structure Game'
    },
    {
      className: 'passive',
      href: 'https://rawgit.com/IvarK/BuildASpaceShip/master/index.html',
      title: 'Build a Spaceship'
    },
    {
      className: '',
      href: 'https://keep.google.com/#home',
      title: 'Google Keep'
    },
    {
      className: 'passive',
      href: 'https://www.kongregate.com/games/MrJinx/world-of-talesworth',
      title: 'World of Talesworth'
    },
    {
      className: 'active',
      href: 'https://epicidlequest.com/',
      title: 'Epic Idle Quest'
    },
    {
      className: 'passive',
      href: 'https://www.kongregate.com/games/lord_jello/souls-and-magic',
      title: 'Soul and Magic'
    },
  ],
  wikipedigos: [
    {
      className: 'passive',
      href: 'https://trello.com/b/Rg10E5Rk/wikipedigolang',
      title: 'Wikipedigolang Todos'
    },
    {
      className: 'passive',
      href: 'https://drive.google.com/drive/folders/1QjKPmWLUVwKawDl3OZXiBcDIEtSN5YKy',
      title: 'Wikipedigolang Drive'
    },
  ],
};

function generateWikipedigos() {
  var gc = document.getElementById('wikipedigo-container');
  data.wikipedigos.forEach(g => {
    var a = document.createElement('a');
    a.setAttribute('class', g.className);
    a.setAttribute('href', g.href);
    a.setAttribute('target', '_blank');
    a.innerHTML = g.title;
    var b = document.createElement('br');
    gc.append(a);
    gc.append(b);
  });
}

function generateGames() {
  var gc = document.getElementById('game-container');
  data.games.forEach(g => {
    var a = document.createElement('a');
    a.setAttribute('class', g.className);
    a.setAttribute('href', g.href);
    a.setAttribute('target', '_blank');
    a.innerHTML = g.title;
    var b = document.createElement('br');
    gc.append(a);
    gc.append(b);
  });
}

function initAll() {
  generateGames();
  generateWikipedigos();
}

function openIgo(env) {
  host = env==='prod' ? 'https://pg1-go-work.herokuapp.com' : 'http://localhost:3000'
  sub = ['/', '/job_queue', '/postponed_jobs', '/admin/igprofiles']
  sub.forEach(s => window.open(host+s));
}

function openGames() {
  els = document.querySelectorAll('.active');
  els.forEach((el) => {
    el.click();
  });
}

function openWikipedigo() {
  els = document.querySelectorAll('.wikipedigo');
  els.forEach((el) => {
    el.click();
  });
}

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
  var key = master+'::'+purpose;
  masterI.value = '';
  purposeI.value = '';
  resultI.value = _genpass(key);
}

function _genpass(key) {
  Math.seedrandom(key);
  var result = '';
  for (var i=64; i > 0; i--) {
    var nextType = parseInt(Math.random() * 4);
    switch(nextType) {
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
  console.log(master+'::'+purpose)
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

function init() {
  var cb = document.getElementById('pass-toggle');
  cb.checked = false;
}