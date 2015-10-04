function MedicManager(room: Room) {
    this.creeps = room.find(FIND_MY_CREEPS);
}

MedicManager.prototype.doWork = function medicDoWork(creep: Medic) {
    for(var i = 0; i < this.creeps.length; i++) {
        if (this.creeps[i].hits > this.creeps[i].hitsMax / 4 && creep.memory.targetCreep == this.creeps[i]) {

        }
    }
};

interface Medic extends Creep {
    memory: MedicMemory;
}

interface MedicMemory extends CreepMemory {
    targetCreep: Creep;
}

export = MedicManager;
