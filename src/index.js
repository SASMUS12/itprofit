import { validateForm } from '../src/modules/validation.js';
import { sendFormData } from '../src/modules/ajax.js';
import { toggleModal } from '../src/modules/common.js';

const phoneInput = document.querySelector('#phone');
const phoneMask = new IMask(phoneInput, {
    mask: '+{375} (00) 000-00-00',
});

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.querySelector('#phone');
    const phoneMask = new IMask(phoneInput, {
        mask: '+{375} (00) 000-00-00'
    });
});

const submitButton = document.querySelector('#submit');

const contactForm = document.querySelector('#contact-form');
const errorMessages = document.querySelector('#error_messages');

contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);

    if (!validateForm()) {
        return;
    }

    try {
        const response = await sendFormData({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
        });

        if (response.status === 'success') {
            toggleModal();
            errorMessages.innerHTML = '';
        } else if (response.status === 'error') {
            errorMessages.innerHTML = '';
            for (const fieldName in response.fields) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error';
                errorMessage.textContent = response.fields[fieldName];
                errorMessages.appendChild(errorMessage);
            }
        }
    } catch (error) {
        console.log('Ошибка:', error);
    }
});

submitButton.addEventListener('click', toggleModal);
document.querySelector('#close-modal').addEventListener('click', toggleModal);
