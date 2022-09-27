import { constants, getObjectById, getTicks } from 'game';








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
      if (typeof result == "object")
      switch( result ){
        // if successful delete from the spawn queue
        case constants.OK:
          delete memory.autoSpawn.spawnQueue[creepToSpawn]
          console.log("creep spawned:")
          console.log(result.Object)
          result.Object.newMemory = "I remember!"
          console.log(result.Object)
          continue;

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
    }
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
              "name": role + "_" + getTicks(),
              "role": role,
              "spawnToUseId": heap.mySpawns[0],
              "bodyParts": ["move", "move", "carry", "carry", "carry", ],
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
    "spawnQueue": []
  }
  memory.initStatus.autoSpawn = true
}





// [
//   {
//     "name":"some",
//     "role":"some",
//     "spawnToUseId":"some",
//     "bodyParts":["some", "some"],
//   }
// ]









// const headCount = function (memory, heap ){
//   // Check for memory leaks every so many ticks ticks
//   if( ! heap.myCreeps.length == memory.){

//   }
//   for (let creep of heap.myCreeps) {
//     if ( ! Game.creeps[name]) {
//       delete memory.creeps[name];
//       console.log('Cleared non-existing creep from memory: ', name);
//     }
//   }



// }









