/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class.ball */ "./src/class.ball.js");
/* harmony import */ var _class_BallCollection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class.BallCollection */ "./src/class.BallCollection.js");
/* harmony import */ var _module_canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module.canvas */ "./src/module.canvas.js");






var ballCollection = new _class_BallCollection__WEBPACK_IMPORTED_MODULE_1__["default"]();
ballCollection.addMutiple(300);
ballCollection.setLeader(_module_canvas__WEBPACK_IMPORTED_MODULE_2__["default"].getCenter());


let mainInterval = setInterval(() => {
    ballCollection.process();
    ballCollection.drawAll();
}, 30);



window.addEventListener('click', (e) => {
    ballCollection.setPosition({
        x: e.clientX,
        y: e.clientY
    });
    ballCollection.spark(10);
});

/***/ }),

/***/ "./src/class.BallCollection.js":
/*!*************************************!*\
  !*** ./src/class.BallCollection.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BallCollection; });
/* harmony import */ var _class_ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class.ball */ "./src/class.ball.js");



class BallCollection {

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
        var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"](radius);
        this.ballArray.push(ball);
    }

    // ADD MUTIPLE BALLS
    addMutiple(amount) {
        for (var i = 0; i < amount; i += 1) {
            var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"]();
            this.ballArray.push(ball);
        }
    }

    // ADD RANDOM BALL
    addRndmBall(radius) {
        var ball = new _class_ball__WEBPACK_IMPORTED_MODULE_0__["default"](radius);
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

    setPosition(pixel) {
        this.ballArray.forEach((ball)=> {
            ball.setPosition(pixel);
        });
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

    spark(intensity) {
        this.ballArray.forEach((ball) => {
            ball.setLeader({
                x: ball.x * Math.random() * intensity,
                y: ball.y * Math.random() * intensity
            })
        });
    }
}

/***/ }),

/***/ "./src/class.ball.js":
/*!***************************!*\
  !*** ./src/class.ball.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ball; });
/* harmony import */ var _module_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module.canvas */ "./src/module.canvas.js");
/* harmony import */ var _colorConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorConfig */ "./src/colorConfig.js");



class Ball {
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

        this.red = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.red;
        this.green = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.green;
        this.blue = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.blue;
        this.alpha = _colorConfig__WEBPACK_IMPORTED_MODULE_1__["default"].ballColor.alpha;
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

    setPosition(pixel) { 
        this.x = pixel.x;
        this.y = pixel.y;
    }

    draw() {
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.strokeStyle = this.getColor();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineWidth = 1;
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.moveTo(this.x, this.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.lineTo(this.follower.x, this.follower.y);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.stroke();
    
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fillStyle = this.getColor();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.beginPath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.closePath();
        _module_canvas__WEBPACK_IMPORTED_MODULE_0__["default"].ctx.fill();
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


/***/ }),

/***/ "./src/colorConfig.js":
/*!****************************!*\
  !*** ./src/colorConfig.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    canvasColor: '#000',

    ballColor: {
        red: "255",
        green: "255",
        blue: "255",
        alpha: "1"
    },


});

/***/ }),

/***/ "./src/module.canvas.js":
/*!******************************!*\
  !*** ./src/module.canvas.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colorConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colorConfig */ "./src/colorConfig.js");


/* harmony default export */ __webpack_exports__["default"] = (buildCanvas());


