
import { constants, getTerrainAt, visual } from 'game';

import { CostMatrix } from 'game/path-finder';
import { getTileAbove, getTileBelow, getTileLeft, getTileRight, matrixMemoryBoilerplate } from './matrix.main';





export const twoWideMatrix = function (matrix, pos) {
  if (tileIsNextToWall(pos)) {
    // console.log("adding tile to matrix: "+ x +"/"+ y )
    matrix.set(pos.x, pos.y, 255)
  } else {
    // if (memory.matrixManager[matrixName].yCounter % 10 == 0) {
      // console.log("twoWideMatrix func hitting y: " + pos.y)
      // new visual.Visual(3, true).circle(pos, { "radius": 0.3, "fill": "#22ffff" })
    // }
    // new visual.Visual(1, true).circle(pos, { "radius": 0.3, "fill": "#2255ff" })
  }
}



// export const twoWideMatrix = function (memory, matrixName){
//   if( memory[matrixName] == undefined){

//   }
//   let costs = new CostMatrix();
//   for (let y = 0; y < ARENA_WIDTH; y++){
//     for (let x =0; x < ARENA_HEIGHT; x++){
//       let pos = {"x":x,"y":y};
//       if( tileIsNextToWall(pos) ){
//         // console.log("adding tile to matrix: "+ x +"/"+ y )
//         costs.set(x, y, 255)
//       }else{
//         new visual.Visual(1, true).circle(pos, { "radius": 0.3, "fill": "#2255ff" })
//       }
//     }
//   }
//   console.log("finished making two wide matrix")
// }




function tileIsNextToWall(pos){ //retuns bool
  if(getTerrainAt(pos) == constants.TERRAIN_WALL){
    // new visual.Visual(1, true).rect(pos, 0.5, 0.5, { "fill": "#00EEAA" })
    // new visual.Visual(1, true).circle(pos, { "radius":0.2, "fill": "#00EEAA" })
    return true;
  }


  if (
    getTerrainAt(getTileAbove(pos)) == constants.TERRAIN_WALL
    || getTerrainAt(getTileBelow(pos)) == constants.TERRAIN_WALL
    || getTerrainAt(getTileLeft(pos)) == constants.TERRAIN_WALL
    || getTerrainAt(getTileRight(pos)) == constants.TERRAIN_WALL
  ){
    // new visual.Visual(2, true).rect(pos, 0.5, 0.5, { "fill": "#ff3388" })
    // new visual.Visual(5, true).text(pos.x + "/" + pos.y, pos, { "color": "#000000", "font": 0.7, "opacity":0.7})
    // let string = pos.x + "/" + pos.y, pos;

    new visual.Visual(1, true).circle(pos, { "radius": 0.3, "fill": "#000000" })
    // new visual.Visual(5, true).text(string, { "color": "#000000", "font": 0.7, "opacity":0.7})
    return true;
  }
  return false;
}










