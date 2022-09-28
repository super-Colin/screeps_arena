



export const squadManager = function(){


  if (memory.initStatus.squadManager == undefined || memory.initStatus.squadManager == false) {
    squadManagerMemoryInit(memory)
    console.log("---")
    console.log("initialized squad memory")
    // console.log(memory)
  }




}

function squadManagerMemoryInit(){
  memory.squadManager = {
    "spawnQueue": [],
    // "lastRoleSpawned":"none"
  }
  memory.initStatus.squadManager = true
}




