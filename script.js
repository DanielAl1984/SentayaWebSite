// Sentaya AI - Interactive Website Scripts

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initCharts();
    initTimeline();
    initMarketBars();
    initComparisonCharts();
    initParticles();
    initVideoGrid();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.solution-card, .value-item, .app-item, .founder-card, .validation-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize charts
function initCharts() {
    initSensorGrowthChart();
    initLatencyBars();
}

// Sensor Growth Chart
function initSensorGrowthChart() {
    const canvas = document.getElementById('sensorGrowthChart');
    if (!canvas) return;
    
    const drawChart = () => {
        const ctx = canvas.getContext('2d');
        const width = canvas.offsetWidth || 500;
        canvas.width = width;
        const height = canvas.height = 250;
        
        const padding = 50;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(159, 201, 10, 0.15)';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
            const y = padding + (i * chartHeight / 5);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }
        
        // Vertical grid lines
        for (let i = 0; i <= 5; i++) {
            const x = padding + (i * chartWidth / 5);
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
        }
        
        // Draw codec efficiency curve (flatter)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        
        for (let x = 0; x <= chartWidth; x++) {
            const normalizedX = x / chartWidth;
            const codecY = normalizedX * 0.3; // Slow growth
            const y = height - padding - (codecY * chartHeight);
            const actualX = padding + x;
            ctx.lineTo(actualX, y);
        }
        ctx.stroke();
        
        // Draw sensor data curve (exponential - Sentaya green)
        ctx.strokeStyle = '#9fc90a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        
        for (let x = 0; x <= chartWidth; x++) {
            const normalizedX = x / chartWidth;
            const sensorY = Math.pow(normalizedX, 2.8); // Exponential growth
            const y = height - padding - (sensorY * chartHeight);
            const actualX = padding + x;
            ctx.lineTo(actualX, y);
        }
        ctx.stroke();
        
        // Add axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.font = '11px Oxanium';
        ctx.fillText('2014', padding, height - padding + 20);
        ctx.fillText('2030', width - padding - 25, height - padding + 20);
        
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Data Rate (Gb/s)', 0, 0);
        ctx.restore();
    };
    
    // Use intersection observer to draw when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                drawChart();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const chartContainer = canvas.closest('.chart-container');
    if (chartContainer) {
        observer.observe(chartContainer);
    } else {
        // Fallback: draw immediately
        setTimeout(drawChart, 100);
    }
    
    // Redraw on resize
    window.addEventListener('resize', () => {
        if (chartContainer && chartContainer.getBoundingClientRect().top < window.innerHeight) {
            drawChart();
        }
    });
}

