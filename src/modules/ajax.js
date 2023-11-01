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
        console.log(data);
        if (data.status === 'success' || data.status === 'error') {
            console.log(data.message);
            displayMessage(data.message, data.fields, data.status === 'success');
        } else if (data.status === 'error') {
            console.log('Ошибка при отправке формы:');
            console.log(data.fields);
            displayMessage(data.message, data.fields, data.status === 'error');
        }
    } catch (error) {
        console.log('Ошибка:', error);
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

    isSuccess ? (items.textContent = 'Спасибо за отправку формы') : (items.textContent = 'Ошибка при отправке формы');
    // if (isSuccess) {
    //     items.textContent = 'Ошибка при отправке формы';
    // } else {
    //     items.textContent = 'Спасибо за отправку формы';
    // }

    item.textContent = message;

    if (!isSuccess && fields) {
        for (const fieldName in fields) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error';
            errorMessage.textContent = fields[fieldName];
            modal.appendChild(errorMessage);
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

