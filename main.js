const carContainer = document.querySelector('.carContainer');
let position = 0; // Позиція машинки
let speedy = 5;  // Початкова швидкість руху
let keys = {};    // Стан натиснутих клавіш

// Оновлення позиції
function updatePosition() {
  if (keys['a'] || keys['ArrowLeft']) {
    position = Math.max(0, position - speedy); // Ліва межа
  }
  if (keys['d'] || keys['ArrowRight']) {
    position = Math.min(window.innerWidth - 120, position + speedy); // Права межа
  }
  carContainer.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(updatePosition);
}

// Відслідковування натискання клавіш
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;

  // Збільшення/зменшення швидкості
  if (e.key === 'ArrowUp') {
    speedy = Math.min(30, speedy + 10); // Збільшуємо швидкість, максимум 30
  }
  if (e.key === 'ArrowDown') {
    speedy = Math.max(10, speedy - 10); // Зменшуємо швидкість, мінімум 10
  }
});

// Відслідковування відпускання клавіш
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Запуск анімації
updatePosition();



let lightStatus = false;
$('#lightControll').click(function () {
    if (lightStatus == false) {
        $('.frontLignt').css('opacity', 1);
        $('.backLight').css('opacity', 1);
        lightStatus = true;
    } else {
        $('.frontLignt').css('opacity', 0);
        $('.backLight').css('opacity', 0);
        lightStatus = false;
    }
})


$('#driver').click(function(){
  $('.driver').css('opacity',1)
})




let block1 = document.getElementById('backwheel1');
let block2 = document.getElementById('frontwheel2');
let rotationAngle1 = 0;
let rotationAngle2 = 0;
let speede = 10;  // Початкова швидкість обертання
let isRotatingLeft = false;
let isRotatingRight = false;

// Функція для обертання блоків
function rotate() {
    if (isRotatingLeft) {
        rotationAngle1 -= speede; // Обертання першого блоку вліво
        rotationAngle2 -= speede; // Обертання другого блоку вліво
    }
    if (isRotatingRight) {
        rotationAngle1 += speede; // Обертання першого блоку вправо
        rotationAngle2 += speede; // Обертання другого блоку вправо
    }

    block1.style.transform = `rotate(${rotationAngle1}deg)`;
    block2.style.transform = `rotate(${rotationAngle2}deg)`;
}

// Слухаємо натискання клавіш
document.addEventListener('keydown', (event) => {
    if (event.key === 'a') {
        isRotatingLeft = true; // Починаємо обертати вліво
    }
    if (event.key === 'd') {
        isRotatingRight = true; // Починаємо обертати вправо
    }
    if (event.key === 'ArrowUp') {
       speede = Math.min(10, speede += 10); // Збільшуємо швидкість при натисканні на стрілку вгору
    }
    if (event.key === 'ArrowDown') {
        speede = Math.max(10, speede - 10); // Зменшуємо швидкість при натисканні на стрілку вниз (мінімум 1)
    }
});

// Слухаємо відпускання клавіші
document.addEventListener('keyup', (event) => {
    if (event.key === 'a') {
        isRotatingLeft = false; // Припиняємо обертати вліво
    }
    if (event.key === 'd') {
        isRotatingRight = false; // Припиняємо обертати вправо
    }
});

// Постійно обертати блоки
function animate() {
    rotate();
    requestAnimationFrame(animate); // Викликає функцію на кожному кадрі
}

animate(); // Запуск анімації



const ruchka = document.querySelector('.ruchka');
let positions = 0;
const maxPosition = 110; // Максимальна позиція
const minPosition = 0;   // Мінімальна позиція

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        positions += 55; // Переміщаємо вправо
        if (positions > maxPosition) {
            positions = maxPosition; // Обмежуємо праву межу
        }
    } 
    if (e.key === 'ArrowDown') {
        positions -= 55; // Переміщаємо вліво
        if (positions < minPosition) {
            positions = minPosition; // Обмежуємо ліву межу
        }
    }
    ruchka.style.left = positions + 'px'; // Оновлюємо позицію
});






const block = document.querySelector('.carContainer');
const background = document.querySelector('.road');

let blockPosition = 0; // Позиція блоку
let isInCenter = false; // Чи зафіксований блок у центрі
let backgroundOffset = 0; // Початкова позиція фону
let speed = 10; // Початкова швидкість
const maxSpeed = 50; // Максимальна швидкість
const minSpeed = 10; // Мінімальна швидкість
let speedBoostCount = 0; // Лічильник для підвищення швидкості
const roadWidth = 2000; // Довжина дороги
const screenWidth = window.innerWidth; // Ширина екрану
const blockWidth = 100; // Ширина блоку

document.addEventListener('keydown', (e) => {
    // Якщо натиснута стрілочка вгору, збільшуємо швидкість
    if (e.key === 'ArrowUp') {
        if (speedBoostCount < 2) {
            speed += 15; // Збільшуємо швидкість
            speedBoostCount++; // Інкрементуємо лічильник підвищення швидкості
        }
    }

    // Перевірка, щоб швидкість не перевищувала максимальну
    if (speed > maxSpeed) {
        speed = maxSpeed;
    }

    // Якщо блок ще не в центрі
    if (!isInCenter) {
        if (e.key === 'a' || e.key === 'A') {
            blockPosition -= speed; // Рух вліво
        } else if (e.key === 'd' || e.key === 'D') {
            blockPosition += speed; // Рух вправо
        }

        // Оновлення позиції блоку
        block.style.transform = `translateX(${blockPosition}px) translateY(-50%)`;

        // Перевірка: якщо блок досягає центру
        if (Math.abs(blockPosition) >= screenWidth / 2 - blockWidth / 2) {
            isInCenter = true; // Блок у центрі
        }
    }

    // Якщо блок у центрі, рухаємо фон
    if (isInCenter) {
        if (e.key === 'a' || e.key === 'A') {
            backgroundOffset += speed; // Рухаємо фон вправо
        } else if (e.key === 'd' || e.key === 'D') {
            backgroundOffset -= speed; // Рухаємо фон вліво
        }

        // Оновлюємо фон
        background.style.transform = `translateX(${backgroundOffset}px)`;
    }

    // Перевірка, щоб блок не виходив за межі дороги
    if (blockPosition < 0) {
        blockPosition = 0; // Ліва межа
    } else if (blockPosition > roadWidth - blockWidth) {
        blockPosition = roadWidth - blockWidth; // Права межа
    }

    // Обмеження фону
    if (backgroundOffset < -(roadWidth - screenWidth)) {
        backgroundOffset = -(roadWidth - screenWidth); // Ліва межа фону
    } else if (backgroundOffset > 0) {
        backgroundOffset = 0; // Права межа фону
    }
});
