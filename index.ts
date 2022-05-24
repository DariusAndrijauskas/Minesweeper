interface gridElement {
    mine: boolean,
        neighbors: number
};
let mineField = document.querySelector('.mineField') as HTMLElement;
let score = document.querySelector('span') as HTMLElement;
let h1 = document.querySelector('h1') as HTMLElement;
let grid: gridElement[] = [];
let bombCount = 15;
let defusedGrid: number = 100 - bombCount;
for (let i = 0; i < 100; i++) {
    grid[i] = {
        mine: false,
        neighbors: 0
    };
};
// make mines
score.textContent = String(bombCount);
for (let i = 0; i < bombCount;) {
    let nr = Math.floor(Math.random() * 100);
    if (grid[nr].mine === false) {
        grid[nr].mine = true;
        i++;
    };
};
//calculate neighbors
for (let i = 0; i < 100; i++) {
    if (i % 10 !== 0) {
        if (grid[i - 1 - 10] && grid[i - 1 - 10].mine === true) grid[i].neighbors++;
        if (grid[i - 1] && grid[i - 1].mine === true) grid[i].neighbors++;
        if (grid[i - 1 + 10] && grid[i - 1 + 10].mine === true) grid[i].neighbors++;
    };
    if ((i + 1) % 10 !== 0) {
        if (grid[i + 1 - 10] && grid[i + 1 - 10].mine === true) grid[i].neighbors++;
        if (grid[i + 1] && grid[i + 1].mine === true) grid[i].neighbors++;
        if (grid[i + 1 + 10] && grid[i + 1 + 10].mine === true) grid[i].neighbors++;
    };
    if (grid[i - 10] && grid[i - 10].mine === true) grid[i].neighbors++;
    if (grid[i + 10] && grid[i + 10].mine === true) grid[i].neighbors++;
};
for (let i = 0; i < 100; i++) {
    let div = document.createElement('div');
    div.classList.add('mine');
    mineField.append(div);
    div.onclick = (e: any) => {
        if (h1.textContent !== '💥DEATH💥') {
            if (div.textContent !== '💣') {
                if (grid[i].mine) {
                    div.style.backgroundColor = 'darkred';
                    div.textContent = '💥';
                    div.style.fontSize = '73px';
                    div.style.zIndex = '100';
                    h1.innerHTML = '💥DEATH💥';
                };
                if (!grid[i].mine) {
                    if (div.textContent === '') defusedGrid--;
                    div.textContent = String(grid[i].neighbors);
                };
            };
            if (defusedGrid === 0) h1.innerHTML = 'VICTORY!!!🎉🎉🎉';
        };
    };
    div.oncontextmenu = (e: any) => {
        e.preventDefault();
        if (div.textContent === '') {
            div.textContent = '💣';
            score.textContent = String(Number(score.textContent) - 1);
        } else if (div.textContent === '💣') {
            div.textContent = '';
            score.textContent = String(Number(score.textContent) + 1);
        };
        if (defusedGrid === 0) h1.innerHTML = 'VICTORY!!!🎉🎉🎉';
    };
};