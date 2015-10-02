var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var MedicManager = require('medic');

function CreepManager() {
    this.harvesters = [];
    this.builders = [];
    this.guards = [];
    this.medics = [];

    MedicManager = new MedicManager(Game.rooms.sim);

    this.tick = function creepManagerTick() {
        // Create up to 5 harvesters
        if (this.harvesters.length < 5) {
            var creep = Game.spawns.SpawnAlpha.createCreep(
                [Game.WORK, Game.CARRY, Game.MOVE],
                "harvester" + this.harvesters.length + 1,
                {role: 'harvester'}
            );

            if (typeof creep === 'object') {
                this.harvesters.push(creep);
            }
        }

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'harvester') {
                harvester(creep);
            }

            if (creep.memory.role == 'builder') {
                builder(creep);
            }

            if(creep.memory.role == 'guard') {
                guard(creep);
            }

            if(creep.memory.role == 'medic') {
                MedicManager.doWork(creep);
            }
        }
    }
}

module.exports = CreepManager;
