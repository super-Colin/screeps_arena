








import { prototypes, utils, constants } from 'game';
// import { getObjectsByPrototype } from 'game/utils';
// import { Creep, Flag, StructureSpawn } from 'game/prototypes';
// import { RESOURCE_ENERGY, ERR_NOT_IN_RANGE, MOVE, WORK, CARRY } from 'game/constants';










var myWorker, myHealer, myFighter, myArcher;



export function loop() {

  const allCreeps = utils.getObjectsByPrototype(prototypes.Creep);
  let myCreepsFound = allCreeps.find(i => i.my);
  let myCreepsFiltered = allCreeps.filter(creep => creep.my);
  let enemyCreeps = allCreeps.find(i => !i.my);

  var allSources = utils.getObjectsByPrototype(prototypes.Source);


  const allSpawns = utils.getObjectsByPrototype(prototypes.StructureSpawn);

  let mySpawn = allSpawns.find(s => s.my);


  console.log("allSpawns ::: ")
  console.log(allSpawns)
  console.log("mySpawn ::: ")
  console.log(mySpawn)
  console.log("allCreeps ::: ")
  console.log(allCreeps)
  console.log("myCreepsFound ::: ")
  console.log(myCreepsFound)
  console.log("myCreepsFiltered ::: ")
  console.log(myCreepsFiltered)


  // Spawn creeps
  if (myCreepsFiltered) {
    switch (myCreepsFiltered.length) {

      case 0:
        myWorker = mySpawn.spawnCreep([constants.MOVE, constants.WORK, constants.CARRY]).object
        break
      case 1:
        let newFighter = mySpawn.spawnCreep([constants.TOUGH, constants.TOUGH, constants.MOVE, constants.MOVE, constants.ATTACK, constants.ATTACK]).object
        console.log("new Fighter is " + newFighter);
        if (newFighter) {
          myFighter = newFighter;
        }
        break;
      case 2:
        let newArcher = mySpawn.spawnCreep([constants.TOUGH, constants.MOVE, constants.MOVE, constants.RANGED_ATTACK]).object
        console.log("new Archer is " + newArcher);
        if (newArcher) {
          myArcher = newArcher;
        }
        break;
      case 3:
        let newHealer = mySpawn.spawnCreep([constants.MOVE, constants.HEAL]).object
        console.log("new Healer is " + newHealer);
        if (newHealer) {
          myHealer = newHealer;
        }
        break;
      default:
        console.log("switch default, time: " + utils.getTicks())
    }


    // Harvest energy
    if (myWorker) {
      if (myWorker.store.getFreeCapacity(constants.RESOURCE_ENERGY)) {
        if (myWorker.harvest(allSources[0]) == constants.ERR_NOT_IN_RANGE) {
          myWorker.moveTo(allSources[0]);
        }
      } else {
        if (myWorker.transfer(mySpawn, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
          myWorker.moveTo(mySpawn);
        }
      }
    }




    // Make creeps do
    var myCreeps = utils.getObjectsByPrototype(prototypes.Creep).filter(creep => creep.my);
    var enemyCreep = utils.getObjectsByPrototype(prototypes.Creep).find(creep => !creep.my);


    for (var creep of myCreeps) {
      if (creep.body.some(bodyPart => bodyPart.type == constants.ATTACK)) {
        if (creep.attack(enemyCreep) == constants.ERR_NOT_IN_RANGE) {
          creep.moveTo(enemyCreep);
        }
      }
      if (creep.body.some(bodyPart => bodyPart.type == constants.RANGED_ATTACK)) {
        if (creep.rangedAttack(enemyCreep) == constants.ERR_NOT_IN_RANGE) {
          creep.moveTo(enemyCreep);
        }
      }
      if (creep.body.some(bodyPart => bodyPart.type == constants.HEAL)) {
        var myDamagedCreeps = myCreeps.filter(i => i.hits < i.hitsMax);
        if (myDamagedCreeps.length > 0) {
          if (creep.heal(myDamagedCreeps[0]) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(myDamagedCreeps[0]);
          }
        }
      }
    }

  }

}


















