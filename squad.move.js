









export const moveCreepsInSameDirection = function (creeps, direction) {
  if (creeps.length == 0) {
    return false
  }
  if (!allCreepsCanMove(creeps)) {
    return false;
  }
  for (let creep in creeps) {
    let result = creeps[creep].move(direction)
    if (!result) {
      console.log("moveCreepsInSameDirection failed to move a creep, code: " + result)
      return false;
    }
  }
}


function allCreepsCanMove(creeps) {
  if (creeps.length == 0) {
    return false
  }
  for (let creep in creeps) {
    if (creeps[creep].fatigue == undefined || creeps[creep].fatigue != 0) {
      return false
    }
  }
  // return true if all creeps have 0 fatigue
  return true;
}








