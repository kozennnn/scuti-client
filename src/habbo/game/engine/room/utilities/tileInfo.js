import {heightmap} from "./heightmap";

export function isTile(tile) {
    return tile !== 'x';
}

export function getTile(matrix, x, y) {
    if(x < 0) return 'x';
    if(y < 0) return 'x';
    if(matrix[y] === undefined) return 'x';
    if(matrix[y][x] === undefined) return 'x';
    return matrix[y][x]
}

export function getTileInfo(matrix, x, y) {

    // Top
    const topLeftTile = getTile(matrix, x - 1, y - 1);
    const topTile = getTile(matrix, x, y - 1);
    const topRightTile = getTile(matrix, x + 1, y - 1);
    // Mid
    const midLeftTile = getTile(matrix, x - 1, y);
    const midTile = getTile(matrix, x, y);
    const midRightTile = getTile(matrix, x + 1, y);
    // Bot
    const botLeftTile = getTile(matrix, x - 1, y + 1);
    const botTile = getTile(matrix, x, y + 1);
    const botRightTile = getTile(matrix, x + 1, y + 1);

    return {
        topLeftTile: topLeftTile,
        topTile: topTile,
        topRightTile: topRightTile,
        midLeftTile: midLeftTile,
        midTile: midTile,
        midRightTile: midRightTile,
        botLeftTile: botLeftTile,
        botTile: botTile,
        botRightTile: botRightTile,
    }
}

export function getTileDiff(tile1, tile2) {
    return Number(heightmap[tile1]) - Number(heightmap[tile2]);
}

export function getStair(matrix, x, y) {
    // Top
    const topLeftTile = getTile(matrix, x - 1, y - 1);
    const topTile = getTile(matrix, x, y - 1);
    const topRightTile = getTile(matrix, x + 1, y - 1);
    // Mid
    const midLeftTile = getTile(matrix, x - 1, y);
    const midTile = getTile(matrix, x, y);
    const midRightTile = getTile(matrix, x + 1, y);
    // Bot
    const botLeftTile = getTile(matrix, x - 1, y + 1);
    const botTile = getTile(matrix, x, y + 1);
    const botRightTile = getTile(matrix, x + 1, y + 1);

    //  000
    // 1[0]0
    // 000
    if(isTile(midTile) && isTile(midLeftTile)) {
        if(getTileDiff(midLeftTile, midTile) === 1) {
            return {
                direction: 'right'
            }
        }
    }

    //  010
    // 0[0]0
    // 000
    if(isTile(midTile) && isTile(topTile)) {
        if(getTileDiff(topTile, midTile) === 1) {
            return {
                direction: 'bottom'
            }
        }
    }
    return false;
}

export function isDoor(matrix, x, y) {
    // Top
    const topLeftTile = getTile(matrix, x - 1, y - 1);
    const topTile = getTile(matrix, x, y - 1);
    const topRightTile = getTile(matrix, x + 1, y - 1);
    // Mid
    const midLeftTile = getTile(matrix, x - 1, y);
    const midTile = getTile(matrix, x, y);
    const midRightTile = getTile(matrix, x + 1, y);
    // Bot
    const botLeftTile = getTile(matrix, x - 1, y + 1);
    const botTile = getTile(matrix, x, y + 1);
    const botRightTile = getTile(matrix, x + 1, y + 1);

    return !isTile(topTile) && !isTile(topLeftTile) && !isTile(midLeftTile) && !isTile(botLeftTile) && !isTile(botTile) && isTile(midTile);

}

export function getHideborder(matrix, x, y) {
    const midRightTile = getTile(matrix, x + 1, y);
    const midTile = getTile(matrix, x, y);
    const botTile = getTile(matrix, x, y + 1);

    return isTile(midRightTile) && isTile(botTile) && getTileDiff(midTile, midRightTile) === 0 && getTileDiff(midTile, botTile) === 0;

}
