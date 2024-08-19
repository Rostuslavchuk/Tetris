import { CONSTANTS, start } from "./helper.mjs";



document.addEventListener("DOMContentLoaded", () => {
    const canv = document.getElementById('canv');
    const ctx = canv.getContext('2d');

    let figureArray = [];
    let merge = [];
    let figureParams = {};
    let score = document.getElementById("counter");

    let intervalDownFigure;
    let intervalFasterMove;
    

    function play(){
        const result = start();
        if (result) {
            const { figureArray: newFigureArray, figureParams: newFigureParams } = result;
            figureArray = newFigureArray;
            figureParams = newFigureParams;

            window.addEventListener('keydown', handleKeyDown);

            clearInterval(intervalDownFigure);
            intervalDownFigure = setInterval(() => {
                moveFigure(0, CONSTANTS.cellSize);
                draw();
            }, 500); 
        }
    }

    document.getElementById('start').onclick = (e) => {
        e.preventDefault();
        play();
    };





    function moveFigure(x, y) {
        let canMoveX = true;
        let canMoveY = true;
    
        for (let i = 0; i < figureArray.length; i++) {
            let newX = figureArray[i].x + x;
            let newY = figureArray[i].y + y;
    
            if (newX < 0 || newX + CONSTANTS.cellSize > canv.width || 
                merge.some(cell => cell.x === newX && cell.y === figureArray[i].y)) {
                canMoveX = false;
            }
            if (newY + CONSTANTS.cellSize > canv.height || 
                merge.some(cell => cell.y === newY && cell.x === figureArray[i].x)) {
                canMoveY = false;
            }
            
            if (!canMoveX && !canMoveY) break;
        }
    
        if (canMoveX) {
            for (let i = 0; i < figureArray.length; i++) {
                figureArray[i].x += x;
            }
        }
    
        if (canMoveY) {
            for (let i = 0; i < figureArray.length; i++) {
                figureArray[i].y += y;
            }
        }
    
        if (!canMoveY) {
            figureArray.forEach(cell => {
                merge.push({ x: cell.x, y: cell.y, color: figureParams.color });
            });
            play();
            checkMerge();
        }
    }
    
    function rotateFigure(){

        if(figureParams.color === 'yellow')return;

        let center = figureArray[0];    
        let rotatedFigure = [];

        figureArray.forEach(cell => {
            const Xwidth = cell.x - center.x;
            const Yheight = cell.y - center.y;
    
            const resX = center.x - Yheight;
            const resY = center.y + Xwidth;

            rotatedFigure.push({x: resX, y: resY});
        });

        let canRotate = true;
        for (let i = 0; i < rotatedFigure.length; i++) {
            if (rotatedFigure[i].x < 0 || rotatedFigure[i].x + CONSTANTS.cellSize > canv.width ||
                rotatedFigure[i].y < 0 || rotatedFigure[i].y + CONSTANTS.cellSize > canv.height || 
                merge.some(cell => cell.x === rotatedFigure[i].x + CONSTANTS.cellSize && cell.y === rotatedFigure[i].y + CONSTANTS.cellSize)) {
                canRotate = false;
                break;
            }
        }
        if (canRotate) {
            for (let i = 0; i < figureArray.length; i++) {
                figureArray[i].x = rotatedFigure[i].x;
                figureArray[i].y = rotatedFigure[i].y;
            }
        }
    }

    function checkFinishGame(){
        let finish = false;
        if(merge.some(cell => cell.y <= 0)){
            finish = true;
        }

        if(finish){
            clearCanvas();
            score.textContent = 0;
            merge = [];
            start();
        }
    }

    function checkMerge() {
        checkFinishGame();
    
        const lenRowForDelete = canv.width / CONSTANTS.cellSize;
        const y = new Map();
    
        if (merge.length) {
            merge.forEach(cell => {
                if (!y.get(cell.y)) {
                    y.set(cell.y, [{ x: cell.x, y: cell.y }]);
                } else {
                    y.get(cell.y).push({ x: cell.x, y: cell.y });
                }
            });
        }
    
        let rowsToDelete = [];
    
        for (const [key, value] of y.entries()) {
            if (value.length === lenRowForDelete) {
                rowsToDelete.push(key);
            }
        }
    
        if (rowsToDelete.length > 0) {

            rowsToDelete.forEach(row => {
                merge = merge.filter(cell => cell.y !== row);
            });


            if (score) {
                score.textContent = parseInt(score.textContent) + rowsToDelete.length * 100;
            }
            
            rowsToDelete.forEach(row => {
                merge.forEach(cell => {
                    if (cell.y < row) {
                        cell.y += CONSTANTS.cellSize;
                    }
                });
            });
        }     
    }
    



    function handleKeyDown(e) {
        switch (e.code) {
            case "ArrowLeft":
                moveFigure(-CONSTANTS.cellSize, 0);
                break;
            case "ArrowRight":
                moveFigure(CONSTANTS.cellSize, 0);
                break;
            case "ArrowUp":
                rotateFigure();
                break;    
            case "ArrowDown":
                clearInterval(intervalFasterMove);
                intervalFasterMove = setInterval(() => {
                    moveFigure(0, CONSTANTS.cellSize);
                    draw();
                }, 50);
                break;
            default:
                break;
        }
        draw();
    }
    window.onkeyup = (e) => {
        if(e.code === "ArrowDown"){
            clearInterval(intervalFasterMove);
        }
    }
    window.onkeydown = (e) => {
        e.preventDefault();

        if(score){
            score.textContent = parseInt(score.textContent) + 1;
        }
    }


    function clearCanvas(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canv.width, canv.height);
    }
    function draw() {
        clearCanvas();
        drawGrid();
        drawFigures();
    }
    function drawGrid() {
        ctx.strokeStyle = '#ddd';
        for (let x = 0; x <= canv.width; x += CONSTANTS.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canv.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canv.height; y += CONSTANTS.gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canv.width, y);
            ctx.stroke();
        }
    }
    function drawFigures() {
        if (!figureArray.length) return;

        ctx.fillStyle = figureParams.color;
        figureArray.forEach(({ x, y }) => {
            ctx.fillRect(x, y, CONSTANTS.cellSize - 1, CONSTANTS.cellSize - 1);
        });

    
        merge.forEach(({ x, y, color }) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, CONSTANTS.cellSize - 1, CONSTANTS.cellSize - 1);
        });
    }
});
