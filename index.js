"use strict";
//1. ✅ susikurti masyva
//2. ✅užpildyti masyva
//3. ✅sugeneruoti bombas
//4. suskaičiuoti kaimyninių bombų reikšmes
//5. sukurti eventą kuris tikrintų bombas ir pridėtų taškus arba game over padarytų
let mineField = document.querySelector('.mineField');
let score = document.querySelector('span');
let h1 = document.querySelector('h1');
let grid = [];
for (let i = 0; i < 100; i++) {
    grid[i] = {
        mine: false,
        neighbors: 0
    };
}
;
// make mines
let bombCount = 15;
score.textContent = String(bombCount);
for (let i = 0; i < bombCount;) {
    let nr = Math.floor(Math.random() * 100);
    if (grid[nr].mine === false) {
        grid[nr].mine = true;
        i++;
    }
}
;
//calculate neighbors
for (let i = 0; i < 100; i++) {
    if (i % 10 !== 0) {
        if (grid[i - 1 - 10] && grid[i - 1 - 10].mine === true)
            grid[i].neighbors++;
        if (grid[i - 1] && grid[i - 1].mine === true)
            grid[i].neighbors++;
        if (grid[i - 1 + 10] && grid[i - 1 + 10].mine === true)
            grid[i].neighbors++;
    }
    if ((i + 1) % 10 !== 0) {
        if (grid[i + 1 - 10] && grid[i + 1 - 10].mine === true)
            grid[i].neighbors++;
        if (grid[i + 1] && grid[i + 1].mine === true)
            grid[i].neighbors++;
        if (grid[i + 1 + 10] && grid[i + 1 + 10].mine === true)
            grid[i].neighbors++;
    }
    if (grid[i - 10] && grid[i - 10].mine === true)
        grid[i].neighbors++;
    if (grid[i + 10] && grid[i + 10].mine === true)
        grid[i].neighbors++;
}
;
let defusedGrid = 100 - bombCount;
for (let i = 0; i < 100; i++) {
    let div = document.createElement('div');
    div.classList.add('mine');
    // div.textContent = `${String(i)} ${grid[i].neighbors}`;
    mineField.append(div);
    div.onclick = (e) => {
        if (h1.textContent !== '💥DEATH💥') {
            if (div.textContent !== '💣') {
                if (grid[i].mine) {
                    div.style.backgroundColor = 'darkred';
                    div.textContent = '💥';
                    div.style.fontSize = '73px';
                    div.style.zIndex = '100';
                    h1.innerHTML = '💥DEATH💥';
                }
                if (!grid[i].mine) {
                    if (div.textContent === '')
                        defusedGrid--;
                    div.textContent = String(grid[i].neighbors);
                }
            }
            if (defusedGrid === 0)
                h1.innerHTML = 'VICTORY!!!🎉🎉🎉';
        }
    };
    div.oncontextmenu = (e) => {
        e.preventDefault();
        if (div.textContent === '') {
            div.textContent = '💣';
            score.textContent = String(Number(score.textContent) - 1);
        }
        else if (div.textContent === '💣') {
            div.textContent = '';
            score.textContent = String(Number(score.textContent) + 1);
        }
        if (defusedGrid === 0)
            h1.innerHTML = 'VICTORY!!!🎉🎉🎉';
    };
}
;
