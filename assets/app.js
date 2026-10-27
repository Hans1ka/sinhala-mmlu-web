(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var C = window.SITE_CONFIG || {};
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isTodo = function (v) { return !v || /^TODO/i.test(String(v)); };
  var PAGE = document.body.getAttribute("data-page") || "home";

  /* ---------- Images: hide broken ones and fall back to text ---------- */
  var imgFallback = function (img) {
    img.addEventListener("error", function () {
      var holder = img.parentNode;
      img.remove();
      if (holder) holder.classList.add("no-img");
    });
  };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };
  var initials = function (name) {
    return String(name || "?").trim().split(/\s+/).slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase() || "?";
  };
  
  /* ---------- Pages in the menu (edit here to add/remove pages) ---------- */
  var PAGES = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "task", href: "task.html", label: "Task" },
    { id: "dates", href: "dates.html", label: "Dates" },
    { id: "rules", href: "rules.html", label: "Rules" },
    { id: "submission", href: "submission.html", label: "Submission" },
    { id: "evaluation", href: "evaluation.html", label: "Evaluation" },
    { id: "leaderboard", href: "leaderboard.html", label: "Leaderboard" },
    // { id: "prizes", href: "prizes.html", label: "Prizes" },
    { id: "faq", href: "faq.html", label: "FAQ" },
    { id: "organisers", href: "organisers.html", label: "Organisers" },
    { id: "contact", href: "contact.html", label: "Contact" },
  ];

  var ICON_MOON = '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var ICON_SUN = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var ICON_MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* ---------- Header ---------- */
  var header = $("#site-header");
  if (header) {
    header.innerHTML =
      '<div class="wrap topbar-inner">' +
        '<a href="index.html" class="brand" aria-label="Sinhala MMLU home">' +
        '<span class="brand-text"><strong>Sinhala MMLU</strong><small>Shared Task · ICTer 2026</small></span></a>' +
        '<div class="header-right">' +
          '<nav id="nav" class="nav" aria-label="Main">' +
            PAGES.slice(1).map(function (p) {
              return '<a href="' + p.href + '"' + (p.id === PAGE ? ' class="active" aria-current="page"' : "") + ">" + p.label + "</a>";
            }).join("") +
            '<a class="nav-cta" data-link="registration" href="#">Register</a>' +
          "</nav>" +
          '<button class="icon-btn theme-btn" type="button" aria-label="Switch light or dark mode">' + ICON_MOON + ICON_SUN + "</button>" +
          '<button class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu">' + ICON_MENU + "</button>" +
        "</div>" +
      "</div>";
  }

  var footer = $("#site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="wrap footer-inner">' +
        '<div><strong>Sinhala MMLU Shared Task</strong><br><span class="dim small">ICTer 2026 · IIT &amp; UCSC · Colombo, Sri Lanka</span></div>' +
        '<nav class="footer-nav" aria-label="Footer">' + PAGES.slice(1).map(function (p) { return '<a href="' + p.href + '">' + p.label + "</a>"; }).join("") + "</nav>" +
        '<small class="faint">© 2026 Sinhala MMLU organisers</small>' +
      "</div>" +
      ((C.brandLogos || []).length
        ? '<div class="wrap"><div class="logo-strip">' +
            '<span class="logo-strip-label">Organised by</span>' +
            (C.brandLogos || []).map(function (l) {
              return '<a class="logo-box" href="' + esc(l.url || "#") + '" target="_blank" rel="noopener" title="' + esc(l.name) + '">' +
                     '<img src="' + esc(l.src) + '" alt="' + esc(l.name) + '">' +
                     '<span class="logo-fallback">' + esc(l.short || l.name) + "</span></a>";
            }).join("") +
          "</div></div>"
        : "");
    $$(".logo-strip img", footer).forEach(imgFallback);
  }

  var pager = $("#pager");
  if (pager) {
    var idx = PAGES.findIndex(function (p) { return p.id === PAGE; });
    var prev = PAGES[idx - 1], next = PAGES[idx + 1];
    pager.className = "pager";
    pager.innerHTML = (prev ? '<a class="prev" href="' + prev.href + '"><small>← Previous</small>' + prev.label + "</a>" : "<span></span>") +
      (next ? '<a class="next" href="' + next.href + '"><small>Next →</small>' + next.label + "</a>" : "");
  }

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = $(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var nextTheme = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nextTheme);
      try { localStorage.setItem("theme", nextTheme); } catch (e) {}
    });
  }

  /* ---------- Menu ---------- */
  var nav = $("#nav"), menuBtn = $(".menu-btn");
  if (menuBtn) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.innerHTML = open ? ICON_CLOSE : ICON_MENU;
      document.body.style.overflow = open ? "hidden" : "";
    };
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1100) setMenu(false); });
  }

  /* ---------- Content from config ---------- */
  $$("[data-link]").forEach(function (el) {
    var url = (C.links || {})[el.getAttribute("data-link")];
    if (isTodo(url)) {
      el.classList.add("disabled"); el.setAttribute("aria-disabled", "true");
      el.setAttribute("tabindex", "-1"); el.removeAttribute("href");
    } else {
      el.href = url;
      if (/^https?:/.test(url)) { el.target = "_blank"; el.rel = "noopener"; }
    }
  });

  var emailLink = $("#email-link"), copyBtn = $("#copy-email");
  if (emailLink) {
    if (isTodo(C.email)) {
      emailLink.textContent = "Email address coming soon"; emailLink.removeAttribute("href"); copyBtn.hidden = true;
    } else {
      emailLink.textContent = C.email; emailLink.href = "mailto:" + C.email;
      copyBtn.addEventListener("click", function () {
        if (navigator.clipboard) navigator.clipboard.writeText(C.email).then(function () {
          copyBtn.textContent = "Copied"; setTimeout(function () { copyBtn.textContent = "Copy"; }, 1500);
        }, function () {});
      });
    }
  }

  $$("[data-prize]").forEach(function (el) { el.textContent = (C.prizes || {})[el.getAttribute("data-prize")] || "To be announced"; });
  $$("[data-tz]").forEach(function (el) { el.textContent = C.timezoneLabel || "Sri Lanka Time (UTC+05:30)"; });

  var fmt = function (d, opts) {
    var o = Object.assign({ day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Colombo" }, opts || {});
    try { return d.toLocaleString("en-GB", o); } catch (e) { return d.toDateString(); }
  };
  var events = (C.timeline || []).map(function (e) { return Object.assign({}, e, { d: new Date(e.date) }); }).sort(function (a, b) { return a.d - b.d; });
  var now = new Date();
  var nextIdx = events.findIndex(function (e) { return e.d > now; });

  var tl = $("#timeline");
  if (tl) {
    events.forEach(function (e, i) {
      var li = document.createElement("li");
      li.className = (e.d <= now ? "past" : "") + (i === nextIdx ? " next" : "");
      var withTime = !/T00:00|T09:00/.test(e.date);
      li.innerHTML = '<div class="tl-date"><time></time>' +
        (e.proposed ? '<span class="tag">tentative</span>' : "") +
        (i === nextIdx ? '<span class="tag tag-next">up next</span>' : "") +
        (e.d <= now ? '<span class="tag">done</span>' : "") +
        '</div><div class="tl-title"></div><p class="tl-text"></p>';
      li.querySelector("time").dateTime = e.date;
      li.querySelector("time").textContent = fmt(e.d, withTime ? { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false } : { weekday: "short" });
      li.querySelector(".tl-title").textContent = e.title;
      li.querySelector(".tl-text").innerHTML = e.text || "";
      tl.appendChild(li);
    });
  }

  var mini = $("#mini-timeline");
  if (mini) {
    var start = nextIdx === -1 ? Math.max(0, events.length - 4) : nextIdx;
    events.slice(start, start + 4).forEach(function (e) {
      var li = document.createElement("li");
      li.innerHTML = "<time></time><span></span>";
      li.querySelector("time").textContent = fmt(e.d, { year: undefined });
      li.querySelector("span").textContent = e.title;
      mini.appendChild(li);
    });
  }

  var news = $("#news");
  if (news) {
    if (!(C.news || []).length) news.innerHTML = '<li>No announcements yet.</li>';
    (C.news || []).forEach(function (n) {
      var li = document.createElement("li"), t = document.createElement("time");
      t.dateTime = n.date; t.textContent = fmt(new Date(n.date + "T12:00:00+05:30"));
      li.appendChild(t); li.appendChild(document.createTextNode(n.text)); news.appendChild(li);
    });
  }

  var cdTitle = $("#cd-title");
  if (cdTitle) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var tick = function () {
      var n = new Date(), nx = events.find(function (e) { return e.d > n; });
      if (!nx) { cdTitle.textContent = "The shared task has concluded. Thank you!"; return false; }
      cdTitle.textContent = nx.title.split(" · ")[0].trim() + " · " + fmt(nx.d);
      var diff = nx.d - n;
      $("#cd-d").textContent = pad(Math.floor(diff / 864e5));
      $("#cd-h").textContent = pad(Math.floor(diff / 36e5) % 24);
      $("#cd-m").textContent = pad(Math.floor(diff / 6e4) % 60);
      $("#cd-s").textContent = pad(Math.floor(diff / 1e3) % 60);
      return true;
    };
    if (tick()) setInterval(tick, 1000);
  }

  /* ---------- Organisers page ---------- */
  var orgGrid = $("#organiser-grid");
  if (orgGrid) {
    orgGrid.innerHTML = (C.organisers || []).map(function (o) {
      return '<article class="card org reveal">' +
        '<a class="org-logo logo-box" href="' + esc(o.url || "#") + '" target="_blank" rel="noopener">' +
          '<img src="' + esc(o.logo) + '" alt="' + esc(o.name) + ' logo">' +
          '<span class="logo-fallback">' + esc(o.short || "") + "</span></a>" +
        "<h3>" + esc(o.name) + "</h3><p>" + esc(o.location || "") + "</p>" +
        '<div class="people-grid">' + (o.people || []).map(function (p) {
          return '<figure class="person">' +
            '<span class="person-photo' + (p.photo ? ' has-photo' : '') + '"' +
              (p.photo ? ' role="img" aria-label="' + esc(p.name) + '" style="background-image:url(\'' + esc(p.photo) + '\')"' : '') + '>' +
              '<span class="avatar-fallback">' + esc(initials(p.name)) + "</span>" +
            "</span>" +
            "<figcaption><b>" + esc(p.name) + "</b><small>" + esc(p.role || "") + "</small></figcaption>" +
          "</figure>";
        }).join("") + "</div></article>";
    }).join("");
    $$("img", orgGrid).forEach(imgFallback);
  }

  /* ---------- Leaderboard page ---------- */
  var lbNote = $("#lb-note");
  if (lbNote) {
    var L = C.leaderboard || {};
    lbNote.textContent = L.note || "";

    var num = function (v) { return (v === undefined || v === null || v === "") ? "—" : Number(v).toFixed(1); };
    var table = function (rows, cols) {
      return '<div class="table-wrap"><table class="lb-table"><thead><tr>' +
        cols.map(function (c) { return "<th" + (c.num ? ' class="n"' : "") + ">" + esc(c.label) + "</th>"; }).join("") +
        "</tr></thead><tbody>" +
        rows.map(function (r) {
          return "<tr>" + cols.map(function (c) {
            var v = c.num ? num(r[c.key]) : esc(r[c.key] || "");
            return "<td" + (c.num ? ' class="n"' : "") + (c.key === "macro" ? ' class="n strong"' : "") + ">" + v + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>";
    };

    var empty = function (msg) { return '<p class="lb-empty">' + esc(msg) + "</p>"; };

    var bl = $("#lb-baselines");
    if (bl) {
      bl.innerHTML = (L.baselines || []).length
        ? table(L.baselines, [
            { key: "system", label: "System" },
            { key: "easy", label: "Easy", num: true },
            { key: "medium", label: "Medium", num: true },
            { key: "hard", label: "Hard", num: true },
            { key: "macro", label: "Macro", num: true },
          ])
        : empty("Baseline scores will be published when the test set is released on 12 October 2026.");
    }

    var fin = $("#lb-final");
    if (fin) {
      fin.innerHTML = (L.final || []).length
        ? table(L.final, [
            { key: "rank", label: "#" },
            { key: "team", label: "Team" },
            { key: "affiliation", label: "Affiliation" },
            { key: "easy", label: "Easy", num: true },
            { key: "medium", label: "Medium", num: true },
            { key: "hard", label: "Hard", num: true },
            { key: "macro", label: "Macro", num: true },
          ])
        : empty("Final rankings appear here once submitted systems have been reproduced and verified.");
    }
  }
  
  /* ---------- Attention demo (home): reacts to hover/tap only ---------- */
  var stage = $(".attn-stage");
  if (stage) {
    var svg = $(".attn-svg", stage), toks = $$(".tokens .tok", stage), nT = toks.length, focusLbl = $("#attn-focus");
    var W = [];
    for (var q = 0; q < nT; q++) { W[q] = []; for (var k = 0; k < nT; k++) W[q][k] = q === k ? 0 : Math.exp(-Math.abs(q - k) / 2.2) * 0.5; }
    var boost = function (a, b, v) { if (a < nT && b < nT) W[a][b] += v; };
    boost(6, 4, .9); boost(6, 5, .9); boost(4, 3, .8); boost(5, 3, .7); boost(1, 0, .8); boost(2, 1, 1); boost(7, 6, .9); boost(3, 1, .6); boost(0, 1, .7);
    var paths = toks.map(function () { var p = document.createElementNS("http://www.w3.org/2000/svg", "path"); svg.appendChild(p); return p; });
    var focus = 6;
    var render = function () {
      var sr = stage.getBoundingClientRect(), qr = toks[focus].getBoundingClientRect();
      var x1 = qr.left - sr.left + qr.width / 2, y1 = qr.top - sr.top;
      var row = W[focus], maxW = Math.max.apply(null, row) || 1;
      toks.forEach(function (t, i) {
        t.classList.toggle("q", i === focus);
        if (i === focus) { paths[i].setAttribute("d", ""); return; }
        var w = row[i] / maxW, r = t.getBoundingClientRect();
        var x2 = r.left - sr.left + r.width / 2, y2 = r.top - sr.top;
        var h = Math.min(56, 14 + Math.abs(x2 - x1) * 0.25 + Math.abs(y2 - y1) * 0.2);
        paths[i].setAttribute("d", "M" + x1 + " " + (y1 - 2) + " Q" + (x1 + x2) / 2 + " " + (Math.min(y1, y2) - h) + " " + x2 + " " + (y2 - 2));
        paths[i].style.strokeOpacity = (0.12 + w * 0.7).toFixed(2);
        paths[i].style.strokeWidth = (1 + w * 2.5).toFixed(2);
      });
      if (focusLbl) focusLbl.textContent = toks[focus].textContent;
    };
    render();
    window.addEventListener("resize", render);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
    toks.forEach(function (t, i) {
      t.setAttribute("tabindex", "0");
      var pick = function () { focus = i; render(); };
      t.addEventListener("mouseenter", pick); t.addEventListener("click", pick); t.addEventListener("focus", pick);
    });
  }

  /* ---------- Subtle reveal + probability bars ---------- */
  var fillProbs = function () { $$(".prob").forEach(function (p) { $(".fill", p).style.width = (parseFloat(p.getAttribute("data-p")) * 100) + "%"; }); };
  var targets = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        if ($(".prob", e.target)) fillProbs();
        io.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  } else { targets.forEach(function (el) { el.classList.add("in"); }); fillProbs(); }

  /* ---------- Back to top ---------- */
  var toTop = document.createElement("button");
  toTop.className = "to-top"; toTop.hidden = true; toTop.type = "button"; toTop.setAttribute("aria-label", "Back to top"); toTop.textContent = "↑";
  document.body.appendChild(toTop);
  window.addEventListener("scroll", function () { toTop.hidden = window.scrollY < 700; }, { passive: true });
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); });

  /* ---------- FAQ search ---------- */
  var search = $("#faq-search");
  if (search) {
    var items = $$("#faq-list details").map(function (d) { return { d: d, p: $("p", d), html: $("p", d).innerHTML }; });
    var esc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
    search.addEventListener("input", function () {
      var q = search.value.trim(), shown = 0, re = q ? new RegExp("(" + esc(q) + ")", "gi") : null;
      items.forEach(function (it) {
        it.p.innerHTML = it.html;
        var match = !q || it.d.textContent.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        it.d.hidden = !match;
        if (match) shown++;
        it.d.open = !!(q && match);
        if (re && match) {
          it.p.innerHTML = ("<x>" + it.html + "</x>").replace(/>([^<]+)</g, function (m, t) { return ">" + t.replace(re, "<mark>$1</mark>") + "<"; }).slice(3, -4);
        }
      });
      $("#faq-empty").hidden = shown !== 0;
    });
  }

  /* ---------- Confetti, contained inside a card ---------- */
  var confetti = function (box) {
    if (reduced || !box) return;
    var colors = ["#4f46e5", "#8f95ff", "#0f766e", "#2dd4bf", "#fbbf24", "#fb7185"];
    var layer = document.createElement("div");
    layer.className = "confetti";
    layer.setAttribute("aria-hidden", "true");
    var fall = box.offsetHeight + 30;
    for (var i = 0; i < 98; i++) {
      var p = document.createElement("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = (Math.random() * 0.9).toFixed(2) + "s";
      p.style.animationDuration = (1.8 + Math.random() * 1.4).toFixed(2) + "s";
      p.style.setProperty("--fall", fall + "px");
      p.style.setProperty("--x", ((Math.random() - 0.5) * 60).toFixed(0) + "px");
      p.style.setProperty("--r", (Math.random() * 720 - 360).toFixed(0) + "deg");
      if (Math.random() < 0.35) p.style.borderRadius = "50%";
      layer.appendChild(p);
    }
    box.appendChild(layer);
    setTimeout(function () { layer.remove(); }, 4200);
  };

  /* ---------- Interactive example question (task page) ---------- */
  var quiz = document.getElementById("quiz");
  if (quiz) {
    var QUESTIONS = [
      { level: "Easy", id: "ex_01",
        q: "ශ්\u200dරී ලංකාවේ පරිපාලන අගනුවර කුමක්ද?",
        options: ["කොළඹ", "ශ්\u200dරී ජයවර්ධනපුර කෝට්ටේ", "මහනුවර", "ගාල්ල"], answer: 1, si: true },
      { level: "Medium", id: "ex_02",
        q: "ජලයේ රසායනික සූත්\u200dරය කුමක්ද?",
        options: ["CO\u2082", "H\u2082O", "O\u2082", "NaCl"], answer: 1, si: false },
      { level: "Hard", id: "ex_03",
        q: "ශ්\u200dරී ලංකාවේ උසම කන්ද කුමක්ද?",
        options: ["ශ්\u200dරී පාදය", "කිරිගල්පොත්ත", "පිදුරුතලාගල", "තොටුපොළ කන්ද"], answer: 2, si: true }
    ];
    var LETTERS = ["A", "B", "C", "D"];
    var order = [], qi = 0, score = 0, answered = false;

    var shuffle = function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = arr[i];
        arr[i] = arr[j]; arr[j] = t;
      }
      return arr;
    };

    var startRound = function () {
      order = shuffle(QUESTIONS.map(function (_, i) { return i; }));
      qi = 0; score = 0;
      render();
    };

    var render = function () {
      var q = QUESTIONS[order[qi]];
      quiz.classList.remove("done");
      quiz.innerHTML =
        '<div class="q-top"><span class="tag tag-' + q.level.toLowerCase() + '">' + q.level.toLowerCase() + '</span>' +
        '<span class="q-count">question ' + (qi + 1) + ' of ' + QUESTIONS.length + ' · id: ' + q.id + '</span></div>' +
        '<p class="q-text' + (q.si ? " si" : "") + '">' + q.q + '</p>' +
        '<ul class="q-opts">' + q.options.map(function (o, i) {
          return '<li><button type="button" class="q-opt" data-i="' + i + '"><span class="opt">' + LETTERS[i] +
                 '</span><span' + (q.si ? ' class="si"' : "") + '>' + o + '</span><span class="mk"></span></button></li>';
        }).join("") + "</ul>" +
        '<div class="q-foot"><span class="q-msg">Select your answer.</span></div>' +
        '<p class="q-note"></p>';
      answered = false;
      Array.prototype.forEach.call(quiz.querySelectorAll(".q-opt"), function (b) {
        b.addEventListener("click", function () { choose(parseInt(b.getAttribute("data-i"), 10)); });
      });
    };

    var showResult = function () {
      var perfect = score === QUESTIONS.length;
      quiz.classList.add("done");
      if (perfect) setTimeout(function () { confetti(quiz); }, 0);
      quiz.innerHTML =
        '<div class="q-result' + (perfect ? " perfect" : "") + '">' +
          '<span class="r-score">' + score + "<small>/" + QUESTIONS.length + "</small></span>" +
          "<h3>" + (perfect ? "Perfect score" : "Not quite there. Wanna try again?") + "</h3>" +
          "<p>" + (perfect
            ? "You matched every gold answer. Now imagine doing that across the whole hidden test set in Sinhala, with a model under 8B parameters."
            : "You matched " + score + " of " + QUESTIONS.length + ". Even strong compact models find Sinhala knowledge questions harder than they look.") +
          "</p>" +
          '<div class="r-actions">' +
            '<button type="button" class="q-btn r-again">' + (perfect ? "Play again" : "Try again") + "</button>" +
            (perfect ? '<a class="q-btn r-cta" data-link="registration" href="#">Register your team</a>' : "") +
          "</div>" +
        "</div>" +
        '<p class="q-note"></p>';

      var cta = quiz.querySelector("[data-link]");
      if (cta) {
        var url = (C.links || {}).registration;
        if (isTodo(url)) { cta.classList.add("disabled"); cta.removeAttribute("href"); cta.setAttribute("tabindex", "-1"); }
        else { cta.href = url; if (/^https?:/.test(url)) { cta.target = "_blank"; cta.rel = "noopener"; } }
      }
      quiz.querySelector(".r-again").addEventListener("click", function () {
        startRound();
        quiz.querySelector(".q-opt").focus();
      });
    };

    var choose = function (i) {
      if (answered) return;
      answered = true;
      var q = QUESTIONS[order[qi]], buttons = quiz.querySelectorAll(".q-opt"), correct = i === q.answer;
      if (correct) score++;
      Array.prototype.forEach.call(buttons, function (b, k) {
        b.disabled = true;
        if (k === q.answer) { b.classList.add("correct"); b.querySelector(".mk").textContent = "correct"; }
        else if (k === i) { b.classList.add("wrong"); b.querySelector(".mk").textContent = "your pick"; }
      });
      var last = qi === QUESTIONS.length - 1;
      var foot = quiz.querySelector(".q-foot");
      foot.innerHTML = '<span class="q-msg">' + (correct ? "<b>Correct.</b>" : "<b>Not quite.</b>") + "</span>" +
        '<button type="button" class="q-btn">' + (last ? "See your score →" : "Next question →") + "</button>";
      foot.querySelector(".q-btn").addEventListener("click", function () {
        if (last) { showResult(); return; }
        qi++; render();
        quiz.querySelector(".q-opt").focus();
      });
    };

    startRound();
  }
})();
