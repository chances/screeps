import harvester = require('harvester');
import builder = require('builder');
import guard = require('guard');
import MedicManager = require('medic');

function CreepManager() {
    this.room = null;
    this.spawn = null;
    this.harvesters = [];
    this.builders = [];
    this.guards = [];
    this.medics = [];

    for (var room in Game.rooms) {
        if (Game.rooms[spawn] !== undefined) {
            this.room = Game.rooms[room];
            break;
        }
    }

    var medicManager = new MedicManager(this.room);

    for (var spawn in Game.spawns) {
        if (Game.spawns[spawn] !== undefined) {
            this.spawn = Game.spawns[spawn];
            break;
        }
    }

    this.tick = function creepManagerTick() {
        // Create up to 5 harvesters
        if (this.harvesters.length < 5) {
            console.log("harvester" + this.harvesters.length + 1);
            var creep = this.spawn.createCreep(
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
                medicManager.doWork(creep);
            }
        }
    }
}

export = CreepManager;
