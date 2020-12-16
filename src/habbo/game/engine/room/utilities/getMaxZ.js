import {heightmap} from "./heightmap";
import {generateMatrice} from "./Matrices";

export function getMaxZ(map) {
    var finalMapValue = []
    var floor = generateMatrice(map)

    for(let y = 0; y < floor.length; y++) {
        for (let x = 0; x < floor[y].length; x++) {
            floor[y][x] = heightmap[String(floor[y][x])]
        }
    }
    for(let y = 0; y < floor.length; y++) {
        finalMapValue.push(Math.max.apply(Math, floor[y]))
    }
    console.log(finalMapValue)
    return Math.max.apply(Math, finalMapValue);
}