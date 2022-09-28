import { constants, getObjectById, getTicks } from 'game';
import { addToSquad, incrementBasePhase } from './main.mjs';








export const autoSpawn = function (memory, heap, spawnGoals) {

  if ( memory.initStatus.autoSpawn == undefined || memory.initStatus.autoSpawn == false ){
    autoSpawnMemoryInit(memory)
    console.log("---")
    console.log("initialized autoSpawn memory")
    // console.log(memory)
  }

  // ~~ Spawn our creeps
  // checks a spawn queue for combat squads in the making
  updateSpawnQueue(memory, heap, spawnGoals)
  
  if (memory.autoSpawn.spawnQueue.length > 0){
    console.log("trying to spawn some creeps")
    for (let creepToSpawn in memory.autoSpawn.spawnQueue) {
      console.log("trying to spawn :")
      console.log(memory.autoSpawn.spawnQueue[creepToSpawn])
      // let spawnToUse = getObjectById(memory.autoSpawn.spawnQueue[creepToSpawn].spawnToUseId)
      // if (spawnToUse == undefined ){
      // // if (spawnToUse == undefined || spawnToUse.id == undefined){
      //   console.log("spawnToUse was undefined :")
      //   console.log(spawnToUse)
      //   // break;
      // }
      // let result = spawnToUse.spawnCreep(memory.autoSpawn.spawnQueue[creepToSpawn].bodyParts) //from queue
      // TODO make the spawnToUse work again
      let result = heap.mySpawns[0].spawnCreep(memory.autoSpawn.spawnQueue[creepToSpawn].bodyParts) //from queue
      if ( result.error != undefined ){
        switch( result.error ){
          case constants.ERR_BUSY:
          case constants.ERR_NOT_ENOUGH_ENERGY:
            console.log("spawn is busy")
            break;
  
          default:
          case constants.ERR_NOT_OWNER:
          case constants.ERR_INVALID_ARGS:
            console.log("something went wrong in autoSpawn; result : ")
            console.log(result)
        }
        
      }else{
        console.log("spawn successful")
        result.object.role = memory.autoSpawn.spawnQueue[creepToSpawn].role
        result.object.name = memory.autoSpawn.spawnQueue[creepToSpawn].name
        console.log(result)
        if (memory.autoSpawn.spawnQueue[creepToSpawn].squadName != undefined){
          result.object.squadName = memory.autoSpawn.spawnQueue[creepToSpawn].squadName
          console.log("adding to squad")
          addToSquad(memory, memory.autoSpawn.spawnQueue[creepToSpawn].name, memory.autoSpawn.spawnQueue[creepToSpawn].squadName)
        }
        // if successful delete from the spawn queue
        console.log("deleting from spawn queue, length before is " + memory.autoSpawn.spawnQueue.length)
        memory.autoSpawn.spawnQueue.shift();
        // delete memory.autoSpawn.spawnQueue[creepToSpawn];
        // console.log("deleting from spawn queue, length after is " + memory.autoSpawn.spawnQueue.length)
        console.log("length after shifting is " + memory.autoSpawn.spawnQueue.length)
        break;
      }


    }
  }
  console.log("Spawn Queue length is " + memory.autoSpawn.spawnQueue.length)
  if (memory.autoSpawn.spawnQueue.length <= 1 && memory.basePhase < memory.basePhaseLimit){
    console.log("autoSpawn is trying to increment basePhase")
    incrementBasePhase(memory)
  }
  


}






