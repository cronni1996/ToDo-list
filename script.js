
console.log("Красавчик!")


let button = document.getElementById("myButton");
button.addEventListener("click", function() {
    alert("Спасибо за нажатие!");


        let div = document.getElementById("myDiv");
        div.addEventListener("mouseover", function() {
        div.textContent = "Теперь ты навел на меня мышь!";
    });
        div.addEventListener("mouseout", function() {
        div.textContent = "Наведи на меня мышь";
    });

});