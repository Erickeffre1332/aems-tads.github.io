
document.addEventListener('DOMContentLoaded', function() {
    const heroPopup = document.getElementById('hero-popup');
    const heroText = document.querySelector('.hero-popup-text');
    const closeHero = document.getElementById('close-hero');
  
    function typeWriter(text, element, speed, callback) {
      let i = 0;
      element.textContent = '';
      function typing() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        } else if (callback) {
          callback();
        }
      }
      typing();
    }
  
    typeWriter("SOFREU UM CYBERATAQUE? EVITE PREJUÍZOS, ATUE RAPIDAMENTE!", heroText, 50, () => {
      closeHero.style.opacity = '1';
    });
  
    closeHero.addEventListener('click', function() {
      heroPopup.style.display = 'none';
      const colors = ['#ff0000', '#ff6600', '#ffcc00', '#ffffff'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        
        const animation = confetti.animate([
          { top: '-10px', opacity: 1 },
          { top: '100vh', opacity: 0 }
        ], {
          duration: 1000 + Math.random() * 2000,
          easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        document.body.appendChild(confetti);
        animation.onfinish = () => confetti.remove();
      }
    });
  
    function setupCardTilt() {
      const cards = document.querySelectorAll('.news-card, .tip, .dica');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const angleX = (y - centerY) / 100;
          const angleY = (centerX - x) / 100;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
      });
    }
  
    function animateOnScroll() {
      const elements = document.querySelectorAll('.news-card, .tip, .dica, .passo');
      const windowHeight = window.innerHeight;
      
      elements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < windowHeight - 100) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }
  
    document.querySelectorAll('.news-card, .tip, .dica, .passo').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  
    setupCardTilt();
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
  });
// transição suave dos links
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 
      const targetId = this.getAttribute('href').substring(1); 
      const targetElement = document.getElementById(targetId);

      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

