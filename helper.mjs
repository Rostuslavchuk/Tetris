let figureInPlay = [];

export const CONSTANTS = {
    gridSize: 20,
    cellSize: 20, 
    startPositionX: 140,
    startPositionY: -40,
    statndartFigureLen: 4,
    merge: []
}

export const figures = {
    I: { color: "aqua" },
    Z: { color: "green" },
    S: { color: "red" },
    O: { color: "yellow" },
    T: { color: "purple" },
    L: { color: "orange" },
    J: { color: "pink" }
};

export function I(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX - CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX + (CONSTANTS.cellSize * 2), y: CONSTANTS.startPositionY}
    );
}

export function Z(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX - CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

export function S(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX - CONSTANTS.cellSize, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

export function O(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

export function T(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX - CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

export function L(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY - CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX + CONSTANTS.cellSize, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

export function J(){
    figureInPlay.push(
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY - CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX, y: CONSTANTS.startPositionY + CONSTANTS.cellSize},
        {x: CONSTANTS.startPositionX - CONSTANTS.cellSize, y: CONSTANTS.startPositionY + CONSTANTS.cellSize}
    );
}

const figureFunctions = {
    I,
    Z,
    S,
    O,
    T,
    L,
    J
};


function getRandomFigure(){
    const arrayKeys = Object.keys(figures);
    return arrayKeys[Math.ceil(Math.random() * arrayKeys.length - 1)];
}

export function start() {
    const figureName = getRandomFigure();

    figureInPlay.length = 0;

    const figureFunction = figureFunctions[figureName];
    if (figureFunction) {
        figureFunction(); 
    }

    if (figureInPlay.length) {
        return { figureArray: figureInPlay, figureParams: figures[figureName] };
    }
}



