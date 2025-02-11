document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем элементы
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Функция для сохранения задач в LocalStorage
    function saveTasks() {
        let tasks = [];

        const listItems = taskList.querySelectorAll("li");

        listItems.forEach(function(item) {
            const select = item.querySelector("select");
            const priority = select.value;

            const checkbox = item.querySelector('input[type="checkbox"]');
            const completed = checkbox.checked;

            tasks.push({
                text: item.querySelector("span").textContent,
                completed: completed,
                priority: priority
            });
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Функция для отображения задач из LocalStorage
    function loadTasks() {
        taskList.innerHTML = "";
        const tasks = JSON.parse(localStorage.getItem("tasks"));

        if (tasks) {
            tasks.forEach(function(task) {
                const listItem = createTaskElement(task.text, task.completed, task.priority);
                taskList.appendChild(listItem);
            });
        }
    }

    function createTaskElement(text, completed, priority) {
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

        select.value = priority;
        select.addEventListener("change", saveTasks);

        // Создаем чекбокс
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", saveTasks);

        // Создаем кнопку "Удалить"
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", function() {
            taskList.removeChild(listItem);
            saveTasks();
        });

        // Создаем ссылку "Подробнее"
        const detailsLink = document.createElement("a");
        detailsLink.href = "#";
        detailsLink.textContent = "Подробнее";
        detailsLink.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            alert("Текст задачи: " + text);
        });

        // Создаем span для текста задачи
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = text;

        // Собираем все элементы в задачу
        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(detailsLink);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(select);

        // Обработчики событий для подсветки
        listItem.addEventListener("mouseover", function() {
            listItem.style.backgroundColor = "#5e4646";
        });

        listItem.addEventListener("mouseout", function() {
            listItem.style.backgroundColor = "";
        });


        if (completed) {
            listItem.classList.add("completed");
        }

        return listItem
    }


    // Загружаем задачи из LocalStorage при загрузке страницы
    loadTasks();


    // Делегирование событий
    taskList.addEventListener("click", function(event) {
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
            // Отображаем сообщение о загрузке
            taskList.textContent = "Добавление задачи...";

            // Имитируем задержку ответа от сервера
            setTimeout(function() {
                // Убираем сообщение о загрузке
                taskList.textContent = "";

                // 1. Получаем текущий список задач из LocalStorage
                let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

                // 2. Создаем объект с данными о новой задаче
                const newTask = {
                    text: taskText,
                    completed: false,
                    priority: "medium" // Или любое другое значение по умолчанию
                };

                // 3. Добавляем новую задачу в список задач
                tasks.push(newTask);

                // 4. Сохраняем обновленный список задач в LocalStorage
                localStorage.setItem("tasks", JSON.stringify(tasks));

                // 5. Создаем элемент списка для новой задачи и добавляем его на страницу
                //  const listItem = createTaskElement(taskText, false, "medium");
                // taskList.appendChild(listItem);

                // 6. Вызываем loadTasks(), чтобы обновить список задач
                loadTasks();

                // Очищаем текстовое поле
                taskInput.value = "";
            }, 200); // 2000 миллисекунд = 2 секунды
        }
    });
});