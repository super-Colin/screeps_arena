
import { CostMatrix } from 'game/path-finder';
import { twoWideMatrix } from './matrix.twoWide';


const ARENA_WIDTH = 100
const ARENA_HEIGHT = 100



const matrixGoals = {
  "twoWide":null
  }


const matrixFuncs = {
  "twoWide": twoWideMatrix
}



export const matrixManager = function (memory, heap){

  // init squad manager memory
  if (memory.initStatus.matrixManager == undefined || memory.initStatus.matrixManager == false) {
    matrixManagerMemoryInit(memory)
    console.log("---")
    console.log("initialized matrix memory")
  }

  if(memory.matrixManager.working == true){
    for (let matrixName in memory.matrixManager.matrices){
      if (memory.matrixManager[matrixName] == undefined){
        memory.matrixManager[matrixName] = matrixMemoryBoilerplate();
      }
      if (memory.matrixManager[matrixName].complete == false){
        let result = iterateFuncOnMatrix(memory, matrixName, matrixFuncs[matrixName])
        if (result == true) {
          memory.matrixManager[matrixName].complete = true; 
        }
      }
    }
  }




}


export const iterateFuncOnMatrix = function (memory, matrixName, func) {
  let costs = memory.matrixManager[matrixName].matrix;
  for (let y = memory.matrixManager[matrixName].yCounter; y < ARENA_WIDTH; y++) {
    for (let x = memory.matrixManager[matrixName].xCounter; x < ARENA_HEIGHT; x++) {
      twoWideMatrix(costs, { "x": x, "y": y })
      memory.matrixManager[matrixName].xCounter++;
      if (memory.matrixManager[matrixName].yCounter % 99 == 0) {
        console.log("matrix func hitting x: " + x)
      }
    }
    memory.matrixManager[matrixName].xCounter = 0;
    memory.matrixManager[matrixName].yCounter++;
    if (memory.matrixManager[matrixName].yCounter % 5 == 0){
      console.log("matrix func hitting y: "+ y)
    }
  }
  console.log("finished making two wide matrix")
  console.log(memory.matrixManager[matrixName].matrix)
  return true;
}






function processMatrix(memory, matrixName, func){
  let result = iterateFuncOnMatrix(memory, matrixName, func)
}




// // make sure all creeps with squadNames are in their squad in memory
// let updatedSquads = {}
// for (let creep in heap.myCreeps) {
//   let theCreep = heap.myCreeps[creep]
//   // if the creep is in a squad
//   if (theCreep.squadName != undefined && theCreep.squadName != "") {
//     if (updatedSquads[theCreep.squadName] == undefined) {
//       updatedSquads[theCreep.squadName] = matrixMemoryBoilerplate();
//     }
//     // add Id and role to memory
//     memory.squads[theCreep.squadName][theCreep.name] = { "id": theCreep.id, "role": theCreep.role }
//   }
// }

// // Since this will recreate the squads with only living creeps
// // Use it as an update for memory
// memory.squads = updatedSquads;






export const matrixMemoryBoilerplate = function () {
  let boilerplate = { 
    "xCounter": 0,
    "yCounter": 0,
    "complete": false,
    "matrix": new CostMatrix(),
  }
  return boilerplate;
}




export const getTileAbove = function(pos) {
  return { "x": pos.x, "y": pos.y + 1 }
}
export const getTileBelow = function (pos) {
  return { "x": pos.x, "y": pos.y - 1 }
}
export const getTileLeft = function (pos) {
  return { "x": pos.x - 1, "y": pos.y }
}
export const getTileRight = function (pos) {
  return { "x": pos.x + 1, "y": pos.y }
}


function matrixManagerMemoryInit(memory) {
  memory.matrixManager = {
    "working":true,
    "matrices": matrixGoals
  }
  memory.initStatus.matrixManager = true
}














// // From Discord @Doomsday :)
// export function DrawMapVisualLarge(map) {
//   for (var y = 0; y < ARENA_HEIGHT; ++y) {
//     for (var offX = 0; offX < ARENA_WIDTH; offX += 17) {
//       var text = "";

//       var extra = 17;

//       if (offX == 85)
//         extra = 15;

//       for (var x = offX; x < offX + extra; ++x) {
//         var location = x + y * ARENA_WIDTH;
//         var value = map[location];
//         var needDigits = 0;

//         if (value >= 0 && value <= 9)
//           needDigits = 3;
//         else if (value >= -9 && value <= 99)
//           needDigits = 2;
//         else if (value >= -99 && value <= 999)
//           needDigits = 1;
//         else if (value < -999)
//           value = -999;
//         else if (value > 9999)
//           value = 9999;

//         if (needDigits >= 3)
//           text += ' ';

//         if (needDigits >= 1)
//           text += ' ';

//         text += value;

//         if (needDigits >= 2)
//           text += ' ';
//       }

//       new visual.Visual().text(text, { x: offX + extra / 2 - 0.6, y: y + 0.13 }, { font: '0.446 Consolas', strokeWidth: '0.0446' });
//     }
//   }
// }



