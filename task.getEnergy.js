import { prototypes, constants, getObjectsByPrototype, findClosestByRange } from 'game';



export const task_collectEnergy = function (memory, heap, creep, opts = {}){







  // if creep has no energy, get some from container
  if (creep.store[constants.RESOURCE_ENERGY] == 0) {
    
    let energyContainers = getObjectsByPrototype(prototypes.StructureContainer)
    // let targetContainer = findClosestByPath(creep, energyContainers);
    let targetContainer = findClosestByRange(creep, energyContainers);

    // withraw some from the containers
    if (creep.withdraw(targetContainer, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE){
      creep.moveTo(targetContainer);
    }

  } else {
      if (creep.transfer(heap.mySpawns[0], constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE){
        creep.moveTo(heap.mySpawns[0]);
      }
    }
  


  // let closestTarget = findClosestByPath(creep, targets);
  // creep.moveTo(closestTarget);
  // creep.attack(closestTarget);






}




