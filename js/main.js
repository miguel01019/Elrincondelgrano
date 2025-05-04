// Datos de productos
const productos = [
    {
        id: 1,
        nombre: "Café Colombiano",
        descripcion: "Suave y aromático",
        precio: 15.99,
        imagen: "images/cafe-colombiano.jpg"
    },
    {
        id: 2,
        nombre: "Café Brasileño",
        descripcion: "Intenso y con cuerpo",
        precio: 14.99,
        imagen: "images/cafe-brasileno.jpg"
    },
    {
        id: 3,
        nombre: "Café Etíope",
        descripcion: "Notas florales",
        precio: 16.99,
        imagen: "images/cafe-etiope.jpg"
    },
    {
        id: 4,
        nombre: "Café Guatemalteco",
        descripcion: "Aroma chocolate",
        precio: 15.99,
        imagen: "images/cafe-guatemalteco.jpg"
    }
];

// Inicializar AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 50,
        anchorPlacement: 'top-bottom'
    });

    // Menú móvil
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Cargar productos
    cargarProductos();

    // Efecto Parallax en hero
    const hero = document.querySelector('.hero, .page-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Navbar transparente con efecto de desvanecimiento
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Efecto 3D en cards al mover el mouse
    document.querySelectorAll('.cafe-card, .metodo-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Efecto de rotación suave para el cubo 3D
    const cube = document.querySelector('.cube');
    if (cube) {
        let rotationX = 0;
        let rotationY = 0;
        let isRotating = true;

        cube.addEventListener('mouseenter', () => {
            isRotating = false;
        });

        cube.addEventListener('mouseleave', () => {
            isRotating = true;
        });

        function rotateCube() {
            if (isRotating) {
                rotationY += 0.5;
                cube.style.transform = `translateZ(-150px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            }
            requestAnimationFrame(rotateCube);
        }

        rotateCube();

        cube.addEventListener('mousemove', e => {
            if (!isRotating) {
                const rect = cube.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                rotationX = (y - rect.height / 2) / 10;
                rotationY = (x - rect.width / 2) / 10;
                
                cube.style.transform = `translateZ(-150px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            }
        });
    }

    // Efecto de parallax para las imágenes
    document.querySelectorAll('.cafe-image img').forEach(img => {
        window.addEventListener('scroll', () => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.15;
                const yPos = (rect.top - window.innerHeight / 2) * speed;
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                alert('¡Gracias por suscribirte a nuestro newsletter!');
                newsletterForm.reset();
            } else {
                alert('Por favor, ingresa un email válido.');
            }
        });
    }

    // Validación de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Formulario de contacto con validación
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                    const input = contactForm.querySelector(`[name="${key}"]`);
                    input.classList.add('error');
                }
            });

            if (isValid) {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Función para cargar productos
function cargarProductos() {
    const productosGrid = document.querySelector('.productos-grid');
    if (!productosGrid) return;

    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.className = 'producto-card';
        productoCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='images/placeholder.jpg'">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <button class="cta-button" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al carrito
                </button>
            </div>
        `;
        productosGrid.appendChild(productoCard);
    });
}

// Función para agregar al carrito (simulada)
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        alert(`${producto.nombre} agregado al carrito`);
    }
} 