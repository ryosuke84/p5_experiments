import {Vector} from 'p5';


class World {
    static collides(object, targets) {
        for(const target of targets) {
            if (object.equals(target)) {
                return true;
            }
        }
        return false;
    }

    static findEmptyTile (p5, rows, cols, occupiedTiles) {
        let rndRow = Math.floor(Math.random() * (rows - 0)) + 0;
        let rndCol = Math.floor(Math.random() * (cols - 0)) + 0;
        let newTile  = p5.createVector(rndRow, rndCol);

        while( World.collides(newTile, occupiedTiles)){
             rndRow = Math.floor(Math.random() * (rows - 0)) + 0;
             rndCol = Math.floor(Math.random() * (cols - 0)) + 0;
             newTile  = p5.createVector(rndRow, rndCol);
        }

        return newTile;
    }
}

export default World;