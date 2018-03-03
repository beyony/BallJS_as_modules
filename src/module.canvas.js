export default buildCanvas();


function buildCanvas() {
    let canvas = document.getElementById('canvas');

    canvas.ctx = canvas.getContext("2d");

    canvas.fitToScreen = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    canvas.getCenter = function() {
        return {
            x: canvas.width / 2,
            y: canvas.height / 2
        };
    }

    

    // Fullscreen
    window.addEventListener("resize", canvas.fitToScreen);
    canvas.fitToScreen();

    return canvas;
}