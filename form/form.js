document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем доступ к форме
    const form = document.getElementById("myForm");

    // 2. Перехватываем событие submit
    form.addEventListener("submit", function(event) {
        // 3. Предотвращаем отправку формы по умолчанию
        event.preventDefault();

        // Сбрасываем все сообщения об ошибках
        const errorMessages = form.querySelectorAll(".error-message");
        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = "";
            errorMessage.style.display = "none";
        });

        // 4. Получаем значения элементов формы
        const name = form.elements.name.value;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
        const message = form.elements.message.value;
        const agree = form.elements.agree.checked;

        // 5. Создаем собственные правила валидации
        let isValid = true; // Флаг, который указывает, прошла ли форма валидацию

        // Валидация имени
        const validName = /^[a-zA-Zа-яА-Я\s]+$/;
        if (!validName.test(name)) {
            isValid = false;
            const nameError = document.querySelector('#name + .error-message');
            nameError.textContent = "Имя может содержать только буквы и пробелы.";
            nameError.style.display = "block";
        }

        // Валидация пароля
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            isValid = false;
            const passwordError = document.querySelector('#password + .error-message');
            passwordError.textContent = "Пароль должен содержать как минимум 8 символов, одну заглавную букву, одну строчную букву и одну цифру.";
            passwordError.style.display = "block";
        }

        // Валидация согласия с условиями
        if (!agree) {
            isValid = false;
            const agreeError = document.querySelector('#agree + .error-message');
            agreeError.textContent = "Вы должны согласиться с условиями.";
            agreeError.style.display = "block";
        }

        // 7. Если есть ошибки валидации, предотвращаем отправку формы
        if (!isValid) {
            return; // Выходим из обработчика события submit
        }

        // 8. Выводим полученные значения в консоль
        console.log("Имя: " + name);
        console.log("Email: " + email);
        console.log("Пароль: " + password);
        console.log("Сообщение: " + message);
        console.log("Согласен с условиями: " + agree);

        // 9. Здесь можно добавить код для отправки данных на сервер (позже)
        alert("Форма отправлена!"); // Пока что просто выводим сообщение об успешной отправке
    });

    // Скрываем сообщения об ошибках при вводе данных
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            const errorElement = document.querySelector("#" + input.id + " + .error-message");
            if (errorElement) {
                errorElement.style.display = "none";
            }
        });
    });
});