var MedicManager = (function () {
    function MedicManager(room) {
        this.creeps = room.find(FIND_MY_CREEPS);
    }
    MedicManager.prototype.doWork = function (creep) {
        for (var i = 0; i < this.creeps.length; i++) {
            if (this.creeps[i].hits > this.creeps[i].hitsMax / 4 && creep.memory.targetCreep == this.creeps[i]) {
            }
        }
    };
    return MedicManager;
})();
module.exports = MedicManager;
