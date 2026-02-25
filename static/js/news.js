// Función para filtrar noticias en el grid
function filterNews() {
    const query = document.getElementById('newsSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.news-card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        const summary = card.getAttribute('data-summary');

        if (title.includes(query) || summary.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Lógica del Modal (la que ya tenías)
function openNewsModal(title, summary, date, url, image, source) {
    const modal = document.getElementById('newsModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalSummary').innerText = summary;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalSource').innerText = source || 'FINANCIAL SOURCE';
    document.getElementById('modalUrl').href = url;
    document.getElementById('modalImage').style.backgroundImage = `url('${image}')`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
    document.getElementById('newsModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar si el usuario hace clic fuera del contenido blanco del modal
window.onclick = function(event) {
    const modal = document.getElementById('newsModal');
    if (event.target == modal) {
        closeNewsModal();
    }
}