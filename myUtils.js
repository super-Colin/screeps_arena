
import { arenaInfo } from 'game';


export const arenaInfoDump = function(){ //:Object

  return {
    "name":arenaInfo.name,
    "level": arenaInfo.level,
    "season": arenaInfo.season,
    "ticksLimit": arenaInfo.ticksLimit,
    "cpuTimeLimit": arenaInfo.cpuTimeLimit,
    "cpuTimeLimitFirstTick": arenaInfo.cpuTimeLimitFirstTick,
  }
}













