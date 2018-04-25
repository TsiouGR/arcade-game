// Enemies our player must avoid
// var Enemy = function() {
//     // Variables applied to each of our instances go here,
//     // we've provided one for you to get started

//     // The image/sprite for our enemies, this uses
//     // a helper we've provided to easily load images
//     this.sprite = 'images/enemy-bug.png';
// };

// // Update the enemy's position, required method for game
// // Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
//     // You should multiply any movement by the dt parameter
//     // which will ensure the game runs at the same speed for
//     // all computers.
// };

// // Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

/*
 * every enemy has 3 attribute, pos x, pos y and dt a time delta between ticks
 * in this case dt is a random from 0 to 10, but dt maybe be also set while  
 * create object
 * 
 */
let speed = 1;
let countOfGems = 1;
let allItems = [];
let whenGoodsApearArray = [0, 0, 0];
const hearts = document.querySelector('.lives ul');


const playerImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
];

const goodItems = [
    'images/Gem-Blue-small.png',
    'images/Gem-Green-small.png',
    'images/Gem-Orange-small.png',
    'images/Selector.png'

];

const enemyImages = [
    'images/enemy-bug.png',
]

let positionEnemy = 0;
const counter = document.querySelector('.counter');

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dt = Math.floor(Math.random() * 2 + 1) * speed;
        this.collision = false;
        this.sprite = 'images/enemy-bug.png';
    }
    update() {

        this.isCollison();
        this.isCollisionEnemy();
        const posY = [60, 145, 230, 600];
        const posX = [-100, -200, -400, -600]
        this.x += speed * this.dt;


        //This condition checks when enemy is out of board
        if (this.x >= 505) {
            this.y = posY[positionEnemy];
            this.x = posX[positionEnemy];
            positionEnemy++;
            if (positionEnemy > posY.length - 1) {
                positionEnemy = 0;
            }
            this.sprite = enemyImages[Math.floor(Math.random() * 2)]
            this.dt = Math.floor(Math.random() * 2 + 1) * speed;
        }

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //This method checks is enemy touch player and remove heart from lives panel
    isCollison() {
        if (this.x >= player.x - 70 && this.x <= player.x + 50 && this.y === player.y) {
            this.dt = 0;
            
            if (hearts.lastElementChild) {
                hearts.removeChild(hearts.lastElementChild)
            }
            this.collision = true;
        }
    }

    //This method prevent to collision enemies
    isCollisionEnemy() {
        allEnemies.forEach(enemy => {
            if ((this.x > enemy.x - 200 && this.x <= enemy.x + 10 && this.y === enemy.y) && this.x < enemy.x - 90) {
                enemy.dt = this.dt
            }
        });
    }
}

const enemy1 = new Enemy(-100, 60);
const enemy2 = new Enemy(-100, 145);
const enemy3 = new Enemy(-100, 230);
const enemy4 = new Enemy(-290, 60)
const enemy5 = new Enemy(-290, 145)
const enemy6 = new Enemy(-280, 230)
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


class Player {
    constructor(look = 0, x, y) {
        this.look = this.changeLook(look, playerImages);
        this.x = x;
        this.y = y;
        this.lives = 3;
        this.points = 0;

    }
    
    //This method change Avatar
    changeLook(look, array) {
        this.look = array[look]
        return this.look;
    }

    update() {
        this.render();
        this.getGoodItem();
        this.reachWatherOnBoard();
        const gems = document.querySelector('.gems ul'); 
        if (countOfGems >= 4) {
            speed += 0.4;
            countOfGems = 1;

            //This loop sets new moment when goods appears
            for (i = 0; i < 3; i++) {
                whenGoodsApearArray[i] = player.points + (100 * i) + Math.round(Math.random() * 10 + 1) * 10;
                setTimeout(()=>{
                    gems.removeChild(gems.lastElementChild)
                }, 1000);
                
            }
            
        }

    }

    render() {
        ctx.drawImage(Resources.get(this.look), this.x, this.y);
    }

    adPoints() {
        if (this.y > -25 && this.y < 240) {
            this.points += 10;
            counter.innerHTML = 'SCORE: ' + player.points;
        }
    }

    //This method checks when player collect gems
    getGoodItem() {
        allItems.forEach(item => {
            const gems = document.querySelector('.gems ul');
            const gem = document.createElement('li');
            if (this.x + 25 === item.x && this.y + 55 === item.y) {
                let look = item.look
                item.x = 1000;
                this.points += item.points;
                counter.innerHTML = 'SCORE: ' + player.points;
                gem.innerHTML = `<img src="${look.substr(0, look.length - 4)}-x.png" alt="gem">`;
                gems.appendChild(gem)
                countOfGems++;
            }
        })

    }
    appearItem() {

        if (this.points > whenGoodsApearArray[0]) {
            item1.posX();
            item1.posY();;
            allItems.push(item1);
            whenGoodsApearArray[0] = 1000000;


        } else if (this.points > whenGoodsApearArray[1]) {
            item2.posX();
            item2.posY();
            allItems.push(item2);
            whenGoodsApearArray[1] = 1000000;
        }
        else if (this.points > whenGoodsApearArray[2]) {
            item3.posX();
            item3.posY();
            allItems.push(item3);
            whenGoodsApearArray[2] = 1000000;
        }
    }

    reachWatherOnBoard() {
        if (this.y < 0) {
            let that = this.Object;
            setTimeout(() => {               
                this.x = 200;
                this.y = 400;    
            }, 300)
        }
        
    }

    //this method clears arrays 

    clear() {
        allItems = [];
        whenGoodsApearArray = [0, 0, 0];
        speed = 1;
        countOfGems = 1;
    }



    /*
     * handleinput moves player on the board, and prevent him from leaving the game place 
     */

    handleInput(input) {
        switch (input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= 100;
                    this.adPoints();
                    this.appearItem();
                }
                break;
            case 'right':
                if (this.x < 399) {
                    this.x += 100;
                    this.adPoints();
                    this.appearItem();
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 85;
                    this.adPoints();
                    this.appearItem();
                }
                break;
            case 'down':
                if (this.y < 399 && speed >1.8) {
                    this.y += 85;
                    this.adPoints();
                    this.appearItem();
                }
                break;
        }

    }
}

/* 
 * Goodies on board
 */

class GoodItem {
    constructor(look = 0, x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.look = this.changeLook(look, goodItems)
    }
    changeLook(look, array) {
        this.look = array[look]
        return this.look;
    }

    update() {
        this.render();
    }


    render() {
        ctx.drawImage(Resources.get(this.look), this.x, this.y);
    }
    
    //This method sets when goods can appears on screen
    whenGoodsApear() {
        for (let i = 0; i < 3; i++) {
            whenGoodsApearArray[i] += (100 * i) + Math.round(Math.random() * 10 + 1) * 10;
        }
    }

    posX() {
        this.x = itemPosX[Math.floor(Math.random() * 5)]
    }

    posY() {
        this.y = itemPosY[Math.floor(Math.random() * 3)]
    }

}

const player = new Player(0, 200, 400);
const itemPosY = [115, 200, 285];
const itemPosX = [25, 125, 225, 325, 425];

const item1 = new GoodItem(0, 0, 0, 50)
const item2 = new GoodItem(1, 0, 0, 80)
const item3 = new GoodItem(2, 0, 0, 100)
