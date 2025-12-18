// Datos de las imágenes mejoradas
const images = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        title: 'Montañas Cibernéticas',
        category: 'naturaleza',
        description: 'Paisaje montañoso con efectos de luz neón simulando auroras digitales'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
        title: 'Metrópolis Futurista',
        category: 'ciudad',
        description: 'Rascacielos holográficos en una ciudad del año 2077'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        title: 'Red Neuronal',
        category: 'tecnologia',
        description: 'Representación visual de inteligencia artificial y redes neuronales'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
        title: 'Cyborg Retrato',
        category: 'personas',
        description: 'Retrato con elementos tecnológicos integrados en la fisonomía humana'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
        title: 'Bosque Digital',
        category: 'naturaleza',
        description: 'Vegetación bioluminiscente en un ecosistema sintético'
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
        title: 'Neo-Tokyo',
        category: 'ciudad',
        description: 'Megaciudad asiática con pantallas holográficas y transporte aéreo'
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        title: 'Quantum Processors',
        category: 'tecnologia',
        description: 'Procesadores cuánticos con refrigeración por partículas subatómicas'
    },
    {
        id: 8,
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
        title: 'Equipo Holográfico',
        category: 'personas',
        description: 'Reunión de trabajo con proyecciones holográficas y interfaces gestuales'
    },
    {
        id: 9,
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
        title: 'Nebulosa Artificial',
        category: 'naturaleza',
        description: 'Creación atmosférica con partículas luminiscentes controladas por IA'
    },
    {
        id: 10,
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80',
        title: 'Arquitectura Orgánica',
        category: 'ciudad',
        description: 'Edificios con estructura biomimética y materiales autorreparables'
    }
];

// Variables globales
let currentFilter = 'all';
let currentView = 'grid';
let currentLightboxIndex = 0;
let filteredImages = [...images];

// Elementos del DOM
const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const viewBtns = document.querySelectorAll('.view-btn');
const imageCount = document.getElementById('imageCount');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxDescription = document.getElementById('lightboxDescription');
const particlesContainer = document.getElementById('particles');

// Crear partículas para el fondo
function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Color aleatorio entre los colores del tema
        const colors = ['#00d4ff', '#8a2be2', '#ff00ff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Valores de animación aleatorios
        const moveX = Math.random() * 100 - 50;
        const moveY = Math.random() * 100 - 50;
        const duration = Math.random() * 20 + 10;
        
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Renderizar galería con efecto de aparición
 */
function renderGallery(imagesToRender = images) {
    // Mostrar estado de carga
    gallery.innerHTML = '<div class="loading"><i class="fas fa-sync fa-spin"></i> Cargando galería...</div>';
    
    // Simular carga con setTimeout para mejor UX
    setTimeout(() => {
        // Limpiar galería
        gallery.innerHTML = '';
        
        if (imagesToRender.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.cssText = `
                grid-column: 1 / -1;
                text-align: center;
                padding: 4rem;
                background: var(--glass-bg);
                border-radius: 20px;
                border: 1px solid var(--glass-border);
            `;
            emptyMessage.innerHTML = `
                <i class="fas fa-search" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--light); margin-bottom: 1rem;">No se encontraron imágenes</h3>
                <p style="color: rgba(240, 248, 255, 0.7);">Intenta con otros filtros o términos de búsqueda</p>
            `;
            gallery.appendChild(emptyMessage);
            imageCount.textContent = '0';
            return;
        }
        
        // Crear elementos para cada imagen con animación escalonada
        imagesToRender.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.id = image.id;
            item.dataset.index = index;
            item.dataset.category = image.category;
            
            // Añadir retraso para animación escalonada
            item.style.animationDelay = `${index * 0.05}s`;
            
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="gallery-info">
                    <span class="gallery-category">${image.category.toUpperCase()}</span>
                    <h3>${image.title}</h3>
                    <p class="gallery-description">${image.description}</p>
                </div>
            `;
            
            // Event listener para abrir lightbox
            item.addEventListener('click', () => openLightbox(index));
            
            gallery.appendChild(item);
        });
        
        // Actualizar contador
        imageCount.textContent = imagesToRender.length;
    }, 300);
}

/**
 * Filtrar por categoría
 */
function filterByCategory(category) {
    currentFilter = category;
    applyFilters();
}

/**
 * Buscar imágenes
 */
function searchImages(query) {
    applyFilters(query);
}

/**
 * Aplicar todos los filtros
 */
function applyFilters(searchQuery = '') {
    filteredImages = images.filter(image => {
        const matchesCategory = currentFilter === 'all' || image.category === currentFilter;
        const matchesSearch = searchQuery === '' || 
            image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            image.category.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
    
    renderGallery(filteredImages);
}

/**
 * Cambiar vista (grid/list)
 */
function changeView(view) {
    currentView = view;
    
    if (view === 'list') {
        gallery.classList.add('list-view');
    } else {
        gallery.classList.remove('list-view');
    }
}

/**
 * Abrir lightbox con animación
 */
function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    
    // Agregar animación de entrada
    lightbox.style.animation = 'none';
    setTimeout(() => {
        lightbox.style.animation = 'fadeIn 0.4s';
    }, 10);
}

/**
 * Cerrar lightbox con animación
 */
function closeLightbox() {
    lightbox.style.animation = 'fadeOut 0.3s';
    setTimeout(() => {
        lightbox.classList.remove('active');
        lightbox.style.animation = '';
    }, 300);
}

/**
 * Actualizar contenido del lightbox con animación
 */
function updateLightbox() {
    const image = filteredImages[currentLightboxIndex];
    
    // Efecto de transición
    lightboxImg.style.opacity = '0';
    lightboxTitle.style.opacity = '0';
    lightboxCategory.style.opacity = '0';
    lightboxDescription.style.opacity = '0';
    
    setTimeout(() => {
        lightboxImg.src = image.url;
        lightboxTitle.textContent = image.title;
        lightboxCategory.textContent = image.category.toUpperCase();
        lightboxDescription.textContent = image.description;
        
        // Restaurar opacidad
        setTimeout(() => {
            lightboxImg.style.opacity = '1';
            lightboxTitle.style.opacity = '1';
            lightboxCategory.style.opacity = '1';
            lightboxDescription.style.opacity = '1';
        }, 50);
    }, 200);
}

/**
 * Navegación en lightbox
 */
function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % filteredImages.length;
    updateLightbox();
}

function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

// Event listeners
searchInput.addEventListener('input', (e) => {
    searchImages(e.target.value);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterByCategory(btn.dataset.filter);
    });
});

viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        changeView(btn.dataset.view);
    });
});

// Lightbox controls
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-next').addEventListener('click', nextImage);
document.querySelector('.lightbox-prev').addEventListener('click', prevImage);

// Cerrar lightbox al hacer clic fuera
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegación con teclado en lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === ' ') {
        e.preventDefault();
        nextImage();
    }
});

// Efecto de partículas al mover el mouse
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, i) => {
        const speed = (i % 5 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Inicializar
createParticles();
renderGallery();

// Pre-cargar imágenes para mejor rendimiento
window.addEventListener('load', () => {
    images.forEach(image => {
        const img = new Image();
        img.src = image.url;
    });
});

// Efecto de scroll suave para la galería
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
            isScrolling = false;
        });
        isScrolling = true;
    }
});