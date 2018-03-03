import COLOR_CONFIG from './colorConfig';

export default buildCanvas();


function buildCanvas() {
    let canvas = document.getElementById('canvas');

    canvas.ctx = canvas.getContext('2d');
    canvas.ctx.fillStyle = COLOR_CONFIG.canvasColor;

    canvas.fitToScreen = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    canvas.getCenter = function () {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
    }

    canvas.clear = function () {
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }



    // Fullscreen
    window.addEventListener('resize', canvas.fitToScreen);
    canvas.fitToScreen();
    canvas.clear();

    return canvas;
}