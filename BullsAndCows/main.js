const start = () => {
    const numberOfDigits = +prompt("Введите количество угадываемых цифр в числе");
    if (
        Number.isNaN(numberOfDigits) ||
     numberOfDigits < 2 ||
     numberOfDigits > 9
     ) {
    alert("Введите число от 2 до 9 включительно");
 start();
 return;
}
 alert("Начнем игру! :)");

 let answer = [];

const digits = [0,1,2,3,4,5,6,7,8,9];

for(let i=0; i< numberOfDigits; i++) 
{
    const number = digits.splice(-getRandomIndex(), 1);

    /* splice -- функция(метод массива) вырезает из массива кусочек(задаём размер) и возвращает его, модифицируя массив 

    При -getRandomIndex() проходимся по массиву с конца, чтобы избежать пустоты в ответе, 
    если бы индекс был больше длины массива 
    */
   answer.push(number);
}

const input = document.getElementById("guess");
const btn = document.getElementById("guess-btn");
const table = document.getElementById("history");

console.log (input, btn, table);

};

const getRandomIndex = () => {
    return +Math.random().toFixed(1) * 10;
}

start();
