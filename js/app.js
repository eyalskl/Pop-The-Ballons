'use strict';
var gElSky = document.querySelector('.sky');
var gBalloons;
var gLifeCounter = 4;
var gLifes = document.getElementsByClassName('life');
var gIntervalId;

function init() {
    // checkLife();
    gBalloons = createBaloons(20);
    clearInterval(gIntervalId);
    gElSky.innerHTML = ''
    renderBalloons();
    startGame()
}

// function checkLife() {
//     if (gLifeCounter > 0) {
//         var poppedCount = 0
//         for (var i = 0; i < gBalloons.length; i++) {
//             if (gBalloons[i].isPopped) poppedCount++;
//         }
//         if (poppedCount !== 5) {
//             gLifes[gLifeCounter].style.display = 'none';
//             gLifeCounter--;
//         }
//     } else if (gLifeCounter === 0) {
//         gLifes[0].style.display = 'none';
//         setTimeout(function() {if (confirm('*** GAME OVER ***\nPlay Again?!')) {
//             gLifeCounter = 4;
//             for (i = 0; i <= gLifes.length; i++) {
//                 gLifes[i].style.display = ''
//             }
//             init()
//         }
//     },100);
//     }
// }

function createBaloons(amount) {
    var balloons = [];
    for (var i = 0; i < amount; i++) {
        var balloon = createBalloon(i + 1);
        balloons.push(balloon);
    }
    return balloons;
}

function createBalloon(id) {
    var balloon = {
        id: id,
        speed: setRandSpeed(),
        bottom: 0
    }
    return balloon;
}


function renderBalloons() {
    var strHTML = ''
    for (var i = 0; i < gBalloons.length; i++) {
        strHTML += `<div style="bottom:0; left:${setRandLeft()}; background-image: url(${setRandImg()}); background-size: 140px; background-position: center;" 
                         class="balloon" 
                         onclick="popBalloon(this)">
                    </div>
        `;
    }
    gElSky.innerHTML += strHTML;
}

function startGame() {
    clearInterval(gIntervalId);
    gIntervalId = setInterval(floatBalloons, 1000)
}

function floatBalloons() {
    var elBalloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < gBalloons.length; i++) {
        gBalloons[i].bottom += gBalloons[i].speed;
        elBalloons[i].style.bottom = gBalloons[i].bottom + 'px';
    }
}


function popBalloon(elBalloon) {
    // gBalloons[i].isPopped = true;
    var popAudio = new Audio('sound/pop.wav')
    popAudio.play()
    elBalloon.style.opacity = '0%';
}

function setRandSpeed() {
    return (Math.floor(Math.random() * (50 - 25 + 1)) + 25);
}

function setRandLeft() {
    return (Math.floor(Math.random() * (800 - 50 + 1)) + 50) + 'px';
}


function setRandImg() {
    var imgs = ['https://i0.wp.com/freepngimages.com/wp-content/uploads/2016/04/pink-balloon-transparent-background.png?w=491',
        'https://i0.wp.com/freepngimages.com/wp-content/uploads/2016/04/blue-balloon-transparent-background.png?fit=491%2C752',
        'https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/04/green-balloon-transparent-background.png?w=491',
        'https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/04/yellow-balloon-transparent-background.png?w=491',
        'https://i0.wp.com/freepngimages.com/wp-content/uploads/2016/04/red-balloon-transparent-background.png?fit=491%2C752'];
    return imgs[Math.floor(Math.random() * imgs.length)];
}