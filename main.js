var CreepManager = require('bootstrap');

CreepManager = new CreepManager();

module.exports.loop = function () {
    CreepManager.tick();
};
