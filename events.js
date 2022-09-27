

import { prototypes, utils, constants } from 'game';



// export const mineSource = function(memory, creep){
export const registerEvent_mineSource = function(memory, creep, func){

  let currentTick = utils.getTicks()
  let updated = {
    "energyInStore": creep.store.getFreeCapacity(constants.RESOURCE_ENERGY),
    "loggedOnTick": currentTick
  };


  if( memory.events[creep.id]  == undefined ){
    memory.events[creep.id] = {}
  }
  if ( memory.events[creep.id].mineSource == undefined ) {
    memory.events[creep.id].mineSource = toLog;
  }else{ // 
    if (updated.loggedOnTick != currentTick){

    }
  }




}


export const registerEvent_ = function (memory, creep, func) {

  let currentTick = utils.getTicks()
  let updated = {
    "energyInStore": creep.store.getFreeCapacity(constants.RESOURCE_ENERGY),
    "loggedOnTick": currentTick
  };


  if (memory.events[creep.id] == undefined) {
    memory.events[creep.id] = {}
  }
  if (memory.events[creep.id].mineSource == undefined) {
    memory.events[creep.id].mineSource = toLog;
  } else { // 
    if (updated.loggedOnTick != currentTick) {

    }
  }




}













