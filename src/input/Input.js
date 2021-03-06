var inherit = require('../utils/inherit'),
    EventEmitter = require('../utils/EventEmitter');

/**
 * The base Input object, holds common functions and properties between input types
 *
 * @class Input
 * @extends Object
 * @uses EventEmitter
 * @constructor
 * @param game {Game} The game instance
 */
var InputType = module.exports = function(game) {
    EventEmitter.call(this);

    /**
     * The game instance this input belongs to
     *
     * @property game
     * @type Game
     */
    this.game = game;
};

inherit(InputType, Object, {
});
