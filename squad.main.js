



export const squadManager = function (memory, heap){

  // init squad manager memory
  if (memory.initStatus.squadManager == undefined || memory.initStatus.squadManager == false) {
    squadManagerMemoryInit(memory)
    console.log("---")
    console.log("initialized squad memory")
    // console.log(memory)
  }
  updateSquads(memory,heap);




}



export const squadMoveTo = function (memory, heap, squad, target, opts = {}) {


  let formation = opts.formation != undefined ? opts.formation : "train"

  let groupedUp = groupUp();
  if( ! groupedUp){
    return 
  }
  
  let formedUp = formUp();
  if ( ! formedUp){
    return 
  }


  switch(formation){

    case "train":
      squadMoveTo_train(memory, heap, squad, target, opts = {})
      break;

    // case "quad":
      
    //   break;

  }
}


export const groupUp = function (memory, heap, squadName, targetSpot) {
  // target group up spot
}

export const formUp = function (memory, heap, squadName) {
  // target group up spot
}






function squadMoveTo_train(memory, heap, squad, target, opts = {}) {

}



function updateSquads(memory, heap){
  console.log("updating squads in memory")
  // make sure all creeps with squadNames are in their squad in memory
  let updatedSquads = {}
  for(let creep in heap.myCreeps){
    let theCreep = heap.myCreeps[creep]
    // if the creep is in a squad
    if (theCreep.squadName != undefined && theCreep.squadName != ""){
      if (updatedSquads[theCreep.squadName] == undefined){
        updatedSquads[theCreep.squadName] = singleSquadMemoryBoilerplate();
      }
      // add Id and role to memory
        memory.squads[theCreep.squadName][theCreep.name] = {"id":theCreep.id, "role":theCreep.role}
    }
  }

  // Since this will recreate the squads with only living creeps
  // Use it as an update for memory
  memory.squads = updatedSquads;
}










function singleSquadMemoryBoilerplate(memory, creep = false) {
  let boilerplate ={
    "movementLeaderId": "",
  }
  return boilerplate;
}


function squadManagerMemoryInit(memory) {
  memory.squadManager = {
    "squads": []
  }
  memory.initStatus.squadManager = true
}




