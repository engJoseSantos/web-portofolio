(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var body = document.getElementById('term-body');
  var form = document.getElementById('term-form');
  var input = document.getElementById('term-input');
  if (!body || !form || !input) return;

  var PROMPT = 'acutis@portfolio:~$';
  var history = [];
  var pos = 0;

  // Output is predefined, trusted HTML. User input is only ever added with textContent.
  var link = function (href, label) {
    return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
  };

  var commands = {
    help: function () {
      return ['whoami    about    skills    projects', 'experience    education    contact    clear    date'];
    },
    whoami: function () {
      return ['José Santos, software developer based in Belgium.',
        'Informatics Engineering graduate (2020), building practical backend projects and learning Linux, Docker and cybersecurity.'];
    },
    about: function () {
      return ['Graduated in Informatics Engineering in 2020 and started with an iOS internship in Portugal.',
        'Worked in construction and industrial production since, while keeping up personal programming projects.',
        'Now focused on backend applications, databases, Linux and Docker.'];
    },
    skills: function () {
      return ['Languages:  Python, Java, JavaScript, C, C++, C#, Kotlin, Swift, Objective-C, Bash',
        'Backend/web: Flask, HTML5, CSS3, Bootstrap, REST API concepts, SQL',
        'Tools:      Git/GitHub, Linux, Docker, SQLite, MySQL, Windows, macOS',
        'Learning:   networking, Linux administration, containerization, cybersecurity, log analysis'];
    },
    projects: function () {
      return ['1. Battery Manager (In Development) - Python, Flask, SQLite, Docker, Linux',
        '2. Paintball Centro Website (Client Project) - ' + link('https://paintballcentro.pt/', 'paintballcentro.pt'),
        '3. Python Web Automation Tool (Experimental) - Python, BeautifulSoup'];
    },
    experience: function () {
      return ['Production Worker, Anda NV (Aug 2024 - Present)',
        'Construction Assistant, Vanhoeyveld (Oct 2020 - Aug 2024)',
        'iOS Developer Intern, IT Sector, Porto (Mar 2020 - Jul 2020)'];
    },
    education: function () {
      return ["Bachelor's Degree in Informatics Engineering, Application Development",
        'ISEC (Coimbra Institute of Engineering), Portugal. Graduated July 2020.'];
    },
    contact: function () {
      return ['Email:    <a href="mailto:eng.josesantos97@gmail.com">eng.josesantos97@gmail.com</a>',
        'LinkedIn: ' + link('https://www.linkedin.com/in/jose-santos97', 'linkedin.com/in/jose-santos97'),
        'GitHub:   ' + link('https://github.com/engJoseSantos', 'github.com/engJoseSantos')];
    },
    date: function () {
      return [new Date().toString()];
    }
  };

  function addLine(html, cls) {
    var p = document.createElement('p');
    if (cls) p.className = cls;
    p.innerHTML = html;
    body.appendChild(p);
  }

  function echo(text) {
    var p = document.createElement('p');
    var s = document.createElement('span');
    s.className = 'cmd';
    s.textContent = PROMPT + ' ';
    p.appendChild(s);
    p.appendChild(document.createTextNode(text));
    body.appendChild(p);
  }

  function run(raw) {
    var cmd = raw.trim();
    echo(cmd);
    if (!cmd) return;
    history.push(cmd);
    pos = history.length;
    var key = cmd.toLowerCase();
    if (key === 'clear') { body.textContent = ''; return; }
    if (Object.prototype.hasOwnProperty.call(commands, key)) {
      commands[key]().forEach(function (l) { addLine(l); });
    } else {
      var p = document.createElement('p');
      p.className = 'err';
      p.textContent = 'Command not found: ' + cmd + ". Type 'help' to see available commands.";
      body.appendChild(p);
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    run(input.value);
    input.value = '';
    body.scrollTop = body.scrollHeight;
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pos > 0) pos--;
      input.value = history[pos] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (pos < history.length) pos++;
      input.value = history[pos] || '';
    }
  });

  body.addEventListener('click', function () {
    if (!window.getSelection().toString()) input.focus({ preventScroll: true });
  });

  addLine('Welcome to jose-santos.dev');
  addLine("Type 'help' to see available commands.", 'dim');
  echo('help');
  commands.help().forEach(function (l) { addLine(l); });
})();