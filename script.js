(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu navigasi');
    navigation.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
      navigation.classList.toggle('open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navigation.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  let headerUpdateFrame = 0;
  let headerIsScrolled = false;

  const updateHeader = () => {
    headerUpdateFrame = 0;
    const isScrolled = window.scrollY > 16;
    if (!header || isScrolled === headerIsScrolled) return;
    headerIsScrolled = isScrolled;
    header.classList.toggle('scrolled', isScrolled);
  };

  const scheduleHeaderUpdate = () => {
    if (headerUpdateFrame) return;
    headerUpdateFrame = window.requestAnimationFrame(updateHeader);
  };

  updateHeader();
  window.addEventListener('scroll', scheduleHeaderUpdate, { passive: true });

  const profilePhotoFrame = document.querySelector('[data-profile-tilt]');

  if (profilePhotoFrame && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const updateProfileTilt = (event) => {
      const bounds = profilePhotoFrame.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width;
      const vertical = (event.clientY - bounds.top) / bounds.height;
      profilePhotoFrame.style.setProperty('--photo-rx', `${(0.5 - vertical) * 10}deg`);
      profilePhotoFrame.style.setProperty('--photo-ry', `${(horizontal - 0.5) * 10}deg`);
      profilePhotoFrame.style.setProperty('--shine-x', `${horizontal * 100}%`);
      profilePhotoFrame.style.setProperty('--shine-y', `${vertical * 100}%`);
    };

    const resetProfileTilt = () => {
      profilePhotoFrame.style.setProperty('--photo-rx', '0deg');
      profilePhotoFrame.style.setProperty('--photo-ry', '0deg');
      profilePhotoFrame.style.setProperty('--shine-x', '50%');
      profilePhotoFrame.style.setProperty('--shine-y', '50%');
    };

    profilePhotoFrame.addEventListener('pointermove', updateProfileTilt);
    profilePhotoFrame.addEventListener('pointerleave', resetProfileTilt);
  }

  const technologyStage = document.querySelector('[data-tech-stage]');

  if (technologyStage && !reduceMotion) {
    if ('IntersectionObserver' in window) {
      const technologyAnimationObserver = new IntersectionObserver(([entry]) => {
        technologyStage.classList.toggle('is-active', entry.isIntersecting);
      }, { rootMargin: '120px 0px' });
      technologyAnimationObserver.observe(technologyStage);
    } else {
      technologyStage.classList.add('is-active');
    }
  }

  if (technologyStage && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const technologyItems = Array.from(technologyStage.querySelectorAll('[data-tech-depth]'));

    const updateTechnologyParallax = (event) => {
      const bounds = technologyStage.getBoundingClientRect();
      const horizontal = ((event.clientX - bounds.left) / bounds.width) - 0.5;
      const vertical = ((event.clientY - bounds.top) / bounds.height) - 0.5;

      technologyItems.forEach((item) => {
        const depth = Number.parseFloat(item.dataset.techDepth) || 16;
        item.style.setProperty('--parallax-x', `${horizontal * depth}px`);
        item.style.setProperty('--parallax-y', `${vertical * depth}px`);
      });
    };

    const resetTechnologyParallax = () => {
      technologyItems.forEach((item) => {
        item.style.setProperty('--parallax-x', '0px');
        item.style.setProperty('--parallax-y', '0px');
      });
    };

    technologyStage.addEventListener('pointermove', updateTechnologyParallax);
    technologyStage.addEventListener('pointerleave', resetTechnologyParallax);
  }

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
  }

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);
          if (isActive) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll('[data-project-scroll]').forEach((preview) => {
    const visual = preview.closest('.project-visual-scroll');
    let progressFrame = 0;

    const updateProgress = () => {
      progressFrame = 0;
      const scrollable = preview.scrollHeight - preview.clientHeight;
      const progress = scrollable > 0 ? preview.scrollTop / scrollable : 0;
      visual?.style.setProperty('--project-scroll-progress', String(progress));
    };

    const scheduleProgressUpdate = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(updateProgress);
    };

    preview.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
    preview.addEventListener('keydown', (event) => {
      if (event.key === 'Home') preview.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (event.key === 'End') preview.scrollTo({ top: preview.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    updateProgress();
  });

  const credentialsRail = document.querySelector('[data-credentials-rail]');
  const credentialsPrevious = document.querySelector('[data-credentials-prev]');
  const credentialsNext = document.querySelector('[data-credentials-next]');
  const credentialsCount = document.querySelector('[data-credentials-count]');
  const credentialJumpButtons = Array.from(document.querySelectorAll('[data-credential-jump]'));

  if (credentialsRail && credentialsPrevious && credentialsNext) {
    const credentialCards = Array.from(credentialsRail.querySelectorAll('.credential-card'));
    let activeCredentialIndex = 0;

    const getCredentialMetrics = () => {
      const card = credentialCards[0];
      const gap = Number.parseFloat(getComputedStyle(credentialsRail).gap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : 1;
      const visible = Math.max(1, Math.round((credentialsRail.clientWidth + gap) / step));
      const maximumIndex = Math.max(0, credentialCards.length - visible);
      const index = Math.min(maximumIndex, Math.max(0, Math.round(credentialsRail.scrollLeft / step)));
      return { index, maximumIndex, step, visible };
    };

    const setActiveCredential = (index) => {
      if (index === activeCredentialIndex && credentialJumpButtons[index]?.classList.contains('is-active')) return;
      activeCredentialIndex = index;
      credentialJumpButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === index;
        button.classList.toggle('is-active', isActive);
        if (isActive) button.setAttribute('aria-current', 'true');
        else button.removeAttribute('aria-current');
      });
    };

    const updateCredentialControls = () => {
      const { index, maximumIndex, visible } = getCredentialMetrics();
      credentialsPrevious.disabled = index === 0;
      credentialsNext.disabled = index === maximumIndex;
      if (credentialsCount) {
        const first = index + 1;
        const last = Math.min(credentialCards.length, first + visible - 1);
        credentialsCount.textContent = `${first}${last > first ? `–${last}` : ''} / ${credentialCards.length}`;
      }
      setActiveCredential(index);
    };

    const scrollCredentials = (direction) => {
      const { index, maximumIndex, step } = getCredentialMetrics();
      const targetIndex = Math.min(maximumIndex, Math.max(0, index + direction));
      credentialsRail.scrollTo({
        left: targetIndex * step,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    };

    credentialsPrevious.addEventListener('click', () => scrollCredentials(-1));
    credentialsNext.addEventListener('click', () => scrollCredentials(1));
    credentialsRail.addEventListener('scroll', updateCredentialControls, { passive: true });
    credentialsRail.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollCredentials(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollCredentials(1);
      }
    });

    credentialJumpButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const { maximumIndex, step } = getCredentialMetrics();
        const requestedIndex = Number.parseInt(button.dataset.credentialJump, 10) || 0;
        credentialsRail.scrollTo({
          left: Math.min(maximumIndex, requestedIndex) * step,
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      });
    });

    if (!reduceMotion) {
      window.setInterval(() => {
        const credentialsSection = credentialsRail.closest('.credentials');
        const isPaused = document.hidden
          || document.body.classList.contains('dialog-open')
          || credentialsSection?.matches(':hover')
          || credentialsSection?.contains(document.activeElement);
        if (isPaused) return;

        const { index, maximumIndex, step } = getCredentialMetrics();
        const targetIndex = index >= maximumIndex ? 0 : index + 1;
        credentialsRail.scrollTo({ left: targetIndex * step, behavior: 'smooth' });
      }, 5000);
    }

    window.addEventListener('resize', updateCredentialControls);
    updateCredentialControls();
  }

  const certificateOpeners = document.querySelectorAll('[data-certificate-open]');
  const certificateDialogs = document.querySelectorAll('[data-certificate-dialog]');

  const closeCertificate = (dialog) => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('dialog-open');
  };

  certificateOpeners.forEach((opener) => {
    opener.addEventListener('click', () => {
      const dialogName = opener.dataset.certificateOpen;
      const dialog = Array.from(certificateDialogs).find((item) => item.dataset.certificateDialog === dialogName);
      if (!dialog) return;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('dialog-open');
    });
  });

  certificateDialogs.forEach((dialog) => {
    dialog.querySelector('[data-certificate-close]')?.addEventListener('click', () => closeCertificate(dialog));
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeCertificate(dialog);
    });
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
