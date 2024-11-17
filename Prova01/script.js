document.addEventListener("DOMContentLoaded", function () {
    const userStatus = document.querySelector(".user-status");
    const userIcon = document.querySelector(".user-icon");

    const username = localStorage.getItem("username");
    if (username) {
        userStatus.textContent = username;
        userIcon.src = "images/login.jpg";
        userIcon.parentElement.href = "form.html";
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const usernameInput = document.getElementById("username").value;
            const passwordInput = document.getElementById("password").value;

            if (usernameInput && passwordInput) {
                localStorage.setItem("username", usernameInput);
                window.location.href = "index.html";
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }

    const preferenciaSelect = document.getElementById('preferencia');
    const labels = document.querySelectorAll('.form-group label');
    const inputs = document.querySelectorAll('.form-group input, .form-group select');

    preferenciaSelect.addEventListener('change', function () {
        if (preferenciaSelect.value === 'custom') {
            labels.forEach(label => {
                label.style.fontFamily = 'Roboto';
            });
            inputs.forEach(input => {
                input.style.backgroundColor = '#e6e6e6';
            });
        } else {
            labels.forEach(label => {
                label.style.fontFamily = '';
            });
            inputs.forEach(input => {
                input.style.backgroundColor = '';
            });
        }
    });

    const form = document.getElementById("formFerrari"); 

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            form.reset();

            alert("Formulário enviado com sucesso!");
        });
    }
});
