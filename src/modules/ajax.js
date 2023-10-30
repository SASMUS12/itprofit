export async function sendFormData(formData) {
    try {
        const response = await fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data && data.status === 'success') {
            console.log(data)
            const message = data.message;
            resetFormFields();
            displaySuccessMessage(data.message);
        } else if (data && data.status === 'error') {
            displayErrorMessages(data.fields);
        }
    } catch (error) {
        console.log('Ошибка:', error);
    }
}

function resetFormFields() {
    const form = document.querySelector('#contact-form');
    form.reset();
}

function displaySuccessMessage(message) {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    console.log('message:', message);
    modal.querySelector('#items').textContent = 'Спасибо за отправку формы';
    modal.querySelector('#item').textContent = message;

    modal.classList.add('active');

    const closeModalButton = modal.querySelector('#close-modal');
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.remove('active');
        resetFormFields();
    });
}

function displayErrorMessages(fields) {
    const errorMessages = document.querySelector('#error_messages');
    errorMessages.innerHTML = '';
    for (const fieldName in fields) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error';
        errorMessage.textContent = fields[fieldName];
        errorMessages.appendChild(errorMessage);
    }
}
