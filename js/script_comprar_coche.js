//Dibujar Coche Canvas
let canvas = document.getElementById("cocheCanvas");
let ctx = canvas.getContext("2d");

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