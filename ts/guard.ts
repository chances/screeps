function doWork(creep: Creep) {
    var targets = creep.room.find<Creep>(FIND_HOSTILE_CREEPS);
    if(targets.length) {
        if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    }
}

export = doWork;
