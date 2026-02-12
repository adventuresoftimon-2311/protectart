document.addEventListener('DOMContentLoaded', () => {
    const panes = document.querySelectorAll('.pane');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    const contentData = JSON.parse(document.getElementById('content-data').textContent);

    function openModal(id) {
        const data = contentData[id];
        if (!data) return;

        modalBody.innerHTML = `
            <h2>${data.title}</h2>
            ${data.content}
        `;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    panes.forEach(pane => {
        pane.addEventListener('click', () => {
            const id = pane.getAttribute('data-id');
            openModal(id);
        });
    });

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
