const start = () => {
    alert("Игрок выбирает количество цифр в загаданном числе. Компьютер задумывает число из 0,1,2,...9 размером, указанным пользователем. Игрок делает ходы, чтобы узнать эти цифры и их порядок. 0 может стоять на первом месте. В ответ компьютер показывает число отгаданных цифр, стоящих на своих местах (число быков) и число отгаданных цифр, стоящих не на своих местах (число коров)");
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
    const number = digits.splice(-getRandomIndex(), 1)[0];

    /* splice -- функция(метод массива) вырезает из массива кусочек(задаём размер) и возвращает его, модифицируя массив 

    При -getRandomIndex() проходимся по массиву с конца, чтобы избежать пустоты в ответе, 
    если бы индекс был больше длины массива 
    */
   answer.push(number);
}

const input = document.getElementById("guess");
const btn = document.getElementById("guess-btn");
const table = document.getElementById("history");
const score = document.getElementById("score");
const high_score = document.getElementById("highScore");

let history = [];

const highScore = localStorage.getItem("highScore");

if(highScore) {
high_score.innerText = highScore;
}

let currentScore = 1000 * numberOfDigits;

score.innerText = currentScore;

btn.addEventListener("click", () => {
    if(+input.value.length === +numberOfDigits && 
        input.value.match(/\d/) &&
        checkUnique(+input.value)) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
    const [cows, bulls] =  checkNumbersAlgorithm(answer, [...input.value]); 
    // ... - оператор spread. Если мы хотим получить и последующие значения массива,
    // но не уверены в их числе, то добавляем ещё один "параметр", который получит всё остальное с помощью spread
    
    if(!history.includes(input.value)) {
        if(currentScore > 10*history.length) {
        currentScore = currentScore - 10*history.length;
    }

    score.innerText = currentScore;
        
        history.push(input.value);
    
        td1.innerText = input.value;
        td2.innerText = `${cows} 🐄 ${bulls} 🐮`; // ` - обратная метка
        tr.appendChild(td1);
        tr.appendChild(td2);
        // Создали строку, создали ячейку, в ячейку впихнули value, эту ячейку запихнули в tr
        table.appendChild(tr);

        input.value = "";

    } 
    else {
        alert("Это число уже было использовано. Введите другое, пожалуйста");
    }
}
else {
    alert(`Напишите число из ${numberOfDigits} неповторяющихся чисел!`);
}
    });   
};

const getRandomIndex = () => {
    return +Math.random().toFixed(1) * 10;
};

const checkUnique = (number) => {
    let arr = `${number}`.split("");
    // Метод split() применяется к строке и позволяет разделить ее на подстроки 
    // на основе указанного разделителя. Результат - массив из этих подстрок
    let uniqueSet = [];
    for (let i = 0; i < arr.length; i++) {
            if(uniqueSet.includes(arr[i])) {
             return false;
            }
            uniqueSet.push(arr[i]);
    }
    return true;
};

const checkNumbersAlgorithm = (answer, guess) => {
    let bulls = 0;
    let cows = 0;

    for(let i = 0; i < answer.length; i++) {
      if (+answer[i] === +guess[i]) { 
        // == не отличает 0 от false и пустую строку от false, 
        // поэтому используем строгое равно === (определяет без приведения типов)
        bulls++;
        continue;
      }
      if (answer.includes(+guess[i])) {
        cows++;
      }
    }

    if(bulls === answer.length) {
        const score = document.getElementById("score");
       localStorage.setItem("highScore", +score.innerText);
        alert("Ты победил! Поздравляю! :)");
        location.reload();
    }

    return[cows, bulls];
}

start();
