/* ============================================================
   tpl-website — 多端业务应用框架官网脚本
   纯原生 JS，无依赖
   功能：主题切换/记忆、移动端菜单、滚动导航高亮、代码复制、滚动淡入
   ============================================================ */
(function () {
  'use strict';

  var THEME_KEY = 'tpl-theme';
  var root = document.documentElement;

  /* ---------- 工具 ---------- */
  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncThemeButton(theme) {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var label = theme === 'dark' ? '切换到浅色主题' : '切换到暗色主题';
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        /* 忽略隐私模式写入失败 */
      }
    }
    syncThemeButton(theme);
  }

  /* ---------- 1. 主题切换 ---------- */
  function initTheme() {
    // head 内联脚本已预置 data-theme；这里仅同步按钮状态
    syncThemeButton(currentTheme());

    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }

    // 无本地记忆时跟随系统偏好变化
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (e) {
        var saved = null;
        try {
          saved = localStorage.getItem(THEME_KEY);
        } catch (err) {
          /* ignore */
        }
        if (!saved) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      };
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', onChange);
      } else if (typeof mq.addListener === 'function') {
        mq.addListener(onChange); // 旧浏览器兼容
      }
    }
  }

  /* ---------- 2. 移动端菜单 ---------- */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    });

    // 点击导航项后关闭菜单
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', '打开菜单');
      }
    });
  }

  /* ---------- 3. 顶栏滚动状态 ---------- */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 4. 滚动导航高亮 ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.main-nav .nav-link'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (l) {
        return document.querySelector(l.getAttribute('href'));
      })
      .filter(Boolean);

    var map = {};
    links.forEach(function (l) {
      map[l.getAttribute('href').slice(1)] = l;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            links.forEach(function (l) {
              l.classList.remove('is-active');
            });
            var id = '#' + entry.target.id;
            if (map[id]) map[id].classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------- 5. 代码块复制 ---------- */
  function initCopy() {
    var btns = Array.prototype.slice.call(document.querySelectorAll('.code-copy'));
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy') || '';
        var done = function () {
          var original = btn.textContent;
          btn.textContent = '已复制';
          btn.classList.add('is-copied');
          setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove('is-copied');
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () {
            fallbackCopy(text);
            done();
          });
        } else {
          fallbackCopy(text);
          done();
        }
      });
    });

    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        /* 忽略 */
      }
      document.body.removeChild(ta);
    }
  }

  /* ---------- 6. 滚动淡入 ---------- */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    var reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 启动 ---------- */
  function boot() {
    initTheme();
    initNav();
    initHeaderScroll();
    initScrollSpy();
    initCopy();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