function buildCanvas() {
    let canvas = document.getElementById('canvas');

    canvas.ctx = canvas.getContext('2d');
    canvas.ctx.fillStyle = _colorConfig__WEBPACK_IMPORTED_MODULE_0__["default"].canvasColor;

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuQmFsbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmJhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbG9yQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGUuY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7Ozs7O0FDeEJEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRTs7QUFFQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUU7QUFDQSwyQkFBMkIsV0FBVztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDeEdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMLEc7Ozs7Ozs7Ozs7Ozs7O0FDWEE7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAuanNcIik7XG4iLCJpbXBvcnQgQmFsbCBmcm9tICcuL2NsYXNzLmJhbGwnO1xuaW1wb3J0IEJhbGxDb2xsZWN0aW9uIGZyb20gJy4vY2xhc3MuQmFsbENvbGxlY3Rpb24nO1xuaW1wb3J0IENBTlZBUyBmcm9tICcuL21vZHVsZS5jYW52YXMnO1xuXG5cblxudmFyIGJhbGxDb2xsZWN0aW9uID0gbmV3IEJhbGxDb2xsZWN0aW9uKCk7XG5iYWxsQ29sbGVjdGlvbi5hZGRNdXRpcGxlKDMwMCk7XG5iYWxsQ29sbGVjdGlvbi5zZXRMZWFkZXIoQ0FOVkFTLmdldENlbnRlcigpKTtcblxuXG5sZXQgbWFpbkludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIGJhbGxDb2xsZWN0aW9uLnByb2Nlc3MoKTtcbiAgICBiYWxsQ29sbGVjdGlvbi5kcmF3QWxsKCk7XG59LCAzMCk7XG5cblxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGJhbGxDb2xsZWN0aW9uLnNldFBvc2l0aW9uKHtcbiAgICAgICAgeDogZS5jbGllbnRYLFxuICAgICAgICB5OiBlLmNsaWVudFlcbiAgICB9KTtcbiAgICBiYWxsQ29sbGVjdGlvbi5zcGFyaygxMCk7XG59KTsiLCJpbXBvcnQgQmFsbCBmcm9tICcuL2NsYXNzLmJhbGwnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGxDb2xsZWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhbGxBcnJheSA9IG5ldyBBcnJheSgpO1xuICAgIH1cblxuXG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYWxsQXJyYXkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIEFERCBFWElTVElORyBCQUxMXG4gICAgYWRkQmFsbChiYWxsKSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gQUREIE5FVyBCQUxMXG4gICAgYWRkTmV3QmFsbChyYWRpdXMpIHtcbiAgICAgICAgdmFyIGJhbGwgPSBuZXcgQmFsbChyYWRpdXMpO1xuICAgICAgICB0aGlzLmJhbGxBcnJheS5wdXNoKGJhbGwpO1xuICAgIH1cblxuICAgIC8vIEFERCBNVVRJUExFIEJBTExTXG4gICAgYWRkTXV0aXBsZShhbW91bnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbW91bnQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSBuZXcgQmFsbCgpO1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFERCBSQU5ET00gQkFMTFxuICAgIGFkZFJuZG1CYWxsKHJhZGl1cykge1xuICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKHJhZGl1cyk7XG4gICAgICAgIGJhbGwueGZvcmNlID0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgIGJhbGwueWZvcmNlID0gTWF0aC5yYW5kb20oKSAqIDg7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gU0VUIENPTE9SIE9GIEFMTFxuICAgIGNoYW5nZUNvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uc2V0Q29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24ocGl4ZWwpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkuZm9yRWFjaCgoYmFsbCk9PiB7XG4gICAgICAgICAgICBiYWxsLnNldFBvc2l0aW9uKHBpeGVsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVFJBTlNMQVRFIEFMTCBCQUxMUyAoVE8gTEVBREVSIFBPUylcbiAgICB0b0xlYWRlclBvcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgYmFsbC54ID0gYmFsbC5sZWFkZXIueDtcbiAgICAgICAgICAgIGJhbGwueSA9IGJhbGwubGVhZGVyLnk7XG4gICAgICAgICAgICBiYWxsLnhmb3JjZSA9IGJhbGwueGZvcmNlICogMC4wMDE7XG4gICAgICAgICAgICBiYWxsLnlmb3JjZSA9IGJhbGwueWZvcmNlICogMC4wMDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQUk9DRVNTIEFMTCBCQUxMU1xuICAgIHByb2Nlc3MoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwucHJvY2VzcygpO1xuICAgICAgICAgICAgYmFsbC50cmFja09iamVjdChiYWxsLmxlYWRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEUkFXIEFMTFxuICAgIGRyYXdBbGwoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uZHJhdygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUkFORE9NSVpFIEZPUkNFUyBBTExcbiAgICByYW5kb21pemVGb3JjZXMoZmFjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ucmFuZG9taXplRm9yY2VzKGZhY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGT1JDRSBUTyBYWVxuICAgIGZvcmNlVG8oeCwgeSwgZmFjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uZm9yY2VUbyh4LCB5LCBmYWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIExFQURFUiBGT1IgVFJBQ0tJTkdcbiAgICBzZXRMZWFkZXIobGVhZGVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ubGVhZGVyID0gbGVhZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQERlcHJlY2F0ZWRcbiAgICAvLyBUUkFDSyBSRU5ERVIgSU1BR0UgUElYRUxTXG4gICAgZHJhd1JlbmRlckltYWdlKHJlbmRlcmltYWdlKSB7XG4gICAgICAgIHZhciBpbWFnZXBpeGVscyA9IHJlbmRlcmltYWdlLnBpeGVsc3VtO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmxlYWRlciA9IHJlbmRlcmltYWdlLnBpeGVsYXJyYXlbaSAlIGltYWdlcGl4ZWxzXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBGUklDVElPTiBGQUNUT1JcbiAgICBzZXRGcmljdGlvbkZhY3RvcihmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5mcmljdGlvbmZhY3RvciA9IGZhY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBTUEVFRFxuICAgIHNldFNwZWVkKHNwZWVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0udHJhY2tzcGVlZCA9IHNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIEFMUEhBXG4gICAgc2V0QWxwaGEoYWxwaGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5hbHBoYSA9IGFscGhhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIFJBTkRPTSBSR0IoQSlcbiAgICBzZXRSbmRtQ29sb3IoKSB7XG5cbiAgICAgICAgdmFyIHJlZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIHZhciBncmVlbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgICAgIHZhciBibHVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLnJlZCA9IHJlZDtcbiAgICAgICAgICAgIGJhbGwuZ3JlZW4gPSBncmVlbjtcbiAgICAgICAgICAgIGJhbGwuYmx1ZSA9IGJsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIFNFVCBUUklBTkdMRVxuICAgIG1ha2VGb3JtKGVkZ2VzLCBkaXN0YW5jZSwgcm5kbUZhY3Rvcikge1xuXG4gICAgICAgIC8vIGZvciBsaW5lc1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpICYmIGkgKyBlZGdlcyA8PSB0aGlzLmdldFNpemUoKTsgaSArPSBlZGdlcykge1xuICAgICAgICAgICAgdmFyIGZvcm1DZW50ZXIgPSBuZXcgUGl4ZWwoTWF0aC5yYW5kb20oKSAqIGNhbnZhcy53aWR0aCwgTWF0aC5yYW5kb20oKSAqIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVkZ2VzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2kgKyBqXTtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbE5leHQgPSB0aGlzLmJhbGxBcnJheVtpICsgKChqICsgMSkgJSAoZWRnZXMpKV07XG4gICAgICAgICAgICAgICAgYmFsbC5mb2xsb3dlciA9IGJhbGxOZXh0O1xuICAgICAgICAgICAgICAgIGJhbGwubGVhZGVyID0gZm9ybUNlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBkaXN0YW5jZXNcbiAgICAgICAgdmFyIGFuZ2xlID0gMzYwIC8gZWRnZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCkgJiYgaSArIGVkZ2VzIDw9IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IGVkZ2VzKSB7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2VSTkRNID0gZGlzdGFuY2UgKyAoKE1hdGgucmFuZG9tKCkgLSAwLjUpICogcm5kbUZhY3RvciAqIGRpc3RhbmNlICogMik7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGVkZ2VzOyBqICs9IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2kgKyBqXTtcblxuICAgICAgICAgICAgICAgIHZhciBmYWN0b3JYID0gTWF0aEQuc2luKGFuZ2xlICogaik7XG4gICAgICAgICAgICAgICAgdmFyIGZhY3RvclkgPSBNYXRoRC5jb3MoYW5nbGUgKiBqKTtcblxuICAgICAgICAgICAgICAgIHZhciB4cGx1cyA9IGZhY3RvclggKiBkaXN0YW5jZVJORE07XG4gICAgICAgICAgICAgICAgdmFyIHlwbHVzID0gZmFjdG9yWSAqIGRpc3RhbmNlUk5ETTtcbiAgICAgICAgICAgICAgICBiYWxsLmxlYWRlciA9IG5ldyBQaXhlbChiYWxsLmxlYWRlci54ICsgeHBsdXMsIGJhbGwubGVhZGVyLnkgKyB5cGx1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG4gICAgLy8gTUFLRSBXQVRFUlxuICAgIG1ha2VXYXRlcihwaXhlbCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLmZvcmNlVG9EZWxheShwaXhlbCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzcGFyayhpbnRlbnNpdHkpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkuZm9yRWFjaCgoYmFsbCkgPT4ge1xuICAgICAgICAgICAgYmFsbC5zZXRMZWFkZXIoe1xuICAgICAgICAgICAgICAgIHg6IGJhbGwueCAqIE1hdGgucmFuZG9tKCkgKiBpbnRlbnNpdHksXG4gICAgICAgICAgICAgICAgeTogYmFsbC55ICogTWF0aC5yYW5kb20oKSAqIGludGVuc2l0eVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufSIsImltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcbmltcG9ydCBDT0xPUl9DT05GSUcgZnJvbSAnLi9jb2xvckNvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDI7XG4gICAgICAgIHRoaXMueCA9IDQ7XG4gICAgICAgIHRoaXMueSA9IDQ7XG4gICAgICAgIHRoaXMueGZvcmNlID0gMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSAwO1xuICAgICAgICB0aGlzLnhkaXN0YW5jZSA9IDA7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gMDtcblxuICAgICAgICAvL3RoaXMubGVhZGVyID0gbmV3IFBpeGVsKDQwMCwgNDAwKTtcbiAgICAgICAgdGhpcy50cmFja3NwZWVkID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uZmFjdG9yID0gMC45O1xuICAgICAgICB0aGlzLmZvbGxvd2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlZCA9IENPTE9SX0NPTkZJRy5iYWxsQ29sb3IucmVkO1xuICAgICAgICB0aGlzLmdyZWVuID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5ncmVlbjtcbiAgICAgICAgdGhpcy5ibHVlID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5ibHVlO1xuICAgICAgICB0aGlzLmFscGhhID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5hbHBoYTtcbiAgICB9XG5cbiAgICBnZXRDb2xvcigpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYShcIiArIHRoaXMucmVkICsgXCIsXCIgKyB0aGlzLmdyZWVuICsgXCIsXCIgKyB0aGlzLmJsdWUgKyBcIixcIiArIHRoaXMuYWxwaGEgKyBcIilcIjtcbiAgICB9XG5cbiAgICBzZXRDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSkge1xuICAgICAgICB0aGlzLnJlZCA9IHJlZDtcbiAgICAgICAgdGhpcy5ncmVlbiA9IGdyZWVuO1xuICAgICAgICB0aGlzLmJsdWUgPSBibHVlO1xuICAgICAgICB0aGlzLmFscGhhID0gYWxwaGE7XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24ocGl4ZWwpIHsgXG4gICAgICAgIHRoaXMueCA9IHBpeGVsLng7XG4gICAgICAgIHRoaXMueSA9IHBpeGVsLnk7XG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgQ0FOVkFTLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBDQU5WQVMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIENBTlZBUy5jdHgubGluZVRvKHRoaXMuZm9sbG93ZXIueCwgdGhpcy5mb2xsb3dlci55KTtcbiAgICAgICAgQ0FOVkFTLmN0eC5zdHJva2UoKTtcbiAgICBcbiAgICAgICAgQ0FOVkFTLmN0eC5maWxsU3R5bGUgPSB0aGlzLmdldENvbG9yKCk7XG4gICAgICAgIENBTlZBUy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIENBTlZBUy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLnJhZGl1cywgMCwgMiAqIE1hdGguUEksIHRydWUpO1xuICAgICAgICBDQU5WQVMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzKCkge1xuICAgICAgICB0aGlzLnggKz0gdGhpcy54Zm9yY2U7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlmb3JjZTtcbiAgICAgICAgdmFyIHhmID0gdGhpcy54Zm9yY2U7XG4gICAgICAgIHZhciB5ZiA9IHRoaXMueWZvcmNlO1xuICAgICAgICB0aGlzLnhmb3JjZSA9IHRoaXMueGZvcmNlICogdGhpcy5mcmljdGlvbmZhY3RvcjtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSB0aGlzLnlmb3JjZSAqIHRoaXMuZnJpY3Rpb25mYWN0b3I7XG4gICAgfVxuXG4gICAgdHJhY2tPYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHRoaXMueGRpc3RhbmNlID0gdGhpcy54IC0gb2JqZWN0Lng7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gdGhpcy55IC0gb2JqZWN0Lnk7XG4gICAgICAgIHZhciBhYnNvbHV0ZWRpc3RhbmNlID0gKE1hdGguYWJzKHRoaXMueGRpc3RhbmNlKSArXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnlkaXN0YW5jZSkpIC8gMjtcbiAgICAgICAgdGhpcy54Zm9yY2UgKz0gKHRoaXMueGRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqICgtdGhpcy50cmFja3NwZWVkKSAqIGFic29sdXRlZGlzdGFuY2UgLyAxMDA7XG4gICAgICAgIHRoaXMueWZvcmNlICs9ICh0aGlzLnlkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiAoLXRoaXMudHJhY2tzcGVlZCkgKiBhYnNvbHV0ZWRpc3RhbmNlIC8gMTAwO1xuICAgICAgICAvL3RoaXMucmFkaXVzID0gTWF0aC5taW4oNSwgNDAvYWJzb2x1dGVkaXN0YW5jZSk7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBNYXRoLm1pbigyNTUsIDUwIC8gYWJzb2x1dGVkaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgZm9yY2VUbyh4LCB5LCBmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54ZGlzdGFuY2UgPSB0aGlzLnggLSB4O1xuICAgICAgICB0aGlzLnlkaXN0YW5jZSA9IHRoaXMueSAtIHk7XG4gICAgXG4gICAgICAgIHRoaXMueGZvcmNlICs9IHRoaXMueGRpc3RhbmNlICogLWZhY3RvciAvIDEwMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgKz0gdGhpcy55ZGlzdGFuY2UgKiAtZmFjdG9yIC8gMTAwO1xuICAgIH1cblxuICAgIHJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpIHtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBmYWN0b3I7XG4gICAgICAgIHRoaXMueWZvcmNlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogZmFjdG9yO1xuICAgIH1cblxuICAgIGZvcmNlVG9EZWxheSAgIChwaXhlbCkge1xuICAgICAgICB2YXIgeGRpc3RhbmNlID0gdGhpcy54IC0gcGl4ZWwueDtcbiAgICAgICAgdmFyIHlkaXN0YW5jZSA9IHRoaXMueSAtIHBpeGVsLnk7XG4gICAgICAgIHZhciBhYnNvbHV0ZWRpc3RhbmNlID0gTWF0aC5zcXJ0KHhkaXN0YW5jZSAqIHhkaXN0YW5jZSArXG4gICAgICAgICAgICB5ZGlzdGFuY2UgKiB5ZGlzdGFuY2UpO1xuICAgICAgICB2YXIgZGVsYXkgPSBhYnNvbHV0ZWRpc3RhbmNlICogMjtcbiAgICBcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZm9yY2VGYWN0b3IgPSAxLjA7XG4gICAgXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi54Zm9yY2UgKz0gKHhkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiBmb3JjZUZhY3RvcjtcbiAgICAgICAgICAgIHNlbGYueWZvcmNlICs9ICh5ZGlzdGFuY2UgLyAoYWJzb2x1dGVkaXN0YW5jZSkpICogZm9yY2VGYWN0b3I7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9XG4gICAgXG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgY2FudmFzQ29sb3I6ICcjMDAwJyxcblxuICAgIGJhbGxDb2xvcjoge1xuICAgICAgICByZWQ6IFwiMjU1XCIsXG4gICAgICAgIGdyZWVuOiBcIjI1NVwiLFxuICAgICAgICBibHVlOiBcIjI1NVwiLFxuICAgICAgICBhbHBoYTogXCIxXCJcbiAgICB9LFxuXG5cbn07IiwiaW1wb3J0IENPTE9SX0NPTkZJRyBmcm9tICcuL2NvbG9yQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDYW52YXMoKTtcblxuXG5mdW5jdGlvbiBidWlsZENhbnZhcygpIHtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuXG4gICAgY2FudmFzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNhbnZhcy5jdHguZmlsbFN0eWxlID0gQ09MT1JfQ09ORklHLmNhbnZhc0NvbG9yO1xuXG4gICAgY2FudmFzLmZpdFRvU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICBjYW52YXMuZ2V0Q2VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogY2FudmFzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IGNhbnZhcy5oZWlnaHQgLyAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY2FudmFzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYW52YXMuY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG5cblxuICAgIC8vIEZ1bGxzY3JlZW5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2FudmFzLmZpdFRvU2NyZWVuKTtcbiAgICBjYW52YXMuZml0VG9TY3JlZW4oKTtcbiAgICBjYW52YXMuY2xlYXIoKTtcblxuICAgIHJldHVybiBjYW52YXM7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==