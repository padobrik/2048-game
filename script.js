/*
Main function
*/
function setGame() {
    playground = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            
            // div id='0-0'
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            let num = playground[r][c];
            updateTile(tile, num);
            document.getElementById('playground').append(tile);
        }
    }
    setTwo();
    setTwo();
}

/*
Checks whereas empty tile for setTwo() filler
*/
function hasEmptyTitle() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (playground[r][c] == 0) {
                return true;
            }
        }
    }
    if (alert('Вы проиграли!')){

    } else window.location.reload(); 
    return false;
}

/*
Fills empty tile with '2'
*/
function setTwo() {
    if (!hasEmptyTitle()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if (playground[r][c] == 0) {
            playground[r][c] = 2;
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;
        }
    }
}

/*
Updates tile each time when slide is released
*/
function updateTile(tile, num) {
    tile.innerText = '';
    tile.classList.value = ''; // classList 'tile x2 x4 x8' etc -> div class=''
    tile.classList.add('tile'); // -> 'tile' -> div class="tile"

    if (num > 0) {
        tile.innerText = num;
        if (num <= 1024) {
            tile.classList.add('x' + num.toString());
        } else {
            tile.classList.add('x2048');
        }
        if (num == 2048) {
            if (alert('Вы выиграли!')) {
            } else {
                window.location.reload();
            }
        }
    } // -> div class='tile xN'
}

/*
Deletes zeros from array
*/
function filterZero(row) {
    return row.filter(num => num != 0);
}

/*
Slider for array to recalculate values in tile
*/
function slide(row) {
    row = filterZero(row);

    for (let i = 0; i < row.length; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }

    row = filterZero(row);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

// SLIDERS 

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = playground[r];
        row = slide(row);
        playground[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = playground[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = playground[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        playground[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = playground[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [playground[0][c], playground[1][c], playground[2][c], playground[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++) {
            playground[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = playground[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [playground[0][c], playground[1][c], playground[2][c], playground[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        
        for (let r = 0; r < rows; r++) {
            playground[r][c] = row[r];
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            let num = playground[r][c];
            updateTile(tile, num);
        }
    }
}

var playground;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

document.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
        slideLeft();
        setTwo();
    } else if (e.code == 'ArrowRight' || e.code == 'KeyD') {
        slideRight();
        setTwo();
    } else if (e.code == 'ArrowUp' || e.code == 'KeyW') {
        slideUp();
        setTwo();
    } else if (e.code == 'ArrowDown' || e.code == 'KeyS') {
        slideDown();
        setTwo();
    }
    document.getElementById('score').innerText = score;
});