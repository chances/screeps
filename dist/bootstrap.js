var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var MedicManager = require('medic');
var CreepManager = (function () {
    function CreepManager() {
        this.room = null;
        this.spawn = null;
        this.canCreateCreep = false;
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
        this.canCreateCreep = this.spawn.canCreateCreep([WORK, CARRY, MOVE]) === OK;
        // Gather creeps
        for (var name in Game.creeps) {
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
                    this.medics.push(creep);
                }
            }
        }
        if (this.spawn.spawning === null && this.canCreateCreep) {
            // Create creeps
            if (this.harvesters.length < 5) {
                this.createCreep([WORK, CARRY, MOVE], 'harvester', this.harvesters);
            }
            else {
                if ((this.guards.length + this.medics.length) / this.harvesters.length < 0.8) {
                    if (this.guards.length < 1) {
                        this.createCreep([TOUGH, MOVE, ATTACK, MOVE, ATTACK], 'guard', this.guards);
                    }
                    else if (this.medics.length / this.guards.length < 0.5) {
                        this.createCreep([TOUGH, HEAL, MOVE], 'medic', this.medics);
                    }
                    else {
                        this.createCreep([TOUGH, MOVE, ATTACK, MOVE, ATTACK], 'guard', this.guards);
                    }
                }
                else {
                    this.createCreep([WORK, CARRY, MOVE], 'harvester', this.harvesters);
                }
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
    CreepManager.prototype.createCreep = function (parts, role, collection) {
        var result = this.spawn.createCreep(parts, null, { role: role });
        if (_.isString(result)) {
            collection.push(Game.creeps[result]);
        }
        else {
            console.log("Cannot create creep: " + result);
        }
    };
    return CreepManager;
})();
module.exports = CreepManager;
