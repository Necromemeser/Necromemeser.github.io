let submitButton = document.getElementById("submit-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";
let container = document.getElementById("captcha_container");

//Генератор текста
const textGenerator = () => {
  let generatedText = "";

  for (let i = 0; i < 2; i++) {
    //65-90 - заглавные буквы
    generatedText += String.fromCharCode(randomNumber(65, 90));
    //97-122 - прописные буквы
    generatedText += String.fromCharCode(randomNumber(97, 122));
    //48-57 - цифры
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
};

//Сгенерировать номер
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//Отрисовка на холсте
function drawStringOnCanvas(string) {
  //getContext() возвращает функции для рисования на холсте
  let ctx = canvas.getContext("2d");
  //Очистить холст
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //массив цветов для текста
  const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
  //Расстояние между буквами
  const letterSpace = 150 / string.length;

  for (let i = 0; i < string.length; i++) {
    //Задать начальное положение на холсте по оси х
    const xInitialSpace = 25;
    //Устанавить шрифт для элемента на холсте
    ctx.font = "20px Roboto Mono";
    //Установить цвет текста
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}

function triggerFunction() {
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  //Рандомизируем текст, чтобы каждый раз последовательность цифр и букв была случайнойы
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringOnCanvas(text);
}

//Вызываем triggerFunction для кнопки обновления капчи
reloadButton.addEventListener("click", triggerFunction);

//Вызываем triggerFunction, когда страница загружается
window.onload = () => triggerFunction();

//Когда пользователь нажимает на ОТПРАВИТЬ
submitButton.addEventListener("click", () => {
  //Проверяем, ввел ли пользователь то, что надо
  if (userInput.value === text) {
    alert("А, человек! Проходи!");
    container.style.display = 'none';
  } else {
    alert("Я начинаю подозревать, что с тобой что-то не так. Попробуй-ка еще раз...");
    triggerFunction();
  }
});