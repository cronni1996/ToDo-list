document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы
    let button = document.getElementById("myButton");
    let input = document.getElementById("myInput");
    let link = document.getElementById("myLink");
    let div = document.getElementById("myDiv");

    // Обработчик для кнопки (click)
    button.addEventListener("click", function(event) {
        console.log("Событие: click");
        console.log("Тип события: " + event.type);
        console.log("Целевой элемент: " + event.target);
        console.log("Координаты мыши (clientX, clientY): " + event.clientX + ", " + event.clientY);
    });

    // Обработчик для текстового поля (keydown)
    input.addEventListener("keydown", function(event) {
        console.log("Событие: keydown");
        console.log("Нажатая клавиша: " + event.key);
        console.log("Код клавиши: " + event.code);
    });

    // Обработчик для ссылки (click)
    link.addEventListener("click", function(event) {
        console.log("Событие: click (ссылка)");
        console.log("Тип события: " + event.type);
        event.preventDefault(); // Отменяем переход по ссылке
        console.log("Переход по ссылке отменен!");
    });

    // Обработчик для div (mouseover)
    div.addEventListener("mouseover", function(event) {
        console.log("Событие: mouseover");
        console.log("Элемент, на который наведена мышь: " + event.target);
    });

    // Обработчик для div (mouseout)
    div.addEventListener("mouseout", function(event) {
        console.log("Событие: mouseout");
        console.log("Элемент, с которого убрана мышь: " + event.target);
    });
});


const p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log = ('Preparing data...')
        const ggg =
            {
                day: 'dddd',
                tea: 'green'
            }
        resolve(ggg)
    }, 2000)
})
p.then((data)=>{
    console.log(data);
})