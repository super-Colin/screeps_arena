import { prototypes, constants, getObjectsByPrototype, findClosestByPath, getObjectById } from 'game';



export const task_healTarget = function (memory, heap, creep, opts = {}){


  console.log("task_healTarget starting")


  let target
  if(creep.healTargetId == undefined){

    target = findHealTarget(memory, heap, creep, opts)
    if(target.id != undefined){
      creep.enemyTargetId = target.id
    }

  }else{
    target = getObjectById(creep.enemyTargetId)
  }


  if (target.id == undefined){
    console.log("trying again to find a target")
    target = findHealTarget(memory, heap, creep, opts)
  }


  if (creep.heal(target) == constants.ERR_NOT_IN_RANGE) {
    creep.moveTo(target);
  }


}



function findHealTarget(memory, heap, creep, opts = {}){
  let squadOnlyTargets = opts.squadOnly != undefined ? opts.squadOnly : true;
  let newTarget
  let hurtFriendlies
  if (squadOnlyTargets && creep.squadName != ""){
    // filter to only squadmates
    hurtFriendlies = heap.myCreeps.filter(c => c.hits < c.maxHits && c.squadName == creep.squadName)
  }else{
    // any hurt allies
    hurtFriendlies = heap.myCreeps.filter(c => c.hits < c.maxHits)
  }
  if (hurtFriendlies > 0) {
    newTarget = findClosestByPath(creep, hurtFriendlies);
  } else if (heap.enemySpawns.length > 0) {
    newTarget = findClosestByPath(creep, hurtFriendlies);
  }
  return newTarget
}



