let startButton = document.getElementById("playButton");
let titleScreen = document.getElementById('title-screen');
let canvas = document.getElementById('canv');
let ctx = canvas.getContext('2d');
startButton.addEventListener("click", function(e) {
    if (e.button === 0) startGame();
});

function startGame() {
    titleScreen.style = "display: none";
    canvas.classList.remove('hide');
    canvas.classList.add('game');
    let ctx = canvas.getContext('2d');
    setInterval(drawStuff, 1);
}

window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

let size = 1;

function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68:
            keyD = true;
            break;
        case 83:
            keyS = true;
            break;
        case 65:
            keyA = true;
            break;
        case 87:
            keyW = true;
            break;
        case 32:
            draw = true;
            break;
        case 80:
            picking = true;
            break;

    }
}

function onKeyUp(event) {

    var keyCode = event.keyCode;
    switch (keyCode) {
        case 68:
            keyD = false;
            break;
        case 83:
            keyS = false;
            sdgjknDGFHdsfdfGhjgdfjkkl();
            break;
        case 65:
            keyA = false;
            alpha = prompt("alpha");
            break;
        case 87:
            keyW = false;
            break;
        case 32:
            draw = false;
            break;
        case 70:
            saving = true;
            saveImg();
            break;
        case 189:

            size -= 0.1;
            break;
        case 187:
            size += 0.1;
            break;
        case 171:
            size += 0.1;
            break;
        case 173:
            size -= 0.1;
            break;
        case 67:
            clearScreen();
            break;
        case 69:
            newcolor();
            break;
        case 79:
            loadImg();
            break;
        case 80:
            picking = false;
            break;
        case 81:
            keyboard = !keyboard
            break;
        case 90:
            undo();
            break;
    }

}

var tickX = 10;
var tickY = 10;
var alpha = 1;
var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var draw = false;
var saving = false;
var c = canvas.getContext("2d");
var keyboard = true;
var mouse = false;
var mouseX;
var mouseY;
var tickXold;
var tickYold;
var picking = false;
window.addEventListener("mousedown", function(e) {


    if (e.button == 2) earse = true;
    if (e.button == 0) {
        draw = true;
        earse = false;
    }


});
window.addEventListener("mouseup", function(e) {
    if (e.button == 0) {
        draw = false;

    }
    if (e.button == 2) earse = false;
});
let timeout = 0;

window.addEventListener("mousemove", function(e) {
    mouseX = e.clientX - canvas.getBoundingClientRect().left - canvas.clientLeft;
    mouseY = e.clientY - canvas.getBoundingClientRect().top - canvas.clientTop;

    if (picking) {
        var imageData = c.getImageData(mouseX, mouseY, 1, 1).data;
        color = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    }
});
window.addEventListener("dragstart", function(e) {
 draw = true;
 mouseX = e.clientX - canvas.getBoundingClientRect().left - canvas.clientLeft;
    mouseY = e.clientY - canvas.getBoundingClientRect().top - canvas.clientTop;

 })
window.addEventListener("dragend", function(e) {
draw = false; })
canvas.addEventListener("contextmenu", function(e) {
    e.preventDefault();
})

function clearPos() {
    c.clearRect(tickX, tickY, 50 * size, 50 * size);
}

function clearScreen() {
    var dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url: "photo_undo.php",
        data: {
            imgBase64: dataURL
        }
    }).done(function(response) {
        console.log('saved: ' + response);
    });
    saving = false;
    c.clearRect(0, 0, canvas.width, canvas.height);
}
let color = 'rgb(0, 0, 255)';

function newcolor() {
    color = prompt("color");
}

function undo() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    let img = new Image();
    img.onload = function() {
        c.drawImage(img, 0, 0, 1500, 700, 0, 0, 1500, 700);
    }
    img.src = "images/last.png"
}

function loadImg() {
    const inputFile = document.createElement('input');
    inputFile.type = "file";
    inputFile.click();
    inputFile.addEventListener("change", function(e) {
        if (inputFile.files[0] == null) {

        }
        c.clearRect(0, 0, canvas.width, canvas.height);
        let img = new Image();
        img.onload = function() {
            c.drawImage(this, 0, 0, 1500, 700, 0, 0, 1500, 700);
        }
        img.src = URL.createObjectURL(inputFile.files[0]);
    })
    inputFile.delete;
}

function saveImg() {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    link.delete;
}

function sdgjknDGFHdsfdfGhjgdfjkkl() {
    var dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url: "photo_upload.php",
        data: {
            imgBase64: dataURL
        }
    }).done(function(response) {
        console.log('saved: ' + response);
    });
}

function drawStuff() {
    c.beginPath();
    c.fillStyle = color;
    c.fill();
    c.strokeStyle = color;

    if (earse == true) c.clearRect(tickX - 25 * size / 2, tickY - 25 * size / 2, 50 * size, 50 * size);
    if (draw == true) {
        c.arc(tickX, tickY, 0.5, 0, 1 * Math.PI);
        c.lineWidth = 30 * size;
        c.stroke();
        c.moveTo(tickXold, tickYold);
        c.lineTo(tickX, tickY);
    }
    tickXold = tickX;
    tickYold = tickY;
    tickX = mouseX;
    tickY = mouseY;
    c.lineWidth = 50 * size;
    c.stroke();

}
