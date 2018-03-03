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
    ballCollection.setLeader({
        x: e.clientX,
        y: e.clientY
    });
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

/***/ "./src/module.canvas.js":
/*!******************************!*\
  !*** ./src/module.canvas.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (buildCanvas());


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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuQmFsbENvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmJhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZS5jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsRTs7Ozs7Ozs7Ozs7Ozs7O0FDdkJEOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsb0JBQW9CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsbURBQW1EO0FBQzFFOztBQUVBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7QUN4TEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNsR0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9jbGFzcy5iYWxsJztcbmltcG9ydCBCYWxsQ29sbGVjdGlvbiBmcm9tICcuL2NsYXNzLkJhbGxDb2xsZWN0aW9uJztcbmltcG9ydCBDQU5WQVMgZnJvbSAnLi9tb2R1bGUuY2FudmFzJztcblxuXG5cbnZhciBiYWxsQ29sbGVjdGlvbiA9IG5ldyBCYWxsQ29sbGVjdGlvbigpO1xuYmFsbENvbGxlY3Rpb24uYWRkTXV0aXBsZSgzMDApO1xuYmFsbENvbGxlY3Rpb24uc2V0TGVhZGVyKENBTlZBUy5nZXRDZW50ZXIoKSk7XG5cblxubGV0IG1haW5JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBiYWxsQ29sbGVjdGlvbi5wcm9jZXNzKCk7XG4gICAgYmFsbENvbGxlY3Rpb24uZHJhd0FsbCgpO1xufSwgMzApO1xuXG5cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBiYWxsQ29sbGVjdGlvbi5zZXRMZWFkZXIoe1xuICAgICAgICB4OiBlLmNsaWVudFgsXG4gICAgICAgIHk6IGUuY2xpZW50WVxuICAgIH0pO1xufSk7IiwiaW1wb3J0IEJhbGwgZnJvbSAnLi9jbGFzcy5iYWxsJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsQ29sbGVjdGlvbiB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG5cblxuICAgIGdldFNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbGxBcnJheS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gQUREIEVYSVNUSU5HIEJBTExcbiAgICBhZGRCYWxsKGJhbGwpIHtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBBREQgTkVXIEJBTExcbiAgICBhZGROZXdCYWxsKHJhZGl1cykge1xuICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKHJhZGl1cyk7XG4gICAgICAgIHRoaXMuYmFsbEFycmF5LnB1c2goYmFsbCk7XG4gICAgfVxuXG4gICAgLy8gQUREIE1VVElQTEUgQkFMTFNcbiAgICBhZGRNdXRpcGxlKGFtb3VudCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFtb3VudDsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IG5ldyBCYWxsKCk7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheS5wdXNoKGJhbGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQUREIFJBTkRPTSBCQUxMXG4gICAgYWRkUm5kbUJhbGwocmFkaXVzKSB7XG4gICAgICAgIHZhciBiYWxsID0gbmV3IEJhbGwocmFkaXVzKTtcbiAgICAgICAgYmFsbC54Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogNTtcbiAgICAgICAgYmFsbC55Zm9yY2UgPSBNYXRoLnJhbmRvbSgpICogODtcbiAgICAgICAgdGhpcy5iYWxsQXJyYXkucHVzaChiYWxsKTtcbiAgICB9XG5cbiAgICAvLyBTRVQgQ09MT1IgT0YgQUxMXG4gICAgY2hhbmdlQ29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5zZXRDb2xvcihyZWQsIGdyZWVuLCBibHVlLCBhbHBoYSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUUkFOU0xBVEUgQUxMIEJBTExTIChUTyBMRUFERVIgUE9TKVxuICAgIHRvTGVhZGVyUG9zKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaV07XG4gICAgICAgICAgICBiYWxsLnggPSBiYWxsLmxlYWRlci54O1xuICAgICAgICAgICAgYmFsbC55ID0gYmFsbC5sZWFkZXIueTtcbiAgICAgICAgICAgIGJhbGwueGZvcmNlID0gYmFsbC54Zm9yY2UgKiAwLjAwMTtcbiAgICAgICAgICAgIGJhbGwueWZvcmNlID0gYmFsbC55Zm9yY2UgKiAwLjAwMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFBST0NFU1MgQUxMIEJBTExTXG4gICAgcHJvY2VzcygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB2YXIgYmFsbCA9IHRoaXMuYmFsbEFycmF5W2ldO1xuICAgICAgICAgICAgYmFsbC5wcm9jZXNzKCk7XG4gICAgICAgICAgICBiYWxsLnRyYWNrT2JqZWN0KGJhbGwubGVhZGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIERSQVcgQUxMXG4gICAgZHJhd0FsbCgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSQU5ET01JWkUgRk9SQ0VTIEFMTFxuICAgIHJhbmRvbWl6ZUZvcmNlcyhmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5yYW5kb21pemVGb3JjZXMoZmFjdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZPUkNFIFRPIFhZXG4gICAgZm9yY2VUbyh4LCB5LCBmYWN0b3IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5mb3JjZVRvKHgsIHksIGZhY3Rvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgTEVBREVSIEZPUiBUUkFDS0lOR1xuICAgIHNldExlYWRlcihsZWFkZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS5sZWFkZXIgPSBsZWFkZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBARGVwcmVjYXRlZFxuICAgIC8vIFRSQUNLIFJFTkRFUiBJTUFHRSBQSVhFTFNcbiAgICBkcmF3UmVuZGVySW1hZ2UocmVuZGVyaW1hZ2UpIHtcbiAgICAgICAgdmFyIGltYWdlcGl4ZWxzID0gcmVuZGVyaW1hZ2UucGl4ZWxzdW07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5iYWxsQXJyYXlbaV0ubGVhZGVyID0gcmVuZGVyaW1hZ2UucGl4ZWxhcnJheVtpICUgaW1hZ2VwaXhlbHNdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIEZSSUNUSU9OIEZBQ1RPUlxuICAgIHNldEZyaWN0aW9uRmFjdG9yKGZhY3Rvcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmZyaWN0aW9uZmFjdG9yID0gZmFjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU0VUIFNQRUVEXG4gICAgc2V0U3BlZWQoc3BlZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmJhbGxBcnJheVtpXS50cmFja3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgQUxQSEFcbiAgICBzZXRBbHBoYShhbHBoYSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsbEFycmF5W2ldLmFscGhhID0gYWxwaGE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTRVQgUkFORE9NIFJHQihBKVxuICAgIHNldFJuZG1Db2xvcigpIHtcblxuICAgICAgICB2YXIgcmVkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICAgICAgdmFyIGdyZWVuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICAgICAgdmFyIGJsdWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwucmVkID0gcmVkO1xuICAgICAgICAgICAgYmFsbC5ncmVlbiA9IGdyZWVuO1xuICAgICAgICAgICAgYmFsbC5ibHVlID0gYmx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gU0VUIFRSSUFOR0xFXG4gICAgbWFrZUZvcm0oZWRnZXMsIGRpc3RhbmNlLCBybmRtRmFjdG9yKSB7XG5cbiAgICAgICAgLy8gZm9yIGxpbmVzXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCkgJiYgaSArIGVkZ2VzIDw9IHRoaXMuZ2V0U2l6ZSgpOyBpICs9IGVkZ2VzKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUNlbnRlciA9IG5ldyBQaXhlbChNYXRoLnJhbmRvbSgpICogY2FudmFzLndpZHRoLCBNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodCk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWRnZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaSArIGpdO1xuICAgICAgICAgICAgICAgIHZhciBiYWxsTmV4dCA9IHRoaXMuYmFsbEFycmF5W2kgKyAoKGogKyAxKSAlIChlZGdlcykpXTtcbiAgICAgICAgICAgICAgICBiYWxsLmZvbGxvd2VyID0gYmFsbE5leHQ7XG4gICAgICAgICAgICAgICAgYmFsbC5sZWFkZXIgPSBmb3JtQ2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIGRpc3RhbmNlc1xuICAgICAgICB2YXIgYW5nbGUgPSAzNjAgLyBlZGdlcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldFNpemUoKSAmJiBpICsgZWRnZXMgPD0gdGhpcy5nZXRTaXplKCk7IGkgKz0gZWRnZXMpIHtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVJORE0gPSBkaXN0YW5jZSArICgoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiBybmRtRmFjdG9yICogZGlzdGFuY2UgKiAyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWRnZXM7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBiYWxsID0gdGhpcy5iYWxsQXJyYXlbaSArIGpdO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZhY3RvclggPSBNYXRoRC5zaW4oYW5nbGUgKiBqKTtcbiAgICAgICAgICAgICAgICB2YXIgZmFjdG9yWSA9IE1hdGhELmNvcyhhbmdsZSAqIGopO1xuXG4gICAgICAgICAgICAgICAgdmFyIHhwbHVzID0gZmFjdG9yWCAqIGRpc3RhbmNlUk5ETTtcbiAgICAgICAgICAgICAgICB2YXIgeXBsdXMgPSBmYWN0b3JZICogZGlzdGFuY2VSTkRNO1xuICAgICAgICAgICAgICAgIGJhbGwubGVhZGVyID0gbmV3IFBpeGVsKGJhbGwubGVhZGVyLnggKyB4cGx1cywgYmFsbC5sZWFkZXIueSArIHlwbHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICAvLyBNQUtFIFdBVEVSXG4gICAgbWFrZVdhdGVyKHBpeGVsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRTaXplKCk7IGkgKz0gMSkge1xuICAgICAgICAgICAgdmFyIGJhbGwgPSB0aGlzLmJhbGxBcnJheVtpXTtcbiAgICAgICAgICAgIGJhbGwuZm9yY2VUb0RlbGF5KHBpeGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgQ0FOVkFTIGZyb20gJy4vbW9kdWxlLmNhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhbGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJhZGl1cyA9IDI7XG4gICAgICAgIHRoaXMueCA9IDQ7XG4gICAgICAgIHRoaXMueSA9IDQ7XG4gICAgICAgIHRoaXMueGZvcmNlID0gMDtcbiAgICAgICAgdGhpcy55Zm9yY2UgPSAwO1xuICAgICAgICB0aGlzLnhkaXN0YW5jZSA9IDA7XG4gICAgICAgIHRoaXMueWRpc3RhbmNlID0gMDtcblxuICAgICAgICAvL3RoaXMubGVhZGVyID0gbmV3IFBpeGVsKDQwMCwgNDAwKTtcbiAgICAgICAgdGhpcy50cmFja3NwZWVkID0gMC40O1xuICAgICAgICB0aGlzLmZyaWN0aW9uZmFjdG9yID0gMC45O1xuICAgICAgICB0aGlzLmZvbGxvd2VyID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlZCA9IFwiMFwiO1xuICAgICAgICB0aGlzLmdyZWVuID0gXCIwXCI7XG4gICAgICAgIHRoaXMuYmx1ZSA9IFwiMFwiO1xuICAgICAgICB0aGlzLmFscGhhID0gXCIxXCI7XG4gICAgfVxuXG4gICAgZ2V0Q29sb3IoKSB7XG4gICAgICAgIHJldHVybiBcInJnYmEoXCIgKyB0aGlzLnJlZCArIFwiLFwiICsgdGhpcy5ncmVlbiArIFwiLFwiICsgdGhpcy5ibHVlICsgXCIsXCIgKyB0aGlzLmFscGhhICsgXCIpXCI7XG4gICAgfVxuXG4gICAgc2V0Q29sb3IocmVkLCBncmVlbiwgYmx1ZSwgYWxwaGEpIHtcbiAgICAgICAgdGhpcy5yZWQgPSByZWQ7XG4gICAgICAgIHRoaXMuZ3JlZW4gPSBncmVlbjtcbiAgICAgICAgdGhpcy5ibHVlID0gYmx1ZTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IGFscGhhO1xuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIENBTlZBUy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmdldENvbG9yKCk7XG4gICAgICAgIENBTlZBUy5jdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgQ0FOVkFTLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5tb3ZlVG8odGhpcy54LCB0aGlzLnkpO1xuICAgICAgICBDQU5WQVMuY3R4LmxpbmVUbyh0aGlzLmZvbGxvd2VyLngsIHRoaXMuZm9sbG93ZXIueSk7XG4gICAgICAgIENBTlZBUy5jdHguc3Ryb2tlKCk7XG4gICAgXG4gICAgICAgIENBTlZBUy5jdHguZmlsbFN0eWxlID0gdGhpcy5nZXRDb2xvcigpO1xuICAgICAgICBDQU5WQVMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBDQU5WQVMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJLCB0cnVlKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgQ0FOVkFTLmN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgcHJvY2VzcygpIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMueGZvcmNlO1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy55Zm9yY2U7XG4gICAgICAgIHZhciB4ZiA9IHRoaXMueGZvcmNlO1xuICAgICAgICB2YXIgeWYgPSB0aGlzLnlmb3JjZTtcbiAgICAgICAgdGhpcy54Zm9yY2UgPSB0aGlzLnhmb3JjZSAqIHRoaXMuZnJpY3Rpb25mYWN0b3I7XG4gICAgICAgIHRoaXMueWZvcmNlID0gdGhpcy55Zm9yY2UgKiB0aGlzLmZyaWN0aW9uZmFjdG9yO1xuICAgIH1cblxuICAgIHRyYWNrT2JqZWN0KG9iamVjdCkge1xuICAgICAgICB0aGlzLnhkaXN0YW5jZSA9IHRoaXMueCAtIG9iamVjdC54O1xuICAgICAgICB0aGlzLnlkaXN0YW5jZSA9IHRoaXMueSAtIG9iamVjdC55O1xuICAgICAgICB2YXIgYWJzb2x1dGVkaXN0YW5jZSA9IChNYXRoLmFicyh0aGlzLnhkaXN0YW5jZSkgK1xuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55ZGlzdGFuY2UpKSAvIDI7XG4gICAgICAgIHRoaXMueGZvcmNlICs9ICh0aGlzLnhkaXN0YW5jZSAvIChhYnNvbHV0ZWRpc3RhbmNlKSkgKiAoLXRoaXMudHJhY2tzcGVlZCkgKiBhYnNvbHV0ZWRpc3RhbmNlIC8gMTAwO1xuICAgICAgICB0aGlzLnlmb3JjZSArPSAodGhpcy55ZGlzdGFuY2UgLyAoYWJzb2x1dGVkaXN0YW5jZSkpICogKC10aGlzLnRyYWNrc3BlZWQpICogYWJzb2x1dGVkaXN0YW5jZSAvIDEwMDtcbiAgICAgICAgLy90aGlzLnJhZGl1cyA9IE1hdGgubWluKDUsIDQwL2Fic29sdXRlZGlzdGFuY2UpO1xuICAgICAgICB0aGlzLmFscGhhID0gTWF0aC5taW4oMjU1LCA1MCAvIGFic29sdXRlZGlzdGFuY2UpO1xuICAgIH1cblxuICAgIGZvcmNlVG8oeCwgeSwgZmFjdG9yKSB7XG4gICAgICAgIHRoaXMueGRpc3RhbmNlID0gdGhpcy54IC0geDtcbiAgICAgICAgdGhpcy55ZGlzdGFuY2UgPSB0aGlzLnkgLSB5O1xuICAgIFxuICAgICAgICB0aGlzLnhmb3JjZSArPSB0aGlzLnhkaXN0YW5jZSAqIC1mYWN0b3IgLyAxMDA7XG4gICAgICAgIHRoaXMueWZvcmNlICs9IHRoaXMueWRpc3RhbmNlICogLWZhY3RvciAvIDEwMDtcbiAgICB9XG5cbiAgICByYW5kb21pemVGb3JjZXMoZmFjdG9yKSB7XG4gICAgICAgIHRoaXMueGZvcmNlID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogZmFjdG9yO1xuICAgICAgICB0aGlzLnlmb3JjZSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIGZhY3RvcjtcbiAgICB9XG5cbiAgICBmb3JjZVRvRGVsYXkgICAocGl4ZWwpIHtcbiAgICAgICAgdmFyIHhkaXN0YW5jZSA9IHRoaXMueCAtIHBpeGVsLng7XG4gICAgICAgIHZhciB5ZGlzdGFuY2UgPSB0aGlzLnkgLSBwaXhlbC55O1xuICAgICAgICB2YXIgYWJzb2x1dGVkaXN0YW5jZSA9IE1hdGguc3FydCh4ZGlzdGFuY2UgKiB4ZGlzdGFuY2UgK1xuICAgICAgICAgICAgeWRpc3RhbmNlICogeWRpc3RhbmNlKTtcbiAgICAgICAgdmFyIGRlbGF5ID0gYWJzb2x1dGVkaXN0YW5jZSAqIDI7XG4gICAgXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGZvcmNlRmFjdG9yID0gMS4wO1xuICAgIFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYueGZvcmNlICs9ICh4ZGlzdGFuY2UgLyAoYWJzb2x1dGVkaXN0YW5jZSkpICogZm9yY2VGYWN0b3I7XG4gICAgICAgICAgICBzZWxmLnlmb3JjZSArPSAoeWRpc3RhbmNlIC8gKGFic29sdXRlZGlzdGFuY2UpKSAqIGZvcmNlRmFjdG9yO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfVxuICAgIFxufVxuIiwiZXhwb3J0IGRlZmF1bHQgYnVpbGRDYW52YXMoKTtcblxuXG5mdW5jdGlvbiBidWlsZENhbnZhcygpIHtcbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuXG4gICAgY2FudmFzLmN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjYW52YXMuZml0VG9TY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIH1cblxuICAgIGNhbnZhcy5nZXRDZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IGNhbnZhcy53aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiBjYW52YXMuaGVpZ2h0IC8gMlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIFxuXG4gICAgLy8gRnVsbHNjcmVlblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGNhbnZhcy5maXRUb1NjcmVlbik7XG4gICAgY2FudmFzLmZpdFRvU2NyZWVuKCk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xufSJdLCJzb3VyY2VSb290IjoiIn0=