(() => {
  'use strict';
  const contacts = window.OPTIQUE_CONTACTS || {};
  document.querySelectorAll('[data-contact]').forEach(link => {
    const key = link.dataset.contact;
    const value = contacts[key];
    if (typeof value !== 'string' || !value.trim()) return;
    if (key === 'email') {
      // Ouvre une composition de message. Aucun envoi automatique.
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        link.href = 'mailto:' + value;
        link.setAttribute('aria-label', 'Envoyer un e-mail à ' + value);
        link.firstElementChild.textContent = 'Envoyer un e-mail à ' + value;
      }
      return;
    }
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return;
      link.href = url.href;
      if (key === 'instagram') {
        const account = url.pathname.split('/').filter(Boolean)[0] || 'de la boutique';
        link.setAttribute('aria-label', 'Ouvrir le profil Instagram ' + account + ' — nouvel onglet');
        link.firstElementChild.textContent = 'Notre compte Instagram ' + account;
      }
    } catch { /* Une saisie invalide conserve le lien de secours du HTML. */ }
  });
})();
