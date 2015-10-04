var CreepManager = require('bootstrap');

var creepManager = new CreepManager();

module.exports.loop = function () {
    creepManager.tick();
};
