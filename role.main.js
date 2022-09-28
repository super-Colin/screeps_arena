import { tinyMoverBehavior } from "./role.tinyMover";








export const doRoleTasks = function (memory, heap, creep){

  switch(creep.role){

    case "tinyMover":
      console.log("running actions for tinyMover")
      tinyMoverBehavior(memory, heap, creep);
      break;

    case "tinySettler":
      console.log("running actions for tinySettler")
      tinySettlerBehavior(memory, heap, creep);
      break;


  }

}












