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
  works: [
    {
      className: 'work',
      href: 'https://gmail.com',
      title: 'Gmail'
    },
    {
      className: 'work',
      href: 'https://tutuplapak.atlassian.net/secure/RapidBoard.jspa?rapidView=30&selectedIssue=TRXS-3052&assignee=yusuf.rahmatullah&assignee=UNASSIGNED_USER_ID',
      title: 'Jira Board'
    },
    {
      className: 'passive',
      href: 'https://diskusi.bukalapak.io/',
      title: 'Buka Diskusi'
    },
    {
      className: 'work',
      href: 'https://calendar.google.com/calendar/r',
      title: 'GCalendar'
    },
    {
      className: 'passive',
      href: 'https://trello.com/b/H1OlcJ5F/trxs',
      title: 'TRXS Todos'
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
  jiraTickets: [
    3243,
    3402
  ],
  pullIDs: [
    38742,
    38910
  ],
  anotherLinks: [
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

function generatePulls() {
  var ti = document.getElementById('pullID');
  ti.setAttribute('value', data.pullIDs.join(';'));
}

function generateJira() {
  var ti = document.getElementById('ticketID');
  ti.setAttribute('value', data.jiraTickets.join(';'));
}

function generateWorks() {
  var gc = document.getElementById('work-container');
  data.works.forEach(g => {
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
  generateWorks();
  generateWikipedigos();
  generateJira();
  generatePulls();
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

function openWorks() {
  els = document.querySelectorAll('.work');
  els.forEach((el) => {
    el.click();
  });
  // open another links
  data.anotherLinks.forEach(l => {
    window.open(l);
  });
}

function openWikipedigo() {
  els = document.querySelectorAll('.wikipedigo');
  els.forEach((el) => {
    el.click();
  });
}

function openPulls() {
  node = document.querySelector('#pullID');
  value = node.value
  if (value !== "") {
    ar = value.split(';');
    ar.forEach(a => {
      url = "https://github.com/bukalapak/mothership/pull/" + a.trim();
      window.open(url);
    });
  }
}

function openTickets() {
  node = document.querySelector('#ticketID');
  value = node.value
  if (value !== "") {
    ar = value.split(';');
    ar.forEach(a => {
      url = "https://tutuplapak.atlassian.net/browse/TRXS-" + a.trim();
      window.open(url);
    });
  }
}

var _syms = '!@#$%^&*-_'; // 0:10
var _sa = 'abcdefghijklmnopqrstuvwxyz'; // 1:26
var _ca = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 2:26
var _nums = '0123456789'; // 3:10

function generatePassword() {
  var master = document.getElementById('master').value;
  var purpose = document.getElementById('purpose').value;
  var resultI = document.getElementById('result');
  Math.seedrandom(master+'::'+purpose);
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
  resultI.value = result;
}
