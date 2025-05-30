document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a.nav-link');
    const sections = document.querySelectorAll('main section');
    const btnTopo = document.getElementById('btnTopo');
    const bannerSlides = document.querySelectorAll('.banner-slider img'); // SELETOR CORRIGIDO
    const btnSolicitarRetirada = document.getElementById('btnSolicitarRetirada');
    const popupRetirada = document.getElementById('popupRetirada');
    const btnFecharPopup = document.getElementById('btnClosePopup');
    const formRetirada = document.getElementById('formRetirada');

    // Scroll suave
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scrollspy
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`nav a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => observer.observe(section));

    // Botão voltar ao topo
    window.addEventListener('scroll', () => {
        btnTopo.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    btnTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Banner automático
    let currentSlideIndex = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        bannerSlides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % bannerSlides.length;
        showSlide(currentSlideIndex);
    }

    showSlide(currentSlideIndex); // Mostrar o primeiro slide ao carregar
    setInterval(nextSlide, slideInterval);

    // ----- Popup "Solicite a Retirada" -----
    if (btnSolicitarRetirada && popupRetirada && btnFecharPopup && formRetirada) {
        btnSolicitarRetirada.addEventListener('click', () => {
            popupRetirada.removeAttribute('hidden');
            popupRetirada.classList.add('show');
            document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
            setTimeout(() => {
                const nomeRetiradaInput = document.getElementById('nomeRetirada');
                if (nomeRetiradaInput) {
                    nomeRetiradaInput.focus();
                }
            }, 100);
        });

        btnFecharPopup.addEventListener('click', () => {
            popupRetirada.classList.remove('show');
            popupRetirada.setAttribute('hidden', '');
            document.body.style.overflow = ''; // Restaura o scroll do fundo
            btnSolicitarRetirada.focus();
        });

        popupRetirada.addEventListener('click', (e) => {
            if (e.target === popupRetirada) {
                popupRetirada.classList.remove('show');
                popupRetirada.setAttribute('hidden', '');
                document.body.style.overflow = ''; // Restaura o scroll do fundo
                btnSolicitarRetirada.focus();
            }
        });

        formRetirada.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nomeRetirada').value.trim();
            const cep = document.getElementById('cepRetirada').value.trim();
            const telefone = document.getElementById('telefoneRetirada').value.trim();
            const modelo = document.getElementById('modeloRetirada').value.trim();

            const mensagem =
                `Olá, gostaria de solicitar a retirada.%0A` +
                `Nome: ${nome}%0A` +
                `CEP: ${cep}%0A` +
                `Telefone: ${telefone}%0A` +
                `Modelo da Impressora: ${modelo}`;

            const numeroWhats = '5511930021008';
            const urlWhats = `https://wa.me/${numeroWhats}?text=${mensagem}`;
            window.open(urlWhats, '_blank');

            formRetirada.reset();
            popupRetirada.classList.remove('show');
            popupRetirada.setAttribute('hidden', '');
            document.body.style.overflow = ''; // Restaura o scroll do fundo
            btnSolicitarRetirada.focus();
        });
    } else {
        console.error('Um ou mais elementos do popup de retirada não foram encontrados.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const mensagemTextarea = document.getElementById('mensagem');

    if (mensagemTextarea) {
        mensagemTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});

const navLinks = document.querySelectorAll('nav a.nav-link');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3 && pageYOffset < sectionTop + sectionHeight - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        } else if (currentSection === 'inicio' && link.getAttribute('href') === '#inicio') {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Após o clique, define o link como ativo imediatamente
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Define o 'Início' como ativo no carregamento da página
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            setActiveLink(); // Atualiza o link ativo com base no hash
        } else {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#inicio') {
                    link.classList.add('active');
                }
            });
        }
    } else {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#inicio') {
                link.classList.add('active');
            }
        });
    }
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerHeight = document.querySelector('header').offsetHeight; // Obtém a altura do seu header fixo

        if (targetElement) {
            const scrollToPosition = targetElement.offsetTop - headerHeight; // Calcula a posição subtraindo a altura do header e um pequeno offset

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });

            // Após o clique, define o link como ativo imediatamente
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const header = document.querySelector('header');
    const logoContainer = document.querySelector('.logo-container');
    let isCollapsed = false;

    if (navToggle && header && logoContainer) {
        // Define o estado inicial do header como "recolhido" em mobile
        if (window.innerWidth <= 768) {
            header.classList.add('collapsed');
            navToggle.innerHTML = '<span class="arrow-down">▼</span>';
            isCollapsed = true;

            // Ajusta o padding do main inicialmente (considerando a altura da logo)
            const headerHeightCollapsed = document.querySelector('.logo-container').offsetHeight + 20; // Altura da logo + um pouco de espaço
            document.querySelector('main').style.paddingTop = `${headerHeightCollapsed}px`;
        }

        navToggle.addEventListener('click', function() {
            header.classList.toggle('collapsed');
            isCollapsed = !isCollapsed;
            navToggle.innerHTML = isCollapsed ? '<span class="arrow-down">▼</span>' : '<span class="arrow-up">▲</span>';

            // Ajusta o padding do main na transição
            const headerHeight = header.offsetHeight;
            document.querySelector('main').style.paddingTop = `${headerHeight + 20}px`;
        });

        // Recalcula o padding do main em redimensionamento
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                header.classList.remove('collapsed');
                navToggle.innerHTML = '<span class="arrow-down">▼</span>';
                isCollapsed = false;
                document.querySelector('main').style.paddingTop = '140px'; // Seu padding original para desktop
            } else if (isCollapsed) {
                const headerHeightCollapsed = document.querySelector('.logo-container').offsetHeight + 20;
                document.querySelector('main').style.paddingTop = `${headerHeightCollapsed}px`;
            } else {
                const headerHeight = header.offsetHeight;
                document.querySelector('main').style.paddingTop = `${headerHeight + 20}px`;
            }
        });
    }
});
