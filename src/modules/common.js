export function toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('active');
    document.body.style.overflow = modal.classList.contains('active') ? 'hidden' : 'auto';

    if (modal.classList.contains('active')) {
        document.addEventListener('keydown', closeModalOnEscape);
        document.addEventListener('click', closeModalOnClickOutside);
    } else {
        document.removeEventListener('keydown', closeModalOnEscape);
        document.removeEventListener('click', closeModalOnClickOutside);
    }
}

export function closeModalOnEscape(event) {
    if (event.key === 'Escape' && document.querySelector('.modal.active')) {
        toggleModal();
    }
}

export function closeModalOnClickOutside(event) {
    if (event.target === document.querySelector('.modal.active')) {
        toggleModal();
    }
}