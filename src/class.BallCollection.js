import Ball from './class.ball';


export default class BallCollection {
    
    constructor() {
        this.ballArray = new Array();
    }



    getSize() {
        return this.ballArray.length;
    }

    // ADD EXISTING BALL
    addBall(ball) {
        this.ballArray.push(ball);
    }

    // ADD NEW BALL
    addNewBall(radius) {
        var ball = new Ball(radius);
        this.ballArray.push(ball);
    }

    // ADD MUTIPLE BALLS
    addMutiple(amount) {
        for (var i = 0; i < amount; i += 1) {
            var ball = new Ball();
            this.ballArray.push(ball);
        }
    }

    // ADD RANDOM BALL
    addRndmBall(radius) {
        var ball = new Ball(radius);
        ball.xforce = Math.random() * 5;
        ball.yforce = Math.random() * 8;
        this.ballArray.push(ball);
    }

    // SET COLOR OF ALL
    changeColor(red, green, blue, alpha) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].setColor(red, green, blue, alpha);
        }
    }

    // TRANSLATE ALL BALLS (TO LEADER POS)
    toLeaderPos() {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.x = ball.leader.x;
            ball.y = ball.leader.y;
            ball.xforce = ball.xforce * 0.001;
            ball.yforce = ball.yforce * 0.001;
        }
    }

    // PROCESS ALL BALLS
    process() {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.process();
            ball.trackObject(ball.leader);
        }
    }

    // DRAW ALL
    drawAll() {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].draw();
        }
    }

    // RANDOMIZE FORCES ALL
    randomizeForces(factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].randomizeForces(factor);
        }
    }

    // FORCE TO XY
    forceTo(x, y, factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].forceTo(x, y, factor);
        }
    }

    // SET LEADER FOR TRACKING
    setLeader(leader) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].leader = leader;
        }
    }

    // @Deprecated
    // TRACK RENDER IMAGE PIXELS
    drawRenderImage(renderimage) {
        var imagepixels = renderimage.pixelsum;
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].leader = renderimage.pixelarray[i % imagepixels];
        }
    }

    // SET FRICTION FACTOR
    setFrictionFactor(factor) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].frictionfactor = factor;
        }
    }

    // SET SPEED
    setSpeed(speed) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].trackspeed = speed;
        }
    }

    // SET ALPHA
    setAlpha(alpha) {
        for (var i = 0; i < this.getSize(); i += 1) {
            this.ballArray[i].alpha = alpha;
        }
    }

    // SET RANDOM RGB(A)
    setRndmColor() {

        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);

        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.red = red;
            ball.green = green;
            ball.blue = blue;
        }
    }


    // SET TRIANGLE
    makeForm(edges, distance, rndmFactor) {

        // for lines
        for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
            var formCenter = new Pixel(Math.random() * canvas.width, Math.random() * canvas.height);

            for (var j = 0; j < edges; j += 1) {
                var ball = this.ballArray[i + j];
                var ballNext = this.ballArray[i + ((j + 1) % (edges))];
                ball.follower = ballNext;
                ball.leader = formCenter;
            }
        }

        // for distances
        var angle = 360 / edges;
        for (var i = 0; i < this.getSize() && i + edges <= this.getSize(); i += edges) {
            var distanceRNDM = distance + ((Math.random() - 0.5) * rndmFactor * distance * 2);
            for (var j = 0; j < edges; j += 1) {
                var ball = this.ballArray[i + j];

                var factorX = MathD.sin(angle * j);
                var factorY = MathD.cos(angle * j);

                var xplus = factorX * distanceRNDM;
                var yplus = factorY * distanceRNDM;
                ball.leader = new Pixel(ball.leader.x + xplus, ball.leader.y + yplus);
            }
        }
    }



    // MAKE WATER
    makeWater(pixel) {
        for (var i = 0; i < this.getSize(); i += 1) {
            var ball = this.ballArray[i];
            ball.forceToDelay(pixel);
        }
    }
}