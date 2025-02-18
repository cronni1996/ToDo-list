document.addEventListener('DOMContentLoaded', function() {
    async function getPosts() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const posts = await response.json();

            const postsContainer = document.getElementById('posts-container');

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
        <h2>${post.name}</h2>
        <p>${post.username}</p>
        <p>ID: ${post.id}</p>
        <p>${post.email}</p>
        <p>Address: ${post.address.street}, ${post.address.suite}, ${post.address.city}</p>
        <button class="delete-user" data-id="${post.id}">Удалить</button>
    `;
                postsContainer.appendChild(postElement);
            });

        } catch (error) {
            console.error('Ошибка при получении постов:', error);
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = `<p>Произошла ошибка при загрузке постов.</p>`;
        }
    }

    async function createUser(user) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newUser = await response.json();
            console.log('Новый пользователь создан:', newUser);

            // Обнови список пользователей на странице
            getPosts();

        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            alert('Произошла ошибка при создании пользователя.');
        }
    }

    async function deleteUser(userId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Пользователь с ID ${userId} успешно удален`);

            // Обнови список пользователей на странице
            getPosts();

        } catch (error) {
            console.error(`Ошибка при удалении пользователя с ID ${userId}:`, error);
            alert(`Ошибка при удалении пользователя с ID ${userId}.`);
        }
    }

    document.getElementById('posts-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-user')) {
            const userId = event.target.dataset.id;
            deleteUser(userId);
        }
    });

    // Обработчик отправки формы
    document.getElementById('add-user-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        const newUser = {
            name: name,
            username: username,
            email: email
        };

        createUser(newUser);

        // Очищаем поля формы
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    });

    getPosts(); // Вызываем getPosts() при загрузке страницы
});