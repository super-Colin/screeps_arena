





// var combatSquads = []
// var builderSquads = []





export const memoryInit = function () {
  return {
    basePhase: 0,
    basePhaseLimit: 5,
    warStatus: {
      underAttack: false,
      mainTarget: "",
    },
    creeps: {
      combatSquads: [],
      builderSquads: [],
    },
    spawns: {},
    initStatus: {}
  }
}









// export const memoryInit = function(memoryVariable){
//   memoryVariable= {}
//   memoryVariable.basePhase = 0,
//   memoryVariable.warStatus = {
//     underAttack:false,
//     mainTarget:"",
//   }
//   memoryVariable.creeps = {
//     combatSquads:[],
//     builderSquads:[],
//   }
//   memoryVariable.spawns = {},
//   memoryVariable.initStatus = {}
// }




