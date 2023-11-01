export async function sendFormData(formData) {
    const modal = document.querySelector('.modal');

    try {
        const response = await fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayMessage(data.message, data.fields, data.status === 'success');
        } else {
            throw new Error('Server response was not OK');
        }
    } catch (error) {
        console.log('Ошибка:', error);
        modal.style.display = 'flex';
        const items = modal.querySelector('#items');
        items.textContent = 'Ошибка при отправке формы';
        const item = modal.querySelector('#item');
        item.textContent = 'Произошла ошибка при обращении к серверу';
        modal.classList.add('active');
    }
}

function resetFormFields() {
    const form = document.querySelector('#contact-form');
    form.reset();
}

function displayMessage(message, fields, isSuccess) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    const items = modal.querySelector('#items');
    const item = modal.querySelector('#item');
    const errors = modal.querySelector('#errors');
    const error = modal.querySelector('#error');

    if (isSuccess) {
        items.textContent = 'Спасибо за отправку формы';
        item.textContent = message;
    } else {
        errors.textContent = 'Ошибка при отправке формы';
        error.textContent = message;
    }

    if (!isSuccess && fields) {
        for (const fieldName in fields) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error';
            errorMessage.textContent = fields[fieldName];
            errors.appendChild(errorMessage);
        }
    }

    modal.classList.add('active');

    if (isSuccess) {
        const closeModalButton = modal.querySelector('#close-modal');
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
            modal.classList.remove('active');
            resetFormFields();
        });
    }
}
