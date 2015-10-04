var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var MedicManager = require('medic');
var CreepManager = (function () {
    function CreepManager() {
        this.room = null;
        this.spawn = null;
        this.harvesters = [];
        this.builders = [];
        this.guards = [];
        this.medics = [];
        this.medicManager = null;
        for (var room in Game.rooms) {
            if (Game.rooms.hasOwnProperty(room)) {
                this.room = Game.rooms[room];
                break;
            }
        }
        this.medicManager = new MedicManager(this.room);
        for (var spawn in Game.spawns) {
            if (Game.spawns.hasOwnProperty(spawn)) {
                this.spawn = Game.spawns[spawn];
                break;
            }
        }
    }
    CreepManager.prototype.tick = function () {
        // Create up to 5 harvesters
        if (this.harvesters.length < 5) {
            console.log("harvester" + (this.harvesters.length + 1));
            var result = this.spawn.createCreep([WORK, CARRY, MOVE], "harvester" + (this.harvesters.length + 1), { role: 'harvester' });
            if (_.isString(result) && Game.creeps.hasOwnProperty("harvester" + (this.harvesters.length + 1))) {
                this.harvesters.push(Game.creeps["harvester" + (this.harvesters.length + 1)]);
            }
            else {
            }
        }
        for (var name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                var creep = Game.creeps[name];
                if (creep.memory.role == 'harvester') {
                    harvester(this.spawn, creep);
                }
                if (creep.memory.role == 'builder') {
                    builder(this.spawn, creep);
                }
                if (creep.memory.role == 'guard') {
                    guard(creep);
                }
                if (creep.memory.role == 'medic') {
                    this.medicManager.doWork(creep);
                }
            }
        }
    };
    return CreepManager;
})();
module.exports = CreepManager;
