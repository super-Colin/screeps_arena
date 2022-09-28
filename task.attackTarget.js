import { prototypes, constants, getObjectsByPrototype, findClosestByPath, getObjectById } from 'game';



export const task_attackTarget = function (memory, heap, creep, opts = {}){


  console.log("task_attackTarget starting")


  let target
  if(creep.enemyTargetId == undefined){
    // let closestTarget = findClosestByPath(creep, heap.enemyCreeps);
    target = findAttackTarget(memory, heap, creep, opts)
    creep.enemyTargetId = target.id
  }else{
    target = getObjectById(creep.enemyTargetId)
  }



  if (target.id == undefined){
    console.log("trying again to find a target")
    target = findAttackTarget(memory, heap, creep, opts)
  }


  if (creep.attack(target) == constants.ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }


}



function findAttackTarget(memory, heap, creep, opts = {}){
  let newTarget
  if (heap.enemyCreeps.length > 0) {
    newTarget = findClosestByPath(creep, heap.enemyCreeps);
  } else if (heap.enemySpawns.length > 0) {
    newTarget = findClosestByPath(creep, heap.enemySpawns);
  }
  return newTarget
}



