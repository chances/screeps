module.exports = function (spawn: Spawn, creep: Creep) {
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    } else {
        if (creep.transferEnergy(spawn) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
};
