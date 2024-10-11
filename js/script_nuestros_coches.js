// Sección 1: Gestión de Audio
const audioManager = (() => {
    let isOverCard = false;
    const fadeIntervals = {};
    const audioElements = {};
    let currentlyPlaying = null;
    let debounceTimeout;
  
    // Precarga los audios al iniciar
    function preloadAudios() {
      const audios = document.getElementsByTagName('audio');
      for (let audio of audios) {
        audioElements[audio.id] = audio;
        audio.load();
      }
      console.log('Audios precargados:', Object.keys(audioElements));
    }
  
    // Reproduce un sonido específico
    function playSound(id) {
      console.time('playSound');
      console.log('Intentando reproducir sonido:', id);
  
      const sound = audioElements[id];
      if (sound) {
        if (currentlyPlaying && currentlyPlaying !== sound) {
          fadeOutSound(currentlyPlaying);
        }
  
        if (fadeIntervals[id]) {
          clearInterval(fadeIntervals[id]);
          delete fadeIntervals[id];
        }
  
        sound.volume = 1;
        sound.currentTime = 0;
        sound.play()
          .then(() => {
            console.log('Audio reproducido con éxito:', id);
            console.timeEnd('playSound');
            currentlyPlaying = sound;
          })
          .catch(error => {
            console.error('Error al reproducir audio:', error);
            console.timeEnd('playSound');
          });
      } else {
        console.error('Elemento de audio no encontrado:', id);
        console.timeEnd('playSound');
      }
    }
  
    // Realiza un fade out suave del sonido
    function fadeOutSound(sound) {
      if (sound.paused || sound.volume === 0) return;
  
      if (fadeIntervals[sound.id]) {
        clearInterval(fadeIntervals[sound.id]);
      }
  
      fadeIntervals[sound.id] = setInterval(() => {
        if (sound.volume > 0.05) {
          sound.volume -= 0.05;
        } else {
          clearInterval(fadeIntervals[sound.id]);
          delete fadeIntervals[sound.id];
          sound.pause();
          sound.currentTime = 0;
          sound.volume = 1;
          if (currentlyPlaying === sound) {
            currentlyPlaying = null;
          }
        }
      }, 50);
    }
  
    // Maneja el evento de entrada del mouse en una tarjeta
    function handleCardEnter(event) {
      isOverCard = true;
      const audioElement = event.currentTarget.querySelector('audio');
      if (audioElement) {
        const audioId = audioElement.id;
        console.log('Mouse enter en tarjeta, audio ID:', audioId);
        playSound(audioId);
      } else {
        console.error('No se encontró elemento de audio en la tarjeta');
      }
    }
  
    // Maneja el evento de salida del mouse de una tarjeta
    function handleCardLeave() {
      isOverCard = false;
    }
  
    // Maneja el movimiento del mouse dentro del artículo con debounce
    function handleArticleMove() {
      if (debounceTimeout) clearTimeout(debounceTimeout);
  
      debounceTimeout = setTimeout(() => {
        if (!isOverCard && currentlyPlaying) {
          fadeOutSound(currentlyPlaying);
        }
      }, 100);
    }
  
    // Configura los event listeners para el audio
    function setupAudioListeners() {
      const article = document.querySelector('article');
      const cards = document.querySelectorAll('.card');
  
      if (article) {
        article.addEventListener('mousemove', handleArticleMove);
      } else {
        console.error('Elemento article no encontrado');
      }
  
      if (cards.length > 0) {
        cards.forEach((card, index) => {
          card.addEventListener('mouseenter', handleCardEnter);
          card.addEventListener('mouseleave', handleCardLeave);
          console.log('Event listeners añadidos a la tarjeta', index);
        });
      } else {
        console.error('No se encontraron elementos con clase "card"');
      }
    }
  
    return {
      preloadAudios,
      setupAudioListeners
    };
  })();
  
  // Sección 2: Gestión del Botón de Subir y Canvas
  const scrollManager = (() => {
    // Dibuja la flecha en el canvas
    function dibujarFlecha(ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
  
      ctx.beginPath();
      ctx.moveTo(15, 25);
      ctx.lineTo(15, 5);
      ctx.lineTo(5, 15);
      ctx.moveTo(15, 5);
      ctx.lineTo(25, 15);
      ctx.stroke();
    }
  
    // Configura el botón de subir y el canvas
    function setupScrollButton() {
      const menu = document.getElementById('menu');
      const botonSubir = document.getElementById('botonSubir');
      const canvas = document.getElementById('flechaCanvas');
      const ctx = canvas.getContext('2d');
  
      dibujarFlecha(ctx);
  
      window.addEventListener('scroll', () => {
        if (window.scrollY > menu.offsetHeight) {
          botonSubir.classList.add('visible');
        } else {
          botonSubir.classList.remove('visible');
        }
      });
  
      botonSubir.addEventListener('click', () => {
        const scrollStep = -window.scrollY / (200 / 10);
        
        function scrollAnimation() {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
            requestAnimationFrame(scrollAnimation);
          }
        }
        requestAnimationFrame(scrollAnimation);
      });
    }
  
    return {
      setupScrollButton
    };
  })();

  // Sección 3: Configuración menú movil
  function setupSubmenuClickHandler() {
    let menuCheckbox = document.getElementById('checkbox');
    menuCheckbox.checked = false;
  }

  
  // Inicialización cuando el DOM está listo
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando configuración');
    audioManager.preloadAudios();
    audioManager.setupAudioListeners();
    scrollManager.setupScrollButton();
    mobileMenuManager.setupMobileMenu();
  });