import { validateForm } from '/src/modules/validation.js';

function sendFormData(formData) {
    return fetch('/api/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

const phoneInput = document.querySelector('#phone');
const phoneMask = new IMask(phoneInput, {
    mask: '+{375} (00) 000-00-00'
});

document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach((errorElement) => errorElement.remove());
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach((inputField) => inputField.classList.remove('error'));

    sendFormData({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    });
});

const submitButton = document.querySelector('#submit');
const closeModalButton = document.querySelector('#close-modal');

function toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('active');
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';

    if (modal.classList.contains('active')) {
        document.addEventListener('keydown', closeModalOnEscape);
        document.addEventListener('click', closeModalOnClickOutside);
    } else {
        document.removeEventListener('keydown', closeModalOnEscape);
        document.removeEventListener('click', closeModalOnClickOutside);
    }
}

function closeModalOnEscape(event) {
    if (event.key === 'Escape' && document.querySelector('.modal.active')) {
        toggleModal();
    }
}

function closeModalOnClickOutside(event) {
    if (event.target === document.querySelector('.modal.active')) {
        toggleModal();
    }
}

submitButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);


document.querySelector('#submit').addEventListener('click', function (e) {
    if (!validateForm()) {
        e.preventDefault();
        toggleModal();
    }
});