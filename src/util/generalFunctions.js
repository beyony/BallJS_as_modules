export default {

    collision2Rects: function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(
            ((y1 + h1) < (y2)) ||
            (y1 > (y2 + h2)) ||
            ((x1 + w1) < x2) ||
            (x1 > (x2 + w2))
        );
    },

    collisionRectCircle: function (x1, y1, w1, h1, xp2, yp2, r2) {
        var w2 = r2 * 2;
        var h2 = r2 * 2;
        var x2 = xp2 - r2;
        var y2 = yp2 - r2;
        return !(
            ((y1 + h1) < (y2)) ||
            (y1 > (y2 + h2)) ||
            ((x1 + w1) < x2) ||
            (x1 > (x2 + w2))
        );
    },

    collision2Circles: function (x1, y1, r1, x2, y2, r2) {
        return ((abs(x2 - x1) > (r2 + r1))) &&
            ((abs(y2 - y1) > (r2 + r1)));
    },

    // GET RADIUS DISTANCE
    radiusDistance: function (x1, y1, x2, y2) {
        var xdistance = x1 - x2;
        var ydistance = y1 - y2;
        var absolutedistance = Math.sqrt(xdistance * xdistance +
            ydistance * ydistance);
        return absolutedistance;
    },

    // SHUFFLE ARRAY
    shuffle: function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    },

    // GET RANDOM RGB
    getRandomColor: function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    //GET RANDOM RGBA
    getRndmRGBA: function (alpha) {
        var colorcode = "rgba(";
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);

        colorcode += red + ", " +
            green + ", " +
            blue + ", " +
            alpha +
            ")";
        return colorcode;
    },


    /**
     * converts degree to radians
     * @param degree
     * @returns {number}
     */
    toRadians: function (degree) {
        return degree * (Math.PI / 180);
    },

    /**
     * Converts radian to degree
     * @param radians
     * @returns {number}
     */
    toDegree: function (radians) {
        return radians * (180 / Math.PI);
    },

    /**
     * Rounds a number mathematical correct to the number of decimals
     * @param number
     * @param decimals (optional, default: 5)
     * @returns {number}
     */
    roundNumber: function (number, decimals) {
        decimals = decimals || 5;
        return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },
   
    MathD: {
        sin: function (number) {
            return roundNumber(Math.sin(toRadians(number)));
        },
        cos: function (number) {
            return roundNumber(Math.cos(toRadians(number)));
        },
        tan: function (number) {
            return roundNumber(Math.tan(toRadians(number)));
        },
        asin: function (number) {
            return roundNumber(toDegree(Math.asin(number)));
        },
        acos: function (number) {
            return roundNumber(toDegree(Math.acos(number)));
        },
        atan: function (number) {
            return roundNumber(toDegree(Math.atan(number)));
        }
    }

};