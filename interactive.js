document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы
    let heading = document.querySelector("h1");
    let paragraph = document.querySelector("p");
    let button = document.querySelector("button");
    let input = document.getElementById("input"); // Получаем input по ID
    let outputDiv = document.getElementById("output");
    let buttonInput = document.getElementById("buttonInput"); // Получаем buttonInput по ID
    let myDiv = document.getElementById("myDiv"); // Получаем myDiv по ID

    // Обработчик для кнопки "Нажми меня"
    button.addEventListener("click", function() {
        paragraph.textContent = "Кнопка была нажата!";
    });

    // Обработчик для текстового поля
    input.addEventListener("keydown", function(event) {
        outputDiv.textContent = event.target.value;
    });

    // Обработчик для заголовка
    heading.addEventListener("mouseover", function() {
        heading.style.color = "red";
    });

    heading.addEventListener("mouseout", function() {
        heading.style.color = "black";
    });

    // Promise (оставляем как есть, без изменений)
    let поварОбещаетПиццу = new Promise(function(resolve, reject) {
        setTimeout(function() {
            let randomNumber = Math.random();
            let пиГотова = randomNumber > 0.5;
            if (пиГотова) {
                resolve("Пицца готова! Вот она!");
            } else {
                reject("Простите, пицца не получилась :(");
            }
        }, 3000);
    });

    поварОбещаетПиццу
        .then(function(успех) {
            console.log(успех);
        })
        .catch(function(ошибка) {
            console.log(ошибка);
        });

    // Обработчик для кнопки "Создать задачу"
    buttonInput.addEventListener("click", function() {
        // Получаем текст из текстового поля
        let taskText = input.value;

        // Создаем новый элемент (абзац)
        let newTask = document.createElement("p");
        newTask.textContent = taskText; // Устанавливаем текст абзаца

        // Добавляем новый элемент в div
        myDiv.appendChild(newTask);

        // Очищаем текстовое поле
        input.value = "";
    });
});