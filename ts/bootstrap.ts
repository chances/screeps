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
        if (Game.rooms.hasOwnProperty(room)) {
            this.room = Game.rooms[room];
            break;
        }
    }

    var medicManager = new MedicManager(this.room);

    for (var spawn in Game.spawns) {
        if (Game.spawns.hasOwnProperty(spawn)) {
            this.spawn = Game.spawns[spawn];
            break;
        }
    }

    this.tick = function creepManagerTick() {
        // Create up to 5 harvesters
        if (this.harvesters.length < 5) {
            console.log("harvester" + (this.harvesters.length + 1));
            var result = this.spawn.createCreep(
                [Game.WORK, Game.CARRY, Game.MOVE],
                "harvester" + (this.harvesters.length + 1),
                {role: 'harvester'}
            );

            if (typeof result === 'object') {
                this.harvesters.push(result);
            }
        }

        for(var name in Game.creeps) {
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
                    medicManager.doWork(<Medic>creep);
                }
            }
        }
    }
}

export = CreepManager;
