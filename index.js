import EnemyController from "./EnemyController.js";
import Player from "./player.js";
import BulletController from "./BulletCotroller.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;


const backgound = new Image();
backgound.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);

const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(backgound, 0, 0, canvas.width, canvas.height);
    DisplayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
        console.log(isGameOver);
    }
}
function DisplayGameOver() {
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 5;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}
function checkGameOver() {
    if (isGameOver) {
        return;
    }
    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }
    if(enemyController.collideWith(player)){
        isGameOver =true;
    }
    if(enemyController.enemyRows.length===0){
        didWin=true;
        isGameOver=true;
    }
}
setInterval(game, 1000 / 60);