document.addEventListener("DOMContentLoaded", function() {
    // 1. Получаем элементы
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Имитация сохранения задач на сервере
    async function saveTasksToServer(tasks) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
                const success = true; // Можно менять на false для тестов
                if (success) {
                    resolve(); // Успешно сохранено
                } else {
                    reject("Ошибка сохранения задач");
                }

            }, 500); // Имитация задержки 500мс
        });
    }

    // Имитация загрузки задач с сервера
    async function loadTasksFromServer() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const success = true; // Можно менять на false для тестов
                if (success) {
                    resolve(tasks); // Успешно загружено
                } else {
                    reject("Ошибка загрузки задач");
                }
            }, 500); // Имитация задержки 500мс
        });
    }

    // Функция для сохранения задач (теперь асинхронная)
    async function saveTasks() {
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

        try {
            await saveTasksToServer(tasks);
            console.log("Задачи успешно сохранены на сервере");
        } catch (error) {
            console.error("Ошибка при сохранении задач:", error);
            alert("Ошибка при сохранении задач!"); // Сообщаем пользователю об ошибке
        }
    }

    // Функция для отображения задач из (теперь асинхронная)
    async function loadTasks() {
        taskList.innerHTML = "";
        try {
            const tasks = await loadTasksFromServer();

            if (tasks) {
                tasks.forEach(function(task) {
                    const listItem = createTaskElement(task.text, task.completed, task.priority);
                    taskList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
            alert("Ошибка при загрузке задач!"); // Сообщаем пользователю об ошибке
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
        select.appendChild(optionLow);

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


    // Загружаем задачи  при загрузке страницы
    loadTasks();


    // Делегирование событий
    taskList.addEventListener("click", async function(event) {
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

            // Сохраняем изменения
            await saveTasks();
        }

        // Если кликнули на кнопку "Удалить"
        if (event.target.tagName === "BUTTON" && event.target.textContent === "Удалить") {
            // Получаем элемент списка, в котором находится кнопка
            let listItem = event.target.parentNode;

            // Удаляем задачу из списка
            taskList.removeChild(listItem);

            // Сохраняем изменения
            await saveTasks();
        }
    });

    // 2. Добавляем обработчик события на кнопку
    addTaskBtn.addEventListener("click", async function() {
        // 3. Получаем текст из текстового поля
        const taskText = taskInput.value.trim();

        // Проверяем, что текст не пустой
        if (taskText !== "") {
            // 1. Получаем текущий список задач
            let tasks = await loadTasksFromServer() || [];

            // 2. Создаем объект с данными о новой задаче
            const newTask = {
                text: taskText,
                completed: false,
                priority: "medium" // Или любое другое значение по умолчанию
            };

            // 3. Добавляем новую задачу в список задач
            tasks.push(newTask);

            try {
                // 4. Сохраняем обновленный список задач
                await saveTasksToServer(tasks);

                // 5. Создаем элемент списка для новой задачи и добавляем его на страницу
                //  const listItem = createTaskElement(taskText, false, "medium");
                // taskList.appendChild(listItem);

                // 6. Вызываем loadTasks(), чтобы обновить список задач
                await loadTasks();

                // Очищаем текстовое поле
                taskInput.value = "";
            } catch (error) {
                console.error("Ошибка при добавлении задачи:", error);
                alert("Ошибка при добавлении задачи!");
            }
        }
    });
});