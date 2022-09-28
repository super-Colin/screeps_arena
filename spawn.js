import { constants, getObjectById, getTicks } from 'game';
import { incrementBasePhase } from './main.mjs';








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
      let spawnToUse = getObjectById(memory.autoSpawn.spawnQueue[creepToSpawn].spawnToUseId)
      // console.log("spawnToUse: ")
      // console.log(spawnToUse)
      // console.log("creepToSpawn: ")
      // console.log(memory.autoSpawn.spawnQueue[creepToSpawn])
      let result = spawnToUse.spawnCreep(memory.autoSpawn.spawnQueue[creepToSpawn].bodyParts) //from queue
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
    for(let role in spawnGoals){
      switch (role){
        case "tinyMover":
          console.log("Pushing tinyMover to spawn queue");
          for (let i = 0; i < spawnGoals[role]; i++){
            newQueue.push({
              "name": role + "_" + getTicks() +":"+ i,
              "role": role,
              "spawnToUseId": heap.mySpawns[0].id,
              "bodyParts": ["move", "carry"],
            })
          }
          break;

        case "settler":
          for (let i = 0; i < spawnGoals[role]; i++){
            newQueue.push({
              "name": role + "_" + getTicks() + ":" + i,
              "role": role,
              "spawnToUseId": heap.mySpawns[0].id,
              "bodyParts": ["move", "move", "carry", "carry", "carry", ],
            })
          }
          break;

        case "warrior":
          for (let i = 0; i < spawnGoals[role]; i++){
            newQueue.push({
              "name": role + "_" + getTicks() + ":" + i,
              "role": role,
              "spawnToUseId": heap.mySpawns[0].id,
              "bodyParts": ["move", "move", "attack", "move", "attack" ],
            })
          }
          break;


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





const autoSpawnMemoryInit = function (memory ){
  memory.autoSpawn = {
    "setAtPhase":0,
    "spawnQueue": [],
    // "lastRoleSpawned":"none"
  }
  memory.initStatus.autoSpawn = true
}
















