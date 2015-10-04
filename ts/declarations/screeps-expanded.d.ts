interface CreepMemory {
    role: string;
}

interface Medic extends Creep {
    memory: MedicMemory;
}

interface MedicMemory extends CreepMemory {
    targetCreep: Creep;
}