const updateSpawnQueue = function (memory, heap, spawnGoals ){
  
  if (memory.autoSpawn.setAtPhase != memory.basePhase || memory.autoSpawn.spawnQueue.length == 0){
    let newQueue=[]
    console.log("Spawn goals recieved are ");
    console.log(spawnGoals);
    let i = 0;
    for(let role in spawnGoals){
      i ++;
      if(role == "squad"){
        console.log("adding squad to spawn queue")
        console.log(spawnGoals[role])
        for (let squadRole in spawnGoals[role]) {
          let resultQueue = makeCreepBlueprint_fromRole(memory, heap, spawnGoals, squadRole, i, "squad_" + getTicks() + ":" + i)
          if (resultQueue.length != 0) {
            for (let creepBlueprint of resultQueue) {
              newQueue.push(creepBlueprint)
            }
          }
        }


      }else{
        let resultQueue = makeCreepBlueprint_fromRole(memory, heap, spawnGoals, role, i)

        if (resultQueue.length != 0){
          for (let creepBlueprint of resultQueue){
            newQueue.push(creepBlueprint)
          }
        }
      }


      
    }
    console.log("New spawn queue is ");
    console.log(newQueue);
    memory.autoSpawn.setAtPhase = memory.basePhase;
    memory.autoSpawn.spawnQueue = newQueue;
    console.log("updated spawn queue")
  }else{
    console.log("checked spawn queue")
  }

}





const makeCreepBlueprint_fromRole = function (memory, heap, spawnGoals, role, i = 99,  squadName = "") {

  let newQueue = []
  console.log("makeCreepBlueprint_fromRole trying role & spawn : ")
  console.log("squad : '"+ squadName +"'")
  console.log(role)

  let roleNumber;
  let isSquad = (squadName != "");
  switch (role) {

    case "tinyMover":
      roleNumber = isSquad ? spawnGoals["squad"][role] : spawnGoals[role]
      for (let i = 0; i < roleNumber; i++) {
        let newBlueprint = {
          "name": role + "_" + getTicks() + ":" + i,
          "role": role,
          "squadName": squadName,
          "spawnToUseId": heap.mySpawns[0].id,
          "bodyParts": ["move", "carry"],
        };
        console.log("makeCreepBlueprint is pushing tinyMover to queue")
        newQueue.push(newBlueprint)
      }
      break;

    case "settler":
      roleNumber = isSquad ? spawnGoals["squad"][role] : spawnGoals[role]
      for (let i = 0; i < roleNumber; i++) {
        let newBlueprint = {
          "name": role + "_" + getTicks() + ":" + i,
          "role": role,
          "squadName": squadName,
          "spawnToUseId": heap.mySpawns[0].id,
          "bodyParts": ["move", "move", "carry", "carry", "carry",],
        };

        console.log("makeCreepBlueprint is pushing settler to queue")
        newQueue.push(newBlueprint)
      }
      break;

    case "warrior":
      roleNumber = isSquad ? spawnGoals["squad"][role] : spawnGoals[role]
      for (let i = 0; i < roleNumber; i++) {
        let newBlueprint = {
          "name": role + "_" + getTicks() + ":" + i,
          "role": role,
          "squadName": squadName,
          "spawnToUseId": heap.mySpawns[0].id,
          "bodyParts": ["move", "move", "attack", "move", "attack"],
        };

        console.log("makeCreepBlueprint is pushing warrior to queue")
        newQueue.push(newBlueprint)
      }
      break;

    case "healer":
      roleNumber = isSquad ? spawnGoals["squad"][role] : spawnGoals[role]
      for (let i = 0; i < roleNumber; i++) {
        let newBlueprint = {
          "name": role + "_" + getTicks() + ":" + i,
          "role": role,
          "squadName": squadName,
          "spawnToUseId": heap.mySpawns[0].id,
          "bodyParts": ["move", "move", "heal"],
        };

        console.log("makeCreepBlueprint is pushing healer to queue")
        newQueue.push(newBlueprint)
      }
      break;
  }
  console.log("makeCreepBlueprint_fromRole returning: ")
  console.log(newQueue)
  return newQueue
}












const autoSpawnMemoryInit = function (memory) {
  memory.autoSpawn = {
    "setAtPhase": 0,
    "spawnQueue": [],
    // "lastRoleSpawned":"none"
  }
  memory.initStatus.autoSpawn = true
}



