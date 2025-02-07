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

                // Добавляем обработчик события change на выпадающий список
                select.addEventListener("change", function() {
                    saveTasks(); // Сохраняем изменения в LocalStorage
                });

                listItem.appendChild(select);

                // Создаем чекбокс
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = task.completed;
                checkbox.addEventListener("change", function() {
                    if (checkbox.checked) {
                        listItem.classList.add("completed");
                    } else {
                        listItem.classList.remove("completed");
                    }
                    saveTasks(); // Сохраняем изменения в LocalStorage
                });

                // Создаем кнопку "Удалить"
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Удалить";
                deleteBtn.addEventListener("click", function() {
                    taskList.removeChild(listItem);
                    saveTasks(); // Сохраняем изменения в LocalStorage
                });

                // Создаем span для текста задачи
                const taskTextSpan = document.createElement("span");
                taskTextSpan.textContent = task.text;

                // Добавляем чекбокс и текст задачи в элемент списка
                listItem.appendChild(checkbox);
                listItem.appendChild(taskTextSpan);
                listItem.appendChild(deleteBtn);

                // Если задача выполнена, добавляем класс "completed"
                if (task.completed) {
                    listItem.classList.add("completed");
                }

                // Добавляем новый элемент в список
                taskList.appendChild(listItem);
            });
        }
    }

    // Загружаем задачи из LocalStorage при загрузке страницы
    loadTasks();

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

            // Добавляем обработчик события change на выпадающий список
            select.addEventListener("change", function() {
                saveTasks(); // Сохраняем изменения в LocalStorage
            });

            listItem.appendChild(select);

            // Создаем чекбокс
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function() {
                if (checkbox.checked) {
                    listItem.classList.add("completed");
                } else {
                    listItem.classList.remove("completed");
                }
                saveTasks(); // Сохраняем изменения в LocalStorage
            });

            // Создаем кнопку "Удалить"
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.addEventListener("click", function() {
                taskList.removeChild(listItem);
                saveTasks(); // Сохраняем изменения в LocalStorage
            });

            // Создаем span для текста задачи
            const taskTextSpan = document.createElement("span");
            taskTextSpan.textContent = taskText;

            // Добавляем чекбокс и текст задачи в элемент списка
            listItem.appendChild(checkbox);
            listItem.appendChild(taskTextSpan);
            listItem.appendChild(deleteBtn);

            // 5. Добавляем новый элемент в список
            taskList.appendChild(listItem);

            // Очищаем текстовое поле
            taskInput.value = "";

            saveTasks(); // Сохраняем изменения в LocalStorage
        }
    });
});