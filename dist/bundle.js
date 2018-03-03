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
    ballCollection.spark(1000);
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
        this.ballArray.forEach((ball) => {
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
                x: ball.x + (Math.random() - 0.5) * intensity,
                y: ball.y + (Math.random() - 0.5) * intensity
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

        this.leader;
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

    setLeader(pixel) {
        this.leader = pixel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuQmFsbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmJhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbG9yQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGUuY2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRTs7Ozs7Ozs7Ozs7Ozs7O0FDeEJEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRTs7QUFFQSwyQkFBMkIsV0FBVztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUU7QUFDQSwyQkFBMkIsV0FBVztBQUN0Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZNQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzVHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTCxHOzs7Ozs7Ozs7Ozs7OztBQ1hBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9jbGFzcy5iYWxsJztcbmltcG9ydCBCYWxsQ29sbGVjdGlvbiBmcm9tICcuL2NsYXNzLkJhbGxDb2xsZWN0aW9uJztcbmltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcblxuXG5cbnZhciBiYWxsQ29sbGVjdGlvbiA9IG5ldyBCYWxsQ29sbGVjdGlvbigpO1xuYmFsbENvbGxlY3Rpb24uYWRkTXV0aXBsZSgzMDApO1xuYmFsbENvbGxlY3Rpb24uc2V0TGVhZGVyKENBTlZBUy5nZXRDZW50ZXIoKSk7XG5cblxubGV0IG1haW5JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBiYWxsQ29sbGVjdGlvbi5wcm9jZXNzKCk7XG4gICAgYmFsbENvbGxlY3Rpb24uZHJhd0FsbCgpO1xufSwgMzApO1xuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBiYWxsQ29sbGVjdGlvbi5zZXRQb3NpdGlvbih7XG4gICAgICAgIHg6IGUuY2xpZW50WCxcbiAgICAgICAgeTogZS5jbGllbnRZXG4gICAgfSk7XG4gICAgYmFsbENvbGxlY3Rpb24uc3BhcmsoMTAwMCk7XG59KTsiLCJpbXBvcnQgQmFsbCBmcm9tICcuL2NsYXNzLmJhbGwnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGxDb2xsZWN0aW9uIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhbGxBcnJheSA9IG5ldyBBcnJheSgpO1xuICAgIH1cblxuXG5cbiAgICBnZXRTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYWxsQXJyYXkubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIEFERCBFWElTVElORyBCQUxMXG4gICAgYWRkQmFsbChiYWxsKSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gQUREIE5FVyBCQUxMXG4gICAgYWRkTmV3QmFsbChyYWRpdXMpIHtcbiAgICAgICAgdmFyIGJhbGwgPSBuZXcgQmFsbChyYWRpdXMpO1xuICAgICAgICB0aGlzLmJhbGxBcnJheS5wdXNoKGJhbGwpO1xuICAgIH1cblxuICAgIC8vIEFERCBNVVRJUExFIEJBTExTXG4gICAgYWRkTXV0aXBsZShhbW91bnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbW91bnQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSBuZXcgQmFsbCgpO1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFERCBSQU5ET00gQkFMTFxuICAgIGFkZFJuZG1CYWxsKHJhZGl1cykge1xuICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKHJhZGl1cyk7XG4gICAgICAgIGJhbGwueGZvcmNlID0gTWF0aC5yYW5kb20oKSAqIDU7XG4gICAgICAgIGJhbGwueWZvcmNlID0gTWF0aC5yYW5kb20oKSAqIDg7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gU0VUIENPTE9SIE9GIEFMTFxuICAgIGNoYW5nZUNvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uc2V0Q29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UG9zaXRpb24ocGl4ZWwpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkuZm9yRWFjaCgoYmFsbCkgPT4ge1xuICAgICAgICAgICAgYmFsbC5zZXRQb3NpdGlvbihwaXhlbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFRSQU5TTEFURSBBTEwgQkFMTFMgKFRPIExFQURFUiBQT1MpXG4gICAgdG9MZWFkZXJQb3MoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwueCA9IGJhbGwubGVhZGVyLng7XG4gICAgICAgICAgICBiYWxsLnkgPSBiYWxsLmxlYWRlci55O1xuICAgICAgICAgICAgYmFsbC54Zm9yY2UgPSBiYWxsLnhmb3JjZSAqIDAuMDAxO1xuICAgICAgICAgICAgYmFsbC55Zm9yY2UgPSBiYWxsLnlmb3JjZSAqIDAuMDAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUFJPQ0VTUyBBTEwgQkFMTFNcbiAgICBwcm9jZXNzKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLnByb2Nlc3MoKTtcbiAgICAgICAgICAgIGJhbGwudHJhY2tPYmplY3QoYmFsbC5sZWFkZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRFJBVyBBTExcbiAgICBkcmF3QWxsKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmRyYXcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJBTkRPTUlaRSBGT1JDRVMgQUxMXG4gICAgcmFuZG9taXplRm9yY2VzKGZhY3Rvcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLnJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRk9SQ0UgVE8gWFlcbiAgICBmb3JjZVRvKHgsIHksIGZhY3Rvcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmZvcmNlVG8oeCwgeSwgZmFjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBMRUFERVIgRk9SIFRSQUNLSU5HXG4gICAgc2V0TGVhZGVyKGxlYWRlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmxlYWRlciA9IGxlYWRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEBEZXByZWNhdGVkXG4gICAgLy8gVFJBQ0sgUkVOREVSIElNQUdFIFBJWEVMU1xuICAgIGRyYXdSZW5kZXJJbWFnZShyZW5kZXJpbWFnZSkge1xuICAgICAgICB2YXIgaW1hZ2VwaXhlbHMgPSByZW5kZXJpbWFnZS5waXhlbHN1bTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5sZWFkZXIgPSByZW5kZXJpbWFnZS5waXhlbGFycmF5W2kgJSBpbWFnZXBpeGVsc107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgRlJJQ1RJT04gRkFDVE9SXG4gICAgc2V0RnJpY3Rpb25GYWN0b3IoZmFjdG9yKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uZnJpY3Rpb25mYWN0b3IgPSBmYWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgU1BFRURcbiAgICBzZXRTcGVlZChzcGVlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLnRyYWNrc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBBTFBIQVxuICAgIHNldEFscGhhKGFscGhhKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0uYWxwaGEgPSBhbHBoYTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFVCBSQU5ET00gUkdCKEEpXG4gICAgc2V0Um5kbUNvbG9yKCkge1xuXG4gICAgICAgIHZhciByZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuICAgICAgICB2YXIgZ3JlZW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuICAgICAgICB2YXIgYmx1ZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgYmFsbC5yZWQgPSByZWQ7XG4gICAgICAgICAgICBiYWxsLmdyZWVuID0gZ3JlZW47XG4gICAgICAgICAgICBiYWxsLmJsdWUgPSBibHVlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBTRVQgVFJJQU5HTEVcbiAgICBtYWtlRm9ybShlZGdlcywgZGlzdGFuY2UsIHJuZG1GYWN0b3IpIHtcblxuICAgICAgICAvLyBmb3IgbGluZXNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKSAmJiBpICsgZWRnZXMgPD0gdGhpcy5nZXRTaXplKCk7IGkgKz0gZWRnZXMpIHtcbiAgICAgICAgICAgIHZhciBmb3JtQ2VudGVyID0gbmV3IFBpeGVsKE1hdGgucmFuZG9tKCkgKiBjYW52YXMud2lkdGgsIE1hdGgucmFuZG9tKCkgKiBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlZGdlczsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpICsgal07XG4gICAgICAgICAgICAgICAgdmFyIGJhbGxOZXh0ID0gdGhpcy5iYWxsQXJyYXlbaSArICgoaiArIDEpICUgKGVkZ2VzKSldO1xuICAgICAgICAgICAgICAgIGJhbGwuZm9sbG93ZXIgPSBiYWxsTmV4dDtcbiAgICAgICAgICAgICAgICBiYWxsLmxlYWRlciA9IGZvcm1DZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3IgZGlzdGFuY2VzXG4gICAgICAgIHZhciBhbmdsZSA9IDM2MCAvIGVkZ2VzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpICYmIGkgKyBlZGdlcyA8PSB0aGlzLmdldFNpemUoKTsgaSArPSBlZGdlcykge1xuICAgICAgICAgICAgdmFyIGRpc3RhbmNlUk5ETSA9IGRpc3RhbmNlICsgKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIHJuZG1GYWN0b3IgKiBkaXN0YW5jZSAqIDIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlZGdlczsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpICsgal07XG5cbiAgICAgICAgICAgICAgICB2YXIgZmFjdG9yWCA9IE1hdGhELnNpbihhbmdsZSAqIGopO1xuICAgICAgICAgICAgICAgIHZhciBmYWN0b3JZID0gTWF0aEQuY29zKGFuZ2xlICogaik7XG5cbiAgICAgICAgICAgICAgICB2YXIgeHBsdXMgPSBmYWN0b3JYICogZGlzdGFuY2VSTkRNO1xuICAgICAgICAgICAgICAgIHZhciB5cGx1cyA9IGZhY3RvclkgKiBkaXN0YW5jZVJORE07XG4gICAgICAgICAgICAgICAgYmFsbC5sZWFkZXIgPSBuZXcgUGl4ZWwoYmFsbC5sZWFkZXIueCArIHhwbHVzLCBiYWxsLmxlYWRlci55ICsgeXBsdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIC8vIE1BS0UgV0FURVJcbiAgICBtYWtlV2F0ZXIocGl4ZWwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgYmFsbC5mb3JjZVRvRGVsYXkocGl4ZWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3BhcmsoaW50ZW5zaXR5KSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LmZvckVhY2goKGJhbGwpID0+IHtcbiAgICAgICAgICAgIGJhbGwuc2V0TGVhZGVyKHtcbiAgICAgICAgICAgICAgICB4OiBiYWxsLnggKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBpbnRlbnNpdHksXG4gICAgICAgICAgICAgICAgeTogYmFsbC55ICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogaW50ZW5zaXR5XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59IiwiaW1wb3J0IENBTlZBUyBmcm9tICcuL21vZHVsZS5jYW52YXMnO1xuaW1wb3J0IENPTE9SX0NPTkZJRyBmcm9tICcuL2NvbG9yQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmFkaXVzID0gMjtcbiAgICAgICAgdGhpcy54ID0gNDtcbiAgICAgICAgdGhpcy55ID0gNDtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSAwO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IDA7XG4gICAgICAgIHRoaXMueGRpc3RhbmNlID0gMDtcbiAgICAgICAgdGhpcy55ZGlzdGFuY2UgPSAwO1xuXG4gICAgICAgIHRoaXMubGVhZGVyO1xuICAgICAgICB0aGlzLnRyYWNrc3BlZWQgPSAwLjQ7XG4gICAgICAgIHRoaXMuZnJpY3Rpb25mYWN0b3IgPSAwLjk7XG4gICAgICAgIHRoaXMuZm9sbG93ZXIgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucmVkID0gQ09MT1JfQ09ORklHLmJhbGxDb2xvci5yZWQ7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBDT0xPUl9DT05GSUcuYmFsbENvbG9yLmdyZWVuO1xuICAgICAgICB0aGlzLmJsdWUgPSBDT0xPUl9DT05GSUcuYmFsbENvbG9yLmJsdWU7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBDT0xPUl9DT05GSUcuYmFsbENvbG9yLmFscGhhO1xuICAgIH1cblxuICAgIGdldENvbG9yKCkge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKFwiICsgdGhpcy5yZWQgKyBcIixcIiArIHRoaXMuZ3JlZW4gKyBcIixcIiArIHRoaXMuYmx1ZSArIFwiLFwiICsgdGhpcy5hbHBoYSArIFwiKVwiO1xuICAgIH1cblxuICAgIHNldENvbG9yKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgICAgIHRoaXMucmVkID0gcmVkO1xuICAgICAgICB0aGlzLmdyZWVuID0gZ3JlZW47XG4gICAgICAgIHRoaXMuYmx1ZSA9IGJsdWU7XG4gICAgICAgIHRoaXMuYWxwaGEgPSBhbHBoYTtcbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihwaXhlbCkgeyBcbiAgICAgICAgdGhpcy54ID0gcGl4ZWwueDtcbiAgICAgICAgdGhpcy55ID0gcGl4ZWwueTtcbiAgICB9XG5cbiAgICBzZXRMZWFkZXIocGl4ZWwpIHtcbiAgICAgICAgdGhpcy5sZWFkZXIgPSBwaXhlbDtcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICBDQU5WQVMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5nZXRDb2xvcigpO1xuICAgICAgICBDQU5WQVMuY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIENBTlZBUy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIENBTlZBUy5jdHgubW92ZVRvKHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgQ0FOVkFTLmN0eC5saW5lVG8odGhpcy5mb2xsb3dlci54LCB0aGlzLmZvbGxvd2VyLnkpO1xuICAgICAgICBDQU5WQVMuY3R4LnN0cm9rZSgpO1xuICAgIFxuICAgICAgICBDQU5WQVMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuZ2V0Q29sb3IoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgdHJ1ZSk7XG4gICAgICAgIENBTlZBUy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIENBTlZBUy5jdHguZmlsbCgpO1xuICAgIH1cblxuICAgIHByb2Nlc3MoKSB7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnhmb3JjZTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueWZvcmNlO1xuICAgICAgICB2YXIgeGYgPSB0aGlzLnhmb3JjZTtcbiAgICAgICAgdmFyIHlmID0gdGhpcy55Zm9yY2U7XG4gICAgICAgIHRoaXMueGZvcmNlID0gdGhpcy54Zm9yY2UgKiB0aGlzLmZyaWN0aW9uZmFjdG9yO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IHRoaXMueWZvcmNlICogdGhpcy5mcmljdGlvbmZhY3RvcjtcbiAgICB9XG5cbiAgICB0cmFja09iamVjdChvYmplY3QpIHtcbiAgICAgICAgdGhpcy54ZGlzdGFuY2UgPSB0aGlzLnggLSBvYmplY3QueDtcbiAgICAgICAgdGhpcy55ZGlzdGFuY2UgPSB0aGlzLnkgLSBvYmplY3QueTtcbiAgICAgICAgdmFyIGFic29sdXRlZGlzdGFuY2UgPSAoTWF0aC5hYnModGhpcy54ZGlzdGFuY2UpICtcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMueWRpc3RhbmNlKSkgLyAyO1xuICAgICAgICB0aGlzLnhmb3JjZSArPSAodGhpcy54ZGlzdGFuY2UgLyAoYWJzb2x1dGVkaXN0YW5jZSkpICogKC10aGlzLnRyYWNrc3BlZWQpICogYWJzb2x1dGVkaXN0YW5jZSAvIDEwMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgKz0gKHRoaXMueWRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqICgtdGhpcy50cmFja3NwZWVkKSAqIGFic29sdXRlZGlzdGFuY2UgLyAxMDA7XG4gICAgICAgIC8vdGhpcy5yYWRpdXMgPSBNYXRoLm1pbig1LCA0MC9hYnNvbHV0ZWRpc3RhbmNlKTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IE1hdGgubWluKDI1NSwgNTAgLyBhYnNvbHV0ZWRpc3RhbmNlKTtcbiAgICB9XG5cbiAgICBmb3JjZVRvKHgsIHksIGZhY3Rvcikge1xuICAgICAgICB0aGlzLnhkaXN0YW5jZSA9IHRoaXMueCAtIHg7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gdGhpcy55IC0geTtcbiAgICBcbiAgICAgICAgdGhpcy54Zm9yY2UgKz0gdGhpcy54ZGlzdGFuY2UgKiAtZmFjdG9yIC8gMTAwO1xuICAgICAgICB0aGlzLnlmb3JjZSArPSB0aGlzLnlkaXN0YW5jZSAqIC1mYWN0b3IgLyAxMDA7XG4gICAgfVxuXG4gICAgcmFuZG9taXplRm9yY2VzKGZhY3Rvcikge1xuICAgICAgICB0aGlzLnhmb3JjZSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGZhY3RvcjtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBmYWN0b3I7XG4gICAgfVxuXG4gICAgZm9yY2VUb0RlbGF5ICAgKHBpeGVsKSB7XG4gICAgICAgIHZhciB4ZGlzdGFuY2UgPSB0aGlzLnggLSBwaXhlbC54O1xuICAgICAgICB2YXIgeWRpc3RhbmNlID0gdGhpcy55IC0gcGl4ZWwueTtcbiAgICAgICAgdmFyIGFic29sdXRlZGlzdGFuY2UgPSBNYXRoLnNxcnQoeGRpc3RhbmNlICogeGRpc3RhbmNlICtcbiAgICAgICAgICAgIHlkaXN0YW5jZSAqIHlkaXN0YW5jZSk7XG4gICAgICAgIHZhciBkZWxheSA9IGFic29sdXRlZGlzdGFuY2UgKiAyO1xuICAgIFxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBmb3JjZUZhY3RvciA9IDEuMDtcbiAgICBcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnhmb3JjZSArPSAoeGRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqIGZvcmNlRmFjdG9yO1xuICAgICAgICAgICAgc2VsZi55Zm9yY2UgKz0gKHlkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiBmb3JjZUZhY3RvcjtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH1cbiAgICBcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjYW52YXNDb2xvcjogJyMwMDAnLFxuXG4gICAgYmFsbENvbG9yOiB7XG4gICAgICAgIHJlZDogXCIyNTVcIixcbiAgICAgICAgZ3JlZW46IFwiMjU1XCIsXG4gICAgICAgIGJsdWU6IFwiMjU1XCIsXG4gICAgICAgIGFscGhhOiBcIjFcIlxuICAgIH0sXG5cblxufTsiLCJpbXBvcnQgQ09MT1JfQ09ORklHIGZyb20gJy4vY29sb3JDb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZENhbnZhcygpO1xuXG5cbmZ1bmN0aW9uIGJ1aWxkQ2FudmFzKCkge1xuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5cbiAgICBjYW52YXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY2FudmFzLmN0eC5maWxsU3R5bGUgPSBDT0xPUl9DT05GSUcuY2FudmFzQ29sb3I7XG5cbiAgICBjYW52YXMuZml0VG9TY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIGNhbnZhcy5nZXRDZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBjYW52YXMud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogY2FudmFzLmhlaWdodCAvIDJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjYW52YXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbnZhcy5jdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cblxuXG4gICAgLy8gRnVsbHNjcmVlblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYW52YXMuZml0VG9TY3JlZW4pO1xuICAgIGNhbnZhcy5maXRUb1NjcmVlbigpO1xuICAgIGNhbnZhcy5jbGVhcigpO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbn0iXSwic291cmNlUm9vdCI6IiJ9