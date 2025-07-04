// Mobile Menu Toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('animate-visible');
        } else {
            element.classList.remove('animate-visible');
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll-animate class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('scroll-animate');
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Load More Projects Button
document.getElementById('loadMoreProjects').addEventListener('click', function() {
    const moreProjects = document.getElementById('moreProjects');
    moreProjects.classList.toggle('hidden');
    this.textContent = moreProjects.classList.contains('hidden') ? 'Load More Projects' : 'Show Less';
});

// Certification Modal
function setupCertificationModal() {
    const modal = document.createElement('div');
    modal.id = 'certModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center hidden';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full p-8 relative">
            <button id="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-2xl"></i>
            </button>
            <div id="modalContent"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Handle certification clicks
    document.querySelectorAll('[data-certification]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const certId = this.getAttribute('data-certification');
            const certContent = document.getElementById(certId).innerHTML;
            document.getElementById('modalContent').innerHTML = certContent;
            document.getElementById('certModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('certModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Run modal setup when DOM is loaded
document.addEventListener('DOMContentLoaded', setupCertificationModal);

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-percent');
        let currentWidth = 0;
        
        const animation = setInterval(() => {
            if (currentWidth >= targetWidth) {
                clearInterval(animation);
            } else {
                currentWidth += 1;
                bar.style.width = currentWidth + '%';
            }
        }, 10);
    });
}

// Run skill bars animation when scrolled into view
document.addEventListener('scroll', function() {
    const skillsSection = document.getElementById('skills');
    const position = skillsSection.getBoundingClientRect();
    
    if (position.top <= window.innerHeight * 0.8 && position.bottom >= 0) {
        animateSkillBars();
        // Remove event listener after running once
        document.removeEventListener('scroll', arguments.callee);
    }
});

// Hover Effects for Cards
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const hoverBg = document.createElement('div');
            hoverBg.className = 'card-hover-bg absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 rounded-xl pointer-events-none';
            this.appendChild(hoverBg);
            
            setTimeout(() => {
                hoverBg.style.opacity = '0.1';
            }, 10);
        });
        
        card.addEventListener('mouseleave', function() {
            const hoverBg = this.querySelector('.card-hover-bg');
            if (hoverBg) {
                hoverBg.style.opacity = '0';
                setTimeout(() => {
                    hoverBg.remove();
                }, 300);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', setupCardHoverEffects);
