document.addEventListener('DOMContentLoaded', function () {
  const heroPopup = document.getElementById('hero-popup');
  const heroText = document.querySelector('.hero-popup-text');
  const closeHero = document.getElementById('close-hero');

  document.body.classList.add('no-scroll');

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

  closeHero.addEventListener('click', function () {
    heroPopup.classList.add('fade-out');

    setTimeout(() => {
      heroPopup.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 500);
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

  /*Estrelas de avaliação*/
  const openBtn = document.getElementById("openRating");
  const closeBtn = document.getElementById("closeRating");
  const stars = document.getElementById("stars");

  openBtn.addEventListener("click", () => {
    stars.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    stars.classList.remove("open");
  });

  /*Envio avaliação p/ formulario*/
  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSfI2NzkjYZ4WHdTw7-qTw-lERDfXlVpr7m7hIO1ChrxGneKMw/formResponse"; /*Link Form*/
  const entryID = "entry.971847553"; /*Código da pergunta*/

  const submitButton = document.getElementById("submitRating");

  submitButton.addEventListener("click", () => {
    const selected = document.querySelector('input[name="rate"]:checked');

    if (!selected) {
      alert("Por favor, selecione uma avaliação antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append(entryID, selected.value);

    fetch(formURL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(() => {
        alert("✅ Avaliação enviada com sucesso!");
        document.getElementById("stars").classList.remove("open"); /*Fecha o pop-up*/
      })
      .catch(() => {
        alert("❌ Erro ao enviar a avaliação.");
      });
  });
});
