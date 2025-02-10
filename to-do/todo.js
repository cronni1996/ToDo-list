document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем элементы
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Функция для сохранения задач в LocalStorage
    function saveTasks() {
        const tasks = [];
        const listItems = taskList.querySelectorAll("li");
        listItems.forEach(function(item) {
            // Находим выпадающий список внутри элемента списка
            const select = item.querySelector("select");
            // Получаем выбранное значение (приоритет)
            const priority = select.value;

            tasks.push({
                text: item.querySelector("span").textContent,
                completed: item.classList.contains("completed"),
                priority: priority // Сохраняем приоритет
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Функция для отображения задач из LocalStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(function(task) {
                const listItem = document.createElement("li");

                // Создаем выпадающий список
                const select = document.createElement("select");
                select.classList.add("priority"); // Добавляем класс для стилизации

                const optionHigh = document.createElement("option");
                optionHigh.value = "high";
                optionHigh.textContent = "Высокий";
                select.appendChild(optionHigh);

                const optionMedium = document.createElement("option");
                optionMedium.value = "medium";
                optionMedium.textContent = "Средний";
                select.appendChild(optionMedium);

                const optionLow = document.createElement("option");
                optionLow.value = "low";
                optionLow.textContent = "Низкий";
                select.appendChild(optionLow);

                // Устанавливаем выбранный приоритет
                select.value = task.priority;

                listItem.appendChild(select);

                // Создаем чекбокс
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;

                // Создаем кнопку "Удалить"
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Удалить";

                // Создаем ссылку "Подробнее"
                const detailsLink = document.createElement("a");
                detailsLink.href = "#"; // Пустая ссылка, чтобы не было перехода
                detailsLink.textContent = "Подробнее";

                // Добавляем обработчик события click на ссылку
                detailsLink.addEventListener("click", function(event) {
                    event.preventDefault(); // Отменяем переход по ссылке
                    event.stopPropagation(); // Останавливаем всплытие события
                    alert("Текст задачи: " + task.text); // Отображаем текст задачи во всплывающем окне
                });

                // Создаем span для текста задачи
                const taskTextSpan = document.createElement("span");
                taskTextSpan.textContent = task.text;

                // Добавляем чекбокс и текст задачи в элемент списка
                listItem.appendChild(checkbox);
                listItem.appendChild(taskTextSpan);
                listItem.appendChild(detailsLink); // Добавляем ссылку в элемент списка
                listItem.appendChild(deleteBtn);

                // Если задача выполнена, добавляем класс "completed"
                if (task.completed) {
                    listItem.classList.add("completed");
                }
                

                // Добавляем обработчики событий для подсветки
                listItem.addEventListener("mouseover", function() {
                    listItem.style.backgroundColor = "#5e4646"; // Изменяем цвет фона при наведении
                });

                listItem.addEventListener("mouseout", function() {
                    listItem.style.backgroundColor = ""; // Возвращаем исходный цвет фона
                });


                // Добавляем новый элемент в список
                taskList.appendChild(listItem);
            });
        }
    }

    // Загружаем задачи из LocalStorage при загрузке страницы
    loadTasks();


    // Делегирование событий
    taskList.addEventListener("click", function(event) {
        console.log("Сработал обработчик на UL!");
        // Если кликнули на чекбокс
        if (event.target.type === "checkbox") {
            // Получаем элемент списка, в котором находится чекбокс
            let listItem = event.target.parentNode;

            // Отмечаем задачу как выполненную/невыполненную
            if (event.target.checked) {
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }

            // Сохраняем изменения в LocalStorage
            saveTasks();
        }

        // Если кликнули на кнопку "Удалить"
        if (event.target.tagName === "BUTTON" && event.target.textContent === "Удалить") {
            // Получаем элемент списка, в котором находится кнопка
            let listItem = event.target.parentNode;

            // Удаляем задачу из списка
            taskList.removeChild(listItem);

            // Сохраняем изменения в LocalStorage
            saveTasks();
        }
    });

    // 2. Добавляем обработчик события на кнопку
    addTaskBtn.addEventListener("click", function() {
        // 3. Получаем текст из текстового поля
        const taskText = taskInput.value.trim();

        // Проверяем, что текст не пустой
        if (taskText !== "") {
            // 4. Создаем новый элемент списка (li)
            const listItem = document.createElement("li");

            // Создаем выпадающий список
            const select = document.createElement("select");
            select.classList.add("priority"); // Добавляем класс для стилизации

            const optionHigh = document.createElement("option");
            optionHigh.value = "high";
            optionHigh.textContent = "Высокий";
            select.appendChild(optionHigh);

            const optionMedium = document.createElement("option");
            optionMedium.value = "medium";
            optionMedium.textContent = "Средний";
            select.appendChild(optionMedium);

            const optionLow = document.createElement("option");
            optionLow.value = "low";
            optionLow.textContent = "Низкий";
            select.appendChild(optionLow);

            listItem.appendChild(select);

            // Создаем чекбокс
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            // Создаем кнопку "Удалить"
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";

            // Создаем ссылку "Подробнее"
            const detailsLink = document.createElement("a");
            detailsLink.href = "#"; // Пустая ссылка, чтобы не было перехода
            detailsLink.textContent = "Подробнее";

            // Добавляем обработчик события click на ссылку
            detailsLink.addEventListener("click", function(event) {
                event.preventDefault(); // Отменяем переход по ссылке
                event.stopPropagation(); // Останавливаем всплытие события
                alert("Текст задачи: " + taskText); // Отображаем текст задачи во всплывающем окне
            });

            // Создаем span для текста задачи
            const taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = taskText;

            // Добавляем чекбокс и текст задачи в элемент списка
            listItem.appendChild(checkbox);
            listItem.appendChild(taskTextSpan);
            listItem.appendChild(detailsLink); // Добавляем ссылку в элемент списка
            listItem.appendChild(deleteBtn);

            // Добавляем обработчики событий для подсветки
            listItem.addEventListener("mouseover", function() {
                listItem.style.backgroundColor = "#5e4646"; // Изменяем цвет фона при наведении
            });

            listItem.addEventListener("mouseout", function() {
                listItem.style.backgroundColor = ""; // Возвращаем исходный цвет фона
            });

            // Добавляем новый элемент в список
            taskList.appendChild(listItem);

            // Очищаем текстовое поле
            taskInput.value = "";

            saveTasks(); // Сохраняем изменения в LocalStorage
        }
    });
});