// Global variables for the epic 3D scene
let scene, camera, renderer;
let particleSystem, crystalCore;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let time = 0;
let isHovered = false;

// Initialize the mind-blowing Three.js scene
function initThree() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) {
        console.log('Canvas not found');
        return;
    }
    
    const container = canvas.parentElement;
    
    // Scene setup with fog for depth
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 100);
    
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Create the main attraction: Morphing Crystal Core
    createCrystalCore();
    
    // Add floating energy particles
    createEnergyParticles();
    
    // Create holographic rings
    createHolographicRings();
    
    // Add floating geometric elements
    createFloatingElements();
    
    // Setup dynamic lighting
    setupLighting();
    
    // Position camera
    camera.position.set(0, 0, 15);
    
    // Add mouse interaction listeners
    canvas.addEventListener('mouseenter', () => { isHovered = true; });
    canvas.addEventListener('mouseleave', () => { isHovered = false; });
    
    // Start the epic animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const container = canvas.parentElement;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
    });
    
    // Mouse movement for parallax effect
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    });
}

// Create the morphing crystal core - the centerpiece!
function createCrystalCore() {
    const geometry = new THREE.IcosahedronGeometry(3, 2);
    
    // Create a custom shader material for the crystal effect
    const vertexShader = `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;
        
        void main() {
            vPosition = position;
            vNormal = normal;
            vUv = uv;
            
            vec3 newPosition = position;
            
            // Add morphing effect
            float morphStrength = 0.5 + sin(uTime * 2.0 + position.x) * 0.3;
            morphStrength += sin(uTime * 1.5 + position.y) * 0.2;
            morphStrength *= (1.0 + uHover * 0.5);
            
            newPosition += normal * morphStrength;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;
    
    const fragmentShader = `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uHover;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        
        void main() {
            vec3 color = mix(uColor1, uColor2, sin(uTime + vPosition.x) * 0.5 + 0.5);
            color = mix(color, uColor3, sin(uTime * 0.8 + vPosition.y) * 0.5 + 0.5);
            
            // Add fresnel effect
            float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
            fresnel = 1.0 - fresnel;
            fresnel = pow(fresnel, 2.0);
            
            // Add hover glow
            color += vec3(1.0, 0.8, 0.2) * fresnel * (0.3 + uHover * 0.7);
            
            // Add pulsing effect
            float pulse = sin(uTime * 3.0) * 0.1 + 0.9;
            color *= pulse;
            
            gl_FragColor = vec4(color, 0.9 + fresnel * 0.1);
        }
    `;
    
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uHover: { value: 0 },
            uColor1: { value: new THREE.Color(0xFCC24D) }, // Your golden color
            uColor2: { value: new THREE.Color(0xFFD700) },
            uColor3: { value: new THREE.Color(0xFF6B35) }
        },
        transparent: true,
        side: THREE.DoubleSide
    });
    
    crystalCore = new THREE.Mesh(geometry, material);
    crystalCore.position.set(0, 0, 0);
    scene.add(crystalCore);
}

// Create mesmerizing energy particles
function createEnergyParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color = new THREE.Color();
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Create spherical distribution
        const radius = Math.random() * 25 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Random colors in golden spectrum
        const hue = 0.1 + Math.random() * 0.1; // Golden hues
        const saturation = 0.7 + Math.random() * 0.3;
        const lightness = 0.5 + Math.random() * 0.5;
        color.setHSL(hue, saturation, lightness);
        
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
        
        sizes[i] = Math.random() * 3 + 1;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float uTime;
            uniform float uPixelRatio;
            
            void main() {
                vColor = color;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                // Add floating animation
                modelPosition.x += sin(uTime + modelPosition.y * 0.01) * 2.0;
                modelPosition.y += cos(uTime + modelPosition.x * 0.01) * 2.0;
                modelPosition.z += sin(uTime + modelPosition.x * 0.01 + modelPosition.y * 0.01) * 1.0;
                
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;
                
                gl_Position = projectedPosition;
                gl_PointSize = size * uPixelRatio * (1.0 / -viewPosition.z);
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            
            void main() {
                float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                float strength = 0.05 / distanceToCenter - 0.1;
                
                gl_FragColor = vec4(vColor, strength);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// Create holographic rings that respond to mouse
function createHolographicRings() {
    const ringGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.RingGeometry(4 + i * 1.5, 4.2 + i * 1.5, 32);
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.15, 0.8, 0.6),
            transparent: true,
            opacity: 0.3 - i * 0.05,
            side: THREE.DoubleSide
        });
        
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        ring.rotation.z = i * 0.2;
        ring.userData = { originalRotationZ: ring.rotation.z };
        
        ringGroup.add(ring);
    }
    
    ringGroup.position.set(0, 0, 0);
    scene.add(ringGroup);
    
    // Store reference for animation
    window.holographicRings = ringGroup;
}

// Add floating geometric elements for extra coolness
function createFloatingElements() {
    const elements = [];
    const geometries = [
        new THREE.OctahedronGeometry(0.5),
        new THREE.TetrahedronGeometry(0.7),
        new THREE.DodecahedronGeometry(0.4),
        new THREE.IcosahedronGeometry(0.6)
    ];
    
    for (let i = 0; i < 20; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.7, 0.6),
            transparent: true,
            opacity: 0.6,
            wireframe: Math.random() > 0.5
        });
        
        const element = new THREE.Mesh(geometry, material);
        
        // Random positioning in a sphere around the center
        const radius = 10 + Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        element.position.x = radius * Math.sin(phi) * Math.cos(theta);
        element.position.y = radius * Math.sin(phi) * Math.sin(theta);
        element.position.z = radius * Math.cos(phi);
        
        element.userData = {
            originalPosition: element.position.clone(),
            rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            floatSpeed: Math.random() * 0.5 + 0.5
        };
        
        scene.add(element);
        elements.push(element);
    }
    
    window.floatingElements = elements;
}

// Setup dramatic lighting
function setupLighting() {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Colored point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0xFCC24D, 2, 50);
    pointLight1.position.set(10, 0, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFF6B35, 1.5, 50);
    pointLight2.position.set(-10, 0, 10);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0x667eea, 1, 50);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);
}

// The epic animation loop
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Update crystal core
    if (crystalCore && crystalCore.material && crystalCore.material.uniforms) {
        crystalCore.material.uniforms.uTime.value = time;
        crystalCore.material.uniforms.uHover.value = THREE.MathUtils.lerp(
            crystalCore.material.uniforms.uHover.value,
            isHovered ? 1 : 0,
            0.05
        );
        
        // Rotate the crystal
        crystalCore.rotation.x += 0.005;
        crystalCore.rotation.y += 0.01;
        
        // Add hover effect
        if (isHovered) {
            crystalCore.scale.setScalar(1 + Math.sin(time * 5) * 0.05);
        } else {
            crystalCore.scale.setScalar(1);
        }
    }
    
    // Update particle system
    if (particleSystem && particleSystem.material && particleSystem.material.uniforms) {
        particleSystem.material.uniforms.uTime.value = time;
        particleSystem.rotation.y += 0.002;
    }
    
    // Update holographic rings
    if (window.holographicRings) {
        window.holographicRings.children.forEach((ring, index) => {
            ring.rotation.z = ring.userData.originalRotationZ + time * (0.5 + index * 0.1);
            ring.material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.1;
        });
        window.holographicRings.rotation.x += 0.003;
    }
    
    // Update floating elements
    if (window.floatingElements) {
        window.floatingElements.forEach((element, index) => {
            element.rotation.add(element.userData.rotationSpeed);
            
            // Floating animation
            const floatTime = time * element.userData.floatSpeed;
            element.position.y = element.userData.originalPosition.y + Math.sin(floatTime + index) * 2;
            element.position.x = element.userData.originalPosition.x + Math.cos(floatTime + index * 0.5) * 1;
        });
    }
    
    // Camera movement based on mouse position
    const targetX = mouseX * 2;
    const targetY = -mouseY * 2;
    
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    
    // Add camera shake on hover
    if (isHovered) {
        camera.position.x += Math.sin(time * 10) * 0.1;
        camera.position.y += Math.cos(time * 8) * 0.1;
    }
    
    renderer.render(scene, camera);
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    if (hamburger && navMenu) {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    if (navbar) {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
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
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Skills progress animation
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !skillsAnimated) {
                    skillsAnimated = true;
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        if (width) {
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, Math.random() * 1000);
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        skillsObserver.observe(skillsSection);
    }
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact form
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            if (status) {
                status.textContent = 'Sending...';
            }

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    if (status) status.textContent = 'Message sent! Thank you.';
                    form.reset();
                } else {
                    return response.json().then(data => {
                        if (data.errors) {
                            if (status) status.textContent = data.errors.map(error => error.message).join(', ');
                        } else {
                            if (status) status.textContent = 'Oops! There was a problem.';
                        }
                    });
                }
            }).catch(() => {
                if (status) status.textContent = 'Oops! There was a problem.';
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Initialize all functionalities
    try {
        initThree();
        console.log('Three.js initialized successfully!');
    } catch (error) {
        console.error('Three.js initialization error:', error);
    }
    
    initNavigation();
    initScrollAnimations();
    initSkillsAnimation();
    initScrollToTop();
    initContactForm();
    initSmoothScrolling();
});

// Performance optimizations
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

// Preload critical resources
function preloadResources() {
    const links = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Call preload on script load
preloadResources();

// Service Worker for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log('Service Worker support detected');
    });
}