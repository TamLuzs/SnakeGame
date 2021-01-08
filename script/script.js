let canvas = document.getElementById("snake"); // create os elementos que irá executar no jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let point = document.getElementById("point");

let game = document.getElementById("game-over");

/* Inserir o Nome do Jogador */
function player() {
    let viewName = document.getElementById("name");

    let name = prompt("Qual é o nome do Jogador?");

    viewName.textContent = name;
}


/* Funções do Jogo */
function createBackground() {
    // createção do Background
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);;
}

function createSnake() {
    //Percorrer toda Array e alimentar cobrinha

    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Detecta o evento e chama a função de movimentação
document.addEventListener('keydown', update);

function update(event) {
    //São código para identificar qual tecla do teclado movimenta o que e apenas elas irão funcionar
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function StartGame() {
    //Definir que a cobrinha pode passar pelas paredes normalmente
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Contador de Comer - Food
    for (i = 1; i < snake.length; i++) {
        point.textContent = snake.length; //Exibi quantidade de pontos

        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {

            game.textContent = "GAME OVER ☠ ☠";

            clearInterval(viewGame);

        }
    }


    createBackground();
    createSnake();
    drawFood();


    //Ponto de Partida da Cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    //
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;

    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

player(); // Inserir o Nome do Usuário
let viewGame = setInterval(StartGame, 150); // Velocidade da Cobrinha
