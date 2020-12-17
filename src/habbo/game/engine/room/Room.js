import {generateMatrice} from "./utilities/Matrices";
import {Tile} from "./objects/Tile";
import {Wall} from "./objects/Wall";
import {getMaxZ} from "./utilities/getMaxZ";
import {heightmap} from "./utilities/heightmap";
import {getStair, getTileInfo, isTile} from "./utilities/tileInfo";
import {Stair} from "./objects/Stair";

export class Room {
    constructor(props) {
        this._container = props.container;
        this._floor = props.floor;
        this._parsedFloor = generateMatrice(this._floor);

        this._wallHeight = 1;
        this._wallThickness = 8;
        this._floorThickness = 8;

        this._hideWalls = false;
        this._hideFloor = false;

        this._wallTextureId = 0;
        this._floorTextureId = 0;
        this._landscapeTextureId = 0;

        this._walls = [];
        this._tiles = [];

        this._maxZ = getMaxZ(this._floor);
    }

    loadTextures() {

    }

    addTile(tile) {
        this._tiles.push(tile)
    }

    updateTileThickness(thickness) {
        this._floorThickness = thickness;
        this.updateRoom();
    }

    addWall(wall) {
        this._walls.push(wall)
    }

    resetTiles() {
        this._tiles.forEach((tile) =>
            tile._object.destroy()
        );
        this._tiles = [];
    }

    resetWalls() {
        this._walls.forEach((_object) => {
            _object.destroy;
        });
        this._walls = [];
    }

    applyWallTexture(id) {
        this._wallTextureId = id;
        this.updateRoom();
    }

    applyFloorTexture(id) {
        this._floorTextureId = id;
        this.updateRoom();
    }

    updateRoom() {
        this.resetTiles();
        this.resetWalls();

        const map = this._parsedFloor;
        console.log(map);

        for(let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if(isTile(map[y][x])) {
                    if(!isTile(getTileInfo(map, x, y).topLeftTile) && !isTile(getTileInfo(map, x, y).topTile) && !isTile(getTileInfo(map, x, y).midLeftTile)) {
                        this.addWall(new Wall({
                            container: this._container,
                            material: this._wallTextureId,
                            tileThickness: this._floorThickness,
                            wallThickness: this._wallThickness,
                            wallHeight: 1,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            },
                            maxZ: this._maxZ,
                            direction: 'corner'
                        }));
                    }
                    if(!isTile(getTileInfo(map, x, y).midLeftTile)) {
                        this.addWall(new Wall({
                            container: this._container,
                            material: this._wallTextureId,
                            tileThickness: this._floorThickness,
                            wallThickness: this._wallThickness,
                            wallHeight: 1,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            },
                            maxZ: this._maxZ,
                            direction: 'left'
                        }));
                    }
                    if(!isTile(getTileInfo(map, x, y).topTile)) {
                        this.addWall(new Wall({
                            container: this._container,
                            material: this._wallTextureId,
                            tileThickness: this._floorThickness,
                            wallThickness: this._wallThickness,
                            wallHeight: 1,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            },
                            maxZ: this._maxZ,
                            direction: 'right'
                        }));
                    }
                    if(getStair(map, x, y).direction === 'bottom') {
                        this.addTile(new Stair({
                            container: this._container,
                            material: this._floorTextureId,
                            tileThickness: this._floorThickness,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            },
                            direction: 'bottom'
                        }));
                    } else if(getStair(map, x, y).direction === 'right') {
                        this.addTile(new Stair({
                            container: this._container,
                            material: this._floorTextureId,
                            tileThickness: this._floorThickness,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            },
                            direction: 'right'
                        }));
                    } else {
                        this.addTile(new Tile({
                            container: this._container,
                            material: this._floorTextureId,
                            tileThickness: this._floorThickness,
                            positions: {
                                x: x,
                                y: y,
                                z: heightmap[map[y][x]]
                            }
                        }));
                    }
                }
            }
        }
    }
}