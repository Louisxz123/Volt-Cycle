/**
 * VoltCycle — shared/main.js
 * Lógica comum a todas as páginas: tema (light/dark) e menu mobile.
 * Cada página deve incluir este script ANTES do seu próprio JS.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'voltcycle-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    });
  }

  function initTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
      });
    });
  }

  function initMobileMenu() {
    var hamburger = document.querySelector('.hamburger');
    var menu = document.querySelector('.mobile-menu');
    if (!hamburger || !menu) return;

    hamburger.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileMenu();
  });
})();