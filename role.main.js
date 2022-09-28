import { tinyMoverBehavior } from "./role.tinyMover";
import { warriorBehavior } from "./role.warrior";








export const doRoleTasks = function (memory, heap, creep){
  console.log("trying to run actions for "+ creep.name)

  switch(creep.role){

    case "tinyMover":
      console.log("running actions for tinyMover")
      tinyMoverBehavior(memory, heap, creep);
      break;

    case "tinySettler":
    case "settler":
      console.log("running actions for tinySettler")
      // tinySettlerBehavior(memory, heap, creep);
      tinyMoverBehavior(memory, heap, creep);
      break;

    case "warrior":
      console.log("running actions for warrior")
      warriorBehavior(memory, heap, creep);
      break;



  }

}












