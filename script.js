const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('.board');
const colors = ['rgb(180, 236, 49)', 'rgb(243, 202, 19)', 'rgb(243, 127, 19)', 'rgb(243, 19, 19)', 'rgb(19, 198, 243)', 'rgb(19, 79, 243)', 'rgb(161, 19, 243)', 'rgb(243, 19, 213)', 'rgb(112, 238, 160)'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame()
    }
})


board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomeCircle();
    }
})


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomeCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        var current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<hi>Счет: <span class='primary'>${score}</span></h1>`
}

function getRandomColor() {
    const indexColor = Math.floor(Math.random() * colors.length)
    return colors[indexColor];
}

function createRandomeCircle() {
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    const color3 = getRandomColor()
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect()
    // console.log(qqq)
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `linear-gradient(90deg, ${color1} 0%,  ${color2} 47%, ${color3}  100%)`;
    board.append(circle)

}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}