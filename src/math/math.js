/**
 * The grapefruit math library, used to abstract commonly used math operations
 *
 * @class math
 * @extends Object
 * @namespace gf
 */
var math = module.exports = {
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    SEED: Math.random(),
    /**
     * Alias some native functions for great justice (or incase we want to override)
     *
     */
    /**
     * Applys a Floor operation to a value, currently uses native Math.floor
     * since it deals with all edge cases
     *
     * @method floor
     * @param num {Number} The number to floor
     * @return {Number} The floored value
     */
    floor: Math.floor,
    /**
     * Applys a Ceiling operation to a value, currently uses native Math.ceil
     * since it deals with all edge cases
     *
     * @method ceil
     * @param num {Number} The number to ceil
     * @return {Number} The ceiling value
     */
    ceil: Math.ceil,
    /**
     * Generates a random number between 0 and 1, NON DETERMINISTIC
     *
     * @method random
     * @return {Number} The random value
     */
    random: Math.random,
    /**
     * Returns the absolute value of a number, currently uses native Math.abs
     * since it is more performant than tricks you can use.
     * see:
     *      http://jsperf.com/math-abs-vs-bitwise/7
     *      http://jsperf.com/abs-value
     *      http://jsperf.com/math-abs-vs-bitwise/3
     *
     * @method abs
     * @param num {Number} The number to get the absolute value for
     * @return {Number} The absolute value
     */
    abs: Math.abs,
    /**
     * Returns the square root of a number, currently uses native Math.sqrt
     *
     * @method sqrt
     * @param num {Number} The number to get the sqrt of
     * @return {Number} The sqrt value
     */
    sqrt: Math.sqrt,
    /**
     * Returns the min of the values passed
     *
     * @method min
     * @param num* {Number...}
     * @return {Number} The min value
     */
    min: Math.min,
    /**
     * Returns the max of the values passed
     *
     * @method max
     * @param num* {Number...}
     * @return {Number} The max value
     */
    max: Math.max,
    /**
     * Quickly rounds a number. This is about twice as fast as Math.round()
     *
     * @method round
     * @param num {Number} The number to round
     * @return {Number} The rounded value
     */
    round: function(n) {
        return ~~(n + (n > 0 ? 0.5 : -0.5));
    },
    /**
     * Clamps a number between two values.
     *
     * @method clamp
     * @param num {Number} The number to clamp
     * @param min {Number} The minimum value the number is allowed to be
     * @param max {Number} The maximum value the number is allowed to be
     * @return {Number} The clamped value
     */
    clamp: function(n, min, max) {
        return Math.max(min, Math.min(max, n));
    },
    /**
     * Truncates the decimal from a number
     *
     * @method truncate
     * @param num {Number} The number to truncate
     * @return {Number} The truncated value
     */
    truncate: function(n) {
        return (n > 0) ? Math.floor(n) : Math.ceil(n);
    },
    /**
     * Snaps a number to a grid value.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would snap to 20
     *
     * @method snap
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snap: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * Math.round(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using floor.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 10; a position of 18 would also snap to 10
     *
     * @method snapFloor
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapFloor: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * Math.floor(n / gap);

        return offset + n;
    },
    /**
     * Snaps a number to a grid value, using ceiling.
     * For example, if you have a grid with gaps the size of 10 horizontally, and
     * a position of 11, it would snap to 20; a position of 18 would also snap to 20
     *
     * @method snapCeil
     * @param num {Number} The number to snap
     * @param gap {Number} The gap size of the grid (the tile size)
     * @param [offset=0] {Number} The starting offset of a grid slice (aka tile)
     * @return {Number} The snapped value
     */
    snapCeil: function(n, gap, offset) {
        if(gap === 0) return n;

        offset = offset || 0;

        n -= offset;
        n = gap * Math.ceil(n / gap);

        return offset + n;
    },
    /**
     * Convert radians to degrees
     *
     * @method radiansToDegrees
     * @param angle {Number} The angle in radians to convert
     * @return {Number} The angle in degrees
     */
    radiansToDegrees: function(angle) {
        return angle * math.RAD_TO_DEG;
    },
    /**
     * Convert radians to degrees
     *
     * @method degreesToRadians
     * @param angle {Number} The angle in degrees to convert
     * @return {Number} The angle in radians
     */
    degreesToRadians: function(angle) {
        return angle * math.DEG_TO_RAD;
    },
    /**
     * Calculates the angle between two points
     *
     * @method angleBetween
     * @param pos1 {Vector|Point} The first position
     * @param pos2 {Vector|Point} The second position
     * @return {Number} The angle in radians
     */
    angleBetween: function(pos1, pos2) {
        return Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    },
    /**
     * Returns a random boolean based on the provided chance. The chance represents the
     * percentage chance of returning: true.
     *
     * @method randomBool
     * @param chance {Number} The % chance of getting true (0 - 100), defaults to 50%
     * @return {Boolean}
     */
    randomBool: function(chance) {
        if(chance === undefined)
            chance = 50;

        //no chance of true
        if(chance <= 0)
            return false;

        //must always be true
        if(chance >= 100)
            return true;

        //if roll is less than change, return true
        return (Math.random() * 100 < chance);
    },
    /**
     * Returns a random int between min and max.
     *
     * @method randomInt
     * @param min {Number} The minimun number that the result can be
     * @param max {Number} The maximun number that the result can be
     * @return {Number}
     */
    randomInt: function(min, max) {
        if(min === max)
            return min;

        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomReal: function(min, max) {
        if(min === max)
            return min;

        return math.random() * (max - min + 1) + min;
    },
    /**
     * Returns a random sign based on the provided chance. The chance represents the
     * percentage chance of returning 1 (positive).
     *
     * @method randomSign
     * @param chance {Number} The % chance of getting positive (0 - 100), defaults to 50%
     * @return {Number} either 1 or -1
     */
    randomSign: function(chance) {
        return math.randomBool(chance) ? 1 : -1;
    },
    /**
     * Returns a random string based on a random value between 0 and 1, multiplied
     * by the current date. Ex: "1158014093337", "86371874178", etc
     *
     * @method randomString
     * @return {String} A random string
     */
    randomString: function() {
        return Math.floor(Date.now() * Math.random()).toString();
    },
    /**
     * Returns a random element of an array.
     *
     * @method randomElement
     * @param array {Array} The array to choose from
     * @param start {Number} The index of the first element to include, defaults to 0
     * @param end {Number} The index of the last element to include, defaults to array.length - 1
     * @return {Number} either 1 or -1
     */
    randomElement: function(array, start, end) {
        //ensure we have an array, and there are elements to check
        if(!array || !array.length)
            return null;

        //special case for 1 element
        if(array.length === 1)
            return array[0];

        //default for start
        if(!start || start < 0)
            start = start || 0;

        //default for end
        if(!end || end < 0)
            end = array.length - 1;

        return array[math.randomInt(start, end)];
    }
};
