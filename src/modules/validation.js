export function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

export function validateForm() {
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const phoneField = document.querySelector('#phone');
    const messageField = document.querySelector('#message');
    const errorMessages = document.querySelector('#error_messages');

    errorMessages.innerHTML = '';

    let isValid = true;

    if (nameField.value.trim() === '') {
        isValid = false;
        nameField.style.border = '1px solid red';
        errorMessages.innerHTML += '<p>Поле "Имя" обязательно к заполнению</p>';
    } else {
        nameField.style.border = '1px solid #ccc';
    }

    if (emailField.value.trim() === '') {
        isValid = false;
        emailField.style.border = '1px solid red';
        errorMessages.innerHTML += '<p>Поле "Email" обязательно к заполнению</p>';
    } else if (!validateEmail(emailField.value)) {
        isValid = false;
        emailField.style.border = '1px solid red';
        errorMessages.innerHTML += '<p>Поле "Email" содержит некорректный адрес электронной почты</p>';
    } else {
        emailField.style.border = '1px solid #ccc';
    }

    if (phoneField.value.trim() === '') {
        isValid = false;
        phoneField.style.border = '1px solid red';
        errorMessages.innerHTML += '<p>Поле "Телефон" обязательно к заполнению</p>';
    } else {
        phoneField.style.border = '1px solid #ccc';
    }

    if (messageField.value.trim() === '') {
        isValid = false;
        messageField.style.border = '1px solid red';
        errorMessages.innerHTML += '<p>Поле "Сообщение" обязательно к заполнению</p>';
    } else {
        messageField.style.border = '1px solid #ccc';
    }

    return isValid;
}


