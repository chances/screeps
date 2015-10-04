import harvester = require('harvester');
import builder = require('builder');
import guard = require('guard');
import MedicManager = require('medic');

class CreepManager {
    room: Room = null;
    spawn: Spawn = null;
    canCreateCreep: boolean = false;
    harvesters: Creep[] = [];
    builders: Creep[] = [];
    guards: Creep[] = [];
    medics: Medic[] = [];

    medicManager: MedicManager = null;

    constructor () {
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

    tick() {
        this.canCreateCreep = this.spawn.canCreateCreep([WORK, CARRY, MOVE]) === OK;

        if (this.spawn.spawning === null && this.canCreateCreep) {
            // Create up to 5 harvesters
            if (this.harvesters.length < 5) {
                var result = this.spawn.createCreep(
                    [WORK, CARRY, MOVE], null, {role: 'harvester'}
                );

                if (_.isString(result)) {
                    this.harvesters.push(Game.creeps[result]);
                } else {
                    console.log("Cannot create creep: " + result);
                }
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
                    this.medicManager.doWork(<Medic>creep);
                }
            }
        }
    }
}

export = CreepManager;
