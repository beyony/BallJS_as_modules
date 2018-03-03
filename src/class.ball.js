import CANVAS from './module.canvas';

export default class Ball {
    constructor() {
        this.radius = 2;
        this.x = 4;
        this.y = 4;
        this.xforce = 0;
        this.yforce = 0;
        this.xdistance = 0;
        this.ydistance = 0;

        //this.leader = new Pixel(400, 400);
        this.trackspeed = 0.4;
        this.frictionfactor = 0.9;
        this.follower = this;

        this.red = "0";
        this.green = "0";
        this.blue = "0";
        this.alpha = "1";
    }

    getColor() {
        return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
    }

    setColor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    draw() {
        CANVAS.ctx.strokeStyle = this.getColor();
        CANVAS.ctx.lineWidth = 1;
        CANVAS.ctx.beginPath();
        CANVAS.ctx.moveTo(this.x, this.y);
        CANVAS.ctx.lineTo(this.follower.x, this.follower.y);
        CANVAS.ctx.stroke();
    
        CANVAS.ctx.fillStyle = this.getColor();
        CANVAS.ctx.beginPath();
        CANVAS.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        CANVAS.ctx.closePath();
        CANVAS.ctx.fill();
    }

    process() {
        this.x += this.xforce;
        this.y += this.yforce;
        var xf = this.xforce;
        var yf = this.yforce;
        this.xforce = this.xforce * this.frictionfactor;
        this.yforce = this.yforce * this.frictionfactor;
    }

    trackObject(object) {
        this.xdistance = this.x - object.x;
        this.ydistance = this.y - object.y;
        var absolutedistance = (Math.abs(this.xdistance) +
            Math.abs(this.ydistance)) / 2;
        this.xforce += (this.xdistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
        this.yforce += (this.ydistance / (absolutedistance)) * (-this.trackspeed) * absolutedistance / 100;
        //this.radius = Math.min(5, 40/absolutedistance);
        this.alpha = Math.min(255, 50 / absolutedistance);
    }

    forceTo(x, y, factor) {
        this.xdistance = this.x - x;
        this.ydistance = this.y - y;
    
        this.xforce += this.xdistance * -factor / 100;
        this.yforce += this.ydistance * -factor / 100;
    }

    randomizeForces(factor) {
        this.xforce = (Math.random() - 0.5) * factor;
        this.yforce = (Math.random() - 0.5) * factor;
    }

    forceToDelay   (pixel) {
        var xdistance = this.x - pixel.x;
        var ydistance = this.y - pixel.y;
        var absolutedistance = Math.sqrt(xdistance * xdistance +
            ydistance * ydistance);
        var delay = absolutedistance * 2;
    
        var self = this;
        var forceFactor = 1.0;
    
        setTimeout(function () {
            self.xforce += (xdistance / (absolutedistance)) * forceFactor;
            self.yforce += (ydistance / (absolutedistance)) * forceFactor;
        }, delay);
    }
    
}
