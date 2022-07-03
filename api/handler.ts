import getUnitHandler from "./src/handlers/get-units-unitId";
import helloWorldHandler from "./src/handlers/helloWorld";

import startHandler from "./src/handlers/post-units-unitId";
import seedHandler from "./src/handlers/seed";
import stopHandler from "./src/handlers/patch-units-unitId-charges-chargeId";
import listAllHandler from "./src/handlers/units";

export const helloWorld = helloWorldHandler;
export const unitsIndex = listAllHandler;
export const seed = seedHandler;
export const getUnit = getUnitHandler;
export const start = startHandler;
export const stop = stopHandler;