// Initialize latency bars animation
function initLatencyBars() {
    const latencyBars = document.querySelectorAll('.latency-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.parentElement.querySelectorAll('.latency-bar');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const value = parseFloat(bar.getAttribute('data-value'));
                        const barFill = bar.querySelector('.bar-fill');
                        if (barFill) {
                            const percentage = (value / 100) * 100;
                            barFill.style.width = `${percentage}%`;
                            barFill.style.transition = 'width 1.5s ease-out';
                        }
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const chartContainer = document.querySelector('.latency-chart-container');
    if (chartContainer) {
        observer.observe(chartContainer);
    }
}

// Initialize timeline animations
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Initialize market size bars
function initMarketBars() {
    const marketBars = document.querySelectorAll('.market-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = parseFloat(bar.getAttribute('data-value'));
                const barContent = bar.querySelector('.bar-content');
                
                // Calculate width based on value (150B is max)
                const percentage = (value / 150) * 100;
                
    setTimeout(() => {
                    barContent.style.width = `${percentage}%`;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    marketBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize comparison charts
function initComparisonCharts() {
    const compressionChart = document.getElementById('compressionChart');
    const latencyChart = document.getElementById('latencyChart');
    
    if (compressionChart) {
        animateBars(compressionChart, 'compression');
    }
    
    if (latencyChart) {
        animateBars(latencyChart, 'latency');
    }
}

function animateBars(container, type) {
    const bars = container.querySelectorAll('.chart-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                bars.forEach((bar, index) => {
    setTimeout(() => {
                        const value = parseFloat(bar.getAttribute('data-value'));
                        const barFill = bar.querySelector('.bar-fill');
                        
                        if (!barFill) return;
                        
                        if (type === 'compression') {
                            // Compression: max is 400 (Sentaya), so scale accordingly
                            const maxValue = 400;
                            const percentage = Math.min((value / maxValue) * 100, 100);
                            barFill.style.width = `${percentage}%`;
                            barFill.style.transition = 'width 1.5s ease-out';
                        } else {
                            // Latency: max is 100ms, scale normally
                            const maxValue = 100;
                            const percentage = (value / maxValue) * 100;
                            barFill.style.width = `${percentage}%`;
                            barFill.style.transition = 'width 1.5s ease-out';
                        }
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(container);
}

// Initialize particles animation
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(159, 201, 10, 0.3)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    particle.style.animation = `floatParticle ${duration}s ${delay}s infinite`;
    
    container.appendChild(particle);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent += `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize video grid animation
function initVideoGrid() {
    const videoGrid = document.querySelector('.video-grid');
    if (!videoGrid) return;
    
    // Create animated video pixels
    for (let i = 0; i < 50; i++) {
        createVideoPixel(videoGrid);
    }
}

function createVideoPixel(container) {
    const pixel = document.createElement('div');
    pixel.style.position = 'absolute';
    pixel.style.width = '2px';
    pixel.style.height = '2px';
    pixel.style.background = 'rgba(159, 201, 10, 0.1)';
    pixel.style.left = Math.random() * 100 + '%';
    pixel.style.top = Math.random() * 100 + '%';
    pixel.style.pointerEvents = 'none';
    pixel.style.boxShadow = '0 0 4px rgba(159, 201, 10, 0.3)';
    
    const duration = Math.random() * 3 + 2;
    pixel.style.animation = `pixelPulse ${duration}s infinite`;
    
    container.appendChild(pixel);
}

style.textContent += `
    @keyframes pixelPulse {
        0%, 100% {
            opacity: 0.1;
            transform: scale(1);
        }
        50% {
            opacity: 0.5;
            transform: scale(1.5);
        }
    }
`;

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to cards
document.querySelectorAll('.solution-card, .value-item, .app-item, .founder-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate numbers on scroll
function animateNumbers() {
    const statBoxes = document.querySelectorAll('.stat-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue && !statValue.classList.contains('animated')) {
                    statValue.classList.add('animated');
                    animateValue(statValue, statValue.textContent);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statBoxes.forEach(box => observer.observe(box));
}

function animateValue(element, targetText) {
    // Simple animation for numeric values
    if (targetText.includes('Gb/s') || targetText.includes('×')) {
        const numericValue = parseFloat(targetText);
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    element.textContent = targetText;
                    clearInterval(timer);
        } else {
                    element.textContent = current.toFixed(2) + (targetText.includes('Gb/s') ? ' Gb/s' : '×');
                }
            }, 30);
        }
    }
}

// Initialize number animations
animateNumbers();

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    const videoGrid = document.querySelector('.video-grid');
    
    if (hero && particles) {
        const rate = scrolled * 0.3;
        particles.style.transform = `translateY(${rate}px)`;
    }
    
    if (videoGrid) {
        const rate = scrolled * 0.2;
        videoGrid.style.transform = `translateY(${rate}px)`;
    }
});

// Add intersection observer for section reveals
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add CSS for section reveals
style.textContent += `
    .section-hidden {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section-hidden.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Button click effects
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
        // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
        setTimeout(() => ripple.remove(), 600);
    });
});

style.textContent += `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler
const optimizedScroll = throttle(() => {
    // Scroll-based animations can go here
}, 16);

window.addEventListener('scroll', optimizedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

style.textContent += `
    body {
                opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
            opacity: 1;
    }
`;
