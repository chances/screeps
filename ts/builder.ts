module.exports = function (spawn: Spawn, creep: Creep) {
    if (creep.carry.energy == 0) {
        if (spawn.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
    else {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
};