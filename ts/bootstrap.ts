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

        // Gather creeps
        for(var name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                var creep = Game.creeps[name];

                if (creep.memory.role == 'harvester') {
                    this.harvesters.push(creep);
                }

                if (creep.memory.role == 'builder') {
                    this.builders.push(creep);
                }

                if (creep.memory.role == 'guard') {
                    this.guards.push(creep);
                }

                if (creep.memory.role == 'medic') {
                    this.medics.push(<Medic>creep);
                }
            }
        }

        if (this.spawn.spawning === null && this.canCreateCreep) {
            // Create creeps
            if (this.harvesters.length < 5) {
                this.createCreep([WORK, CARRY, MOVE], 'harvester', this.harvesters);
            } else {
                if ((this.guards.length + this.medics.length) / this.harvesters.length < 0.8) {
                    if (this.guards.length < 1) {
                        this.createCreep([TOUGH, MOVE, RANGED_ATTACK], 'guard', this.guards);
                    } else if (this.medics.length / this.guards.length < 0.5) {
                        this.createCreep([HEAL, MOVE], 'medic', this.medics);
                    } else {
                        this.createCreep([TOUGH, MOVE, RANGED_ATTACK], 'guard', this.guards);
                    }
                } else {
                    if (this.builders.length < 3) {
                        this.createCreep([WORK, CARRY, MOVE, MOVE], 'builder', this.builders);
                    }
                    this.createCreep([WORK, CARRY, MOVE], 'harvester', this.harvesters);
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

    private createCreep(parts: string[], role: string, collection: Creep[]) {
        var result = this.spawn.createCreep(parts, null, {role: role});

        if (_.isString(result)) {
            collection.push(Game.creeps[result]);
        } else {
            console.log("Cannot create creep: " + result);
        }
    }
}

export = CreepManager;
