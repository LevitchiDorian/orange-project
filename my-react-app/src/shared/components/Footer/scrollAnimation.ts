document.addEventListener('scroll', () => {
    const footer = document.querySelector('.footer') as HTMLElement;
    if (!footer) return;
  
    const footerPosition = footer.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
  
    // Verificăm dacă footer-ul este vizibil
    if (footerPosition < viewportHeight) {
      footer.classList.add('scroll-animate');
    } else {
      footer.classList.remove('scroll-animate');
    }
  });
  