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
      ctx.moveTo(15, 30);
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

  //Sección 3: Dibujar lineas Canvas
  function lineaRecta(canvas){
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(300, 10);
    ctx.beginPath();
  }
  let canvas = document.getElementById("lineaCanvas1");
  let ctx = canvas.getContext("2d");
  lineaRecta(canvas);
  
  canvas = document.getElementById("lineaCanvas2");
  ctx = canvas.getContext("2d");
  lineaRecta(canvas);

  canvas = document.getElementById("lineaCanvas3");
  ctx = canvas.getContext("2d");
  lineaRecta(canvas);

  //Sección 4: Dibujar Coche Canvas
  canvas = document.getElementById("cocheCanvas");
  ctx = canvas.getContext("2d");

  function dibujarParteCoche(x, y, width, height, radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft, color, borde = 0, colorBorde = color) {
      ctx.strokeStyle = colorBorde;
      ctx.lineWidth = borde;
      ctx.beginPath();
      ctx.moveTo(x + radiusTopLeft, y);

      // Lado superior
      ctx.lineTo(x + width - radiusTopRight, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radiusTopRight);

      // Lado derecho
      ctx.lineTo(x + width, y + height - radiusBottomRight);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radiusBottomRight, y + height);

      // Lado inferior
      ctx.lineTo(x + radiusBottomLeft, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radiusBottomLeft);

      // Lado izquierdo
      ctx.lineTo(x, y + radiusTopLeft);
      ctx.quadraticCurveTo(x, y, x + radiusTopLeft, y);

      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.stroke();
  }

  function dibujarLuces(x, y, radius, color) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = color;
      ctx.fill();
  }

      // Luna coche
      dibujarParteCoche(66, 40, 165, 70, 20, 20, 20, 20, "#a4a4a4", 8, "#231f20");

      // Morro coche
      dibujarParteCoche(50, 105, 200, 45, 10, 10, 0, 0, "#231f20", 0, "#231f20");

      // Parachoques coche
      dibujarParteCoche(20, 161, 260, 30, 10, 10, 0, 0, "#231f20", 5, "#231f20");
      dibujarParteCoche(100, 182, 100, 16, 5, 5, 5, 5, "#231f20", 0, "#231f20");

      // Ruedas coche
      dibujarParteCoche(50, 200, 40, 50, 0, 0, 10, 10, "#000000", 0, "#000000");
      dibujarParteCoche(210, 200, 40, 50, 0, 0, 10, 10, "#000000", 0, "#000000");

      // Matricula
      dibujarParteCoche(105, 167, 90, 16, 3, 3, 3, 3, "#FFFFFF", 0, "#FFFFFF");

      // Retrovisores
      dibujarParteCoche(127, 42, 40, 4, 2, 2, 2, 2, "#231f20", 0, "#231f20");
      dibujarParteCoche(57, 60, 8, 25, 5, 5, 5, 0, "#231f20", 0, "#231f20");
      dibujarParteCoche(232, 60, 8, 25, 5, 5, 0, 5, "#231f20", 0, "#231f20");

      // Detalles morro
      dibujarParteCoche(114, 110, 1, 33, 1, 1, 1, 1, "#FFFFFF", 0, "#FFFFFF");
      dibujarParteCoche(132, 110, 1, 33, 1, 1, 1, 1, "#FFFFFF", 0, "#FFFFFF");
      dibujarParteCoche(150, 110, 1, 33, 1, 1, 1, 1, "#FFFFFF", 0, "#FFFFFF");
      dibujarParteCoche(168, 110, 1, 33, 1, 1, 1, 1, "#FFFFFF", 0, "#FFFFFF");
      dibujarParteCoche(186, 110, 1, 33, 1, 1, 1, 1, "#FFFFFF", 0, "#FFFFFF");

      // Luces
      dibujarLuces(80, 130, 15, "#FFFFFF");
      dibujarLuces(220, 130, 15, "#FFFFFF");

  //Animación Luces Amarillas
  canvas.addEventListener("mouseenter", () => {
      dibujarLuces(80, 130, 15, "#FFFF00");
      dibujarLuces(220, 130, 15, "#FFFF00");
  });

  //Animación Luces blancas
  canvas.addEventListener("mouseleave", () => {
      dibujarLuces(80, 130, 15, "#FFFFFF");
      dibujarLuces(220, 130, 15, "#FFFFFF");
  });

  // Sección 5: Configuración menú movil
  function quitarMenu() {
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