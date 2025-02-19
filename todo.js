document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const notification = document.getElementById("notification");

    // --- Функции для работы с "сервером" (localStorage) ---
    async function saveTasksToServer(tasks) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                localStorage.setItem("tasks", JSON.stringify(tasks));
                const success = true;
                if (success) {
                    resolve();
                } else {
                    reject("Ошибка сохранения задач");
                }
            }, 100);
        });
    }

    async function loadTasksFromServer() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
                const success = true;
                if (success) {
                    resolve(tasks);
                } else {
                    reject("Ошибка загрузки задач");
                }
            }, 100);
        });
    }

    // --- Функции для работы с данными ---
    async function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll("li")).map(item => {
            const select = item.querySelector(".priority-select");
            const priority = select ? select.value : "medium";

            const checkbox = item.querySelector('input[type="checkbox"]');
            return {
                text: item.querySelector("span").textContent,
                completed: checkbox.checked,
                priority: priority,
                createdAt: item.dataset.createdAt // Получаем дату создания из data-атрибута
            };
        });

        try {
            await saveTasksToServer(tasks);
            showNotification("Задачи успешно сохранены", "success");
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            showNotification("Ошибка сохранения задач!", "error");
        }
    }

    async function loadTasks() {
        try {
            const tasks = await loadTasksFromServer();
            taskList.innerHTML = ""; // Очищаем список
            tasks.forEach(task => {
                const listItem = createTaskElement(task.text, task.completed, task.priority, task.createdAt); // Передаем дату создания
                taskList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            showNotification("Ошибка загрузки задач!", "error");
        }
    }

    // --- Функция для создания элемента задачи ---
    function createTaskElement(text, completed, priority, createdAt) {
        const listItem = document.createElement("li");

        const select = createPrioritySelect(priority); // Создаем выпадающий список
        const checkbox = createCheckbox(completed);
        const deleteBtn = createDeleteButton(listItem);
        const detailsLink = createDetailsLink(text, createdAt); // Передаем дату создания
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = text;

        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(detailsLink);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(select); // Добавляем выпадающий список

        listItem.addEventListener("mouseover", () => listItem.style.backgroundColor = "#5e4646");
        listItem.addEventListener("mouseout", () => listItem.style.backgroundColor = "");

        if (completed) {
            listItem.classList.add("completed");
        }

        listItem.dataset.createdAt = createdAt; // Сохраняем дату создания в data-атрибуте

        return listItem;
    }

    // --- Вспомогательные функции для создания элементов ---

    // Функция для создания выпадающего списка приоритетов
    function createPrioritySelect(priority) {
        const select = document.createElement("select");
        select.classList.add("priority-select");
        const priorities = [{
            value: "high",
            text: "Высокий"
        }, {
            value: "medium",
            text: "Средний"
        }, {
            value: "low",
            text: "Низкий"
        }];
        priorities.forEach(p => {
            const option = document.createElement("option");
            option.value = p.value;
            option.textContent = p.text;
            select.appendChild(option);
        });
        select.value = priority;
        select.addEventListener("change", saveTasks);
        return select;
    }

    function createCheckbox(completed) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", saveTasks);
        return checkbox;
    }

    function createDeleteButton(listItem) {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.addEventListener("click", () => {
            listItem.remove();
            saveTasks();
        });
        return deleteBtn;
    }

    function createDetailsLink(text, createdAt) {
        const detailsLink = document.createElement("a");
        detailsLink.href = "#";
        detailsLink.textContent = "Подробнее";
        detailsLink.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const formattedDate = new Date(createdAt).toLocaleString(); // Форматируем дату
            showNotification(`Текст задачи: ${text}. Дата создания: ${formattedDate}`, "info"); // Добавляем дату в уведомление
        });
        return detailsLink;
    }

    // --- Функция для отображения уведомлений (самописная) ---
    function showNotification(message, type = "success") {
        notification.textContent = message;
        notification.className = "notification " + type; // Reset class and add type
        notification.classList.add("show"); // Add the show class

        // Hide the notification after a few seconds
        setTimeout(() => {
            notification.classList.remove("show");
        }, 5000); // Увеличиваем время до 5 секунд
    }

    // --- Добавление задачи при нажатии Enter ---
    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    async function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            try {
                const tasks = await loadTasksFromServer() || [];
                const now = new Date().toISOString(); // Получаем текущую дату и время в формате ISO
                const newTask = {
                    text: taskText,
                    completed: false,
                    priority: "medium",
                    createdAt: now // Сохраняем дату создания
                };
                tasks.push(newTask);
                await saveTasksToServer(tasks);
                await loadTasks();
                taskInput.value = "";
                showNotification("Задача добавлена!", "success");
            } catch (error) {
                console.error("Ошибка добавления:", error);
                showNotification("Ошибка добавления задачи!", "error");
            }
        }
    }

    // --- Обработчики событий ---
    addTaskBtn.addEventListener("click", async () => {
        addTask();
    });

    // Упрощенное делегирование событий
    taskList.addEventListener("change", async (event) => {
        if (event.target.type === "checkbox") {
            const listItem = event.target.parentNode;
            listItem.classList.toggle("completed", event.target.checked);
            await saveTasks();
        }
    });

    taskList.addEventListener("click", async (event) => {
        if (event.target.tagName === "BUTTON" && event.target.textContent === "Удалить") {
            event.target.parentNode.remove();
            await saveTasks();
        }
    });

    // --- Загрузка задач при загрузке страницы ---
    loadTasks();
});