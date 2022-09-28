
import { prototypes, utils, constants, getTicks, arenaInfo } from 'game';
import { memoryInit } from './memory';
import { doRoleTasks } from './role.main';
import { autoSpawn } from './spawn';
// import { arenaInfoDump } from './myUtils'; // my utils





// long term variables
var mainMemory = {}

var mainInit = false;

var phaseSpawnGoals = {
  0: {// phase 0: initilization
    // "tinyMover":0,
  }, // once memory is initialized, increment phase

  1: { // phase 1: spawn some small creeps to get energy coming in
    "tinyMover": 3,
  },// once we have some tinyMovers bringing in energy, increment phase

  2: { // phase 2:build some tinyMover to go settle at newly spawning containers
    // "tinyMover": 0,
    "settler": 2,
    "warrior": 1,
  }, // once we have some settlers ready, increment phase

  3: { // phase 3: start building a combat squad
    // "tinyMover": 0,
    // "settler": 3,
    "warrior": 3,
    // "combatSquad": 1
  }, // once first squad is complete, increment phase

  4: { // phase 4: start harassing and build another squad
    // "tinyMover": 0,
    "warrior": 3,
    "settler": 3,
    // "combatSquad": 2
  }, // once second squad is complete, increment phase

  5: { // phase 5: keep building squads and try to destroy enemy spawn
    "tinyMover": 2,
    "settler": 3,
    "combatSquad": 4
  },

}






// var aInfo = arenaInfoDump();
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
console.log("Arena info dump:")
console.log(arenaInfo)
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")





export function loop() {

  // const allCreeps = utils.getObjectsByPrototype(prototypes.Creep);
  // let myCreeps = allCreeps.filter(creep => creep.my);
  if (!mainInit){
    mainMemory = memoryInit(mainMemory, mainHeap);
    mainMemory.basePhase = 1;
    mainInit = true;
    console.log("mainMemory initialized: ")
    console.log(mainMemory)
  }

  // intialize the heap for this tick
  const allCreeps = utils.getObjectsByPrototype(prototypes.Creep);
  const allSpawns = utils.getObjectsByPrototype(prototypes.StructureSpawn);
  var mainHeap = { // heap will be our temp memory updated every tick and compared to mainMemory
    "myCreeps": allCreeps.filter(creep => creep.my),
    "enemyCreeps": allCreeps.filter(creep  => ! creep.my),
    // "allSources": utils.getObjectsByPrototype(prototypes.Source),
    "mySpawns": allSpawns.filter(spawn => spawn.my),
    "enemySpawns": allSpawns.filter(spawn => ! spawn.my),
  }


  autoSpawn(mainMemory, mainHeap, phaseSpawnGoals[mainMemory.basePhase]);


  // update

  for( let creep of mainHeap.myCreeps){
    // doRoleTasks(creep)
    doRoleTasks(mainMemory, mainHeap, creep)
  }



















  if( getTicks() % 3 == 0){
    // updateBasePhase(mainMemory, mainHeap);
    console.log("~~~~")
    console.log("~~~~~~~~~~~~~~~~~")
    if (getTicks() % 6 == 0) {
      console.log("end of tick memory: ")
      console.log(mainMemory)
      console.log("---")
    }
    console.log("end of tick heap: ")
    console.log(mainHeap)
    console.log("~~~~~~~~~~~~~~~~~")
    console.log("~~~~")
  }


  
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}




export const incrementBasePhase = function (memory){
  console.log("incrementing basePhase")
  memory.basePhase ++;
}



