class MedicManager {
    creeps: Creep[];

    constructor (room: Room) {
        this.creeps = room.find<Creep>(FIND_MY_CREEPS);
    }

    doWork(creep: Medic) {
        for(var i = 0; i < this.creeps.length; i++) {
            if (this.creeps[i].hits > this.creeps[i].hitsMax / 4 && creep.memory.targetCreep == this.creeps[i]) {

            }
        }
    }
}

export = MedicManager;
