document.addEventListener("DOMContentLoaded", function() {
    const requestList = document.getElementById("requests");
    let storedRequests = JSON.parse(localStorage.getItem("requests")) || [];

    function renderRequests() {
        requestList.innerHTML = "";

        if (storedRequests.length === 0) {
            requestList.innerHTML = "<p>Заявок пока нет.</p>";
            return;
        }

        storedRequests.forEach((request, index) => {
            const newRequest = document.createElement("div");
            newRequest.innerHTML = `
                <p><strong>Дата создания:</strong> ${request.createdAt}</p>
                <p><strong>Адрес:</strong> ${request.address}</p>
                <p><strong>Контакт:</strong> ${request.contact}</p>
                <p><strong>Дата услуги:</strong> ${request.date} в ${request.time}</p>
                <p><strong>Услуга:</strong> ${request.service}</p>
                <p><strong>Оплата:</strong> ${request.payment}</p>
                <button class="delete-btn" onclick="deleteRequest(${index})">Удалить</button>
                <hr>
            `;
            requestList.appendChild(newRequest);
        });
    }

    window.deleteRequest = function(index) {
        storedRequests.splice(index, 1);
        localStorage.setItem("requests", JSON.stringify(storedRequests));
        renderRequests();
    };

    renderRequests();
});


document.getElementById("request-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const request = {
        address: document.getElementById("address").value,
        contact: document.getElementById("contact").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        service: document.getElementById("service").value,
        payment: document.getElementById("payment").value,
        createdAt: new Date().toLocaleDateString()
    };

    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    storedRequests.push(request);
    localStorage.setItem("requests", JSON.stringify(storedRequests));

    window.location.href = "2.html";
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение формы (перезагрузка страницы)

    // Получаем значения логина и пароля
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Проверяем, если логин и пароль совпадают с нужными значениями
    if (email === 'adminka' && password === 'password') {
        // Если совпадает, перенаправляем на другую страницу
        window.location.href = 'admin.html';
    } else {
        alert('Неверный логин или пароль');
    }
});