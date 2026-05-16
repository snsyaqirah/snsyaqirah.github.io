// Global variables for the EPIC SPACE SCENE 🚀
let scene, camera, renderer;
let solarSystem, sun, planets = [];
let asteroidBelt, nebula, starField;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let time = 0;
let isHovered = false;

// Initialize the MIND-BLOWING Solar System scene
function initThree() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) {
        console.log('Canvas not found');
        return;
    }
    
    const container = canvas.parentElement;
    
    // Scene setup for deep space
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 200);
    
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000011, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Create the solar system
    createSolarSystem();
    
    // Add cosmic background
    createStarField();
    
    // Create nebula clouds
    createNebula();
    
    // Add asteroid belt
    createAsteroidBelt();
    
    // Add shooting stars
    createShootingStars();
    
    // Setup space lighting
    setupSpaceLighting();
    
    // Position camera
    camera.position.set(0, 20, 40);
    camera.lookAt(0, 0, 0);
    
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
    
    // Mouse movement for camera control
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) / windowHalfX;
        mouseY = (event.clientY - windowHalfY) / windowHalfY;
    });
}

// Create the amazing solar system
function createSolarSystem() {
    solarSystem = new THREE.Group();
    
    // Create the SUN - the centerpiece!
    const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sunMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uIntensity: { value: 1.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float uTime;
            
            void main() {
                vUv = uv;
                vPosition = position;
                
                vec3 newPosition = position;
                newPosition += normal * sin(uTime * 2.0 + position.x * 3.0) * 0.1;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform float uTime;
            uniform float uIntensity;
            
            void main() {
                vec2 center = vec2(0.5, 0.5);
                float dist = distance(vUv, center);
                
                // Solar flares effect
                float flare = sin(uTime * 3.0 + dist * 10.0) * 0.1 + 0.9;
                
                // Sun colors
                vec3 color1 = vec3(1.0, 0.8, 0.0); // Yellow
                vec3 color2 = vec3(1.0, 0.4, 0.0); // Orange
                vec3 color3 = vec3(1.0, 0.2, 0.0); // Red
                
                vec3 color = mix(color1, color2, sin(uTime + vPosition.x) * 0.5 + 0.5);
                color = mix(color, color3, sin(uTime * 0.7 + vPosition.y) * 0.3 + 0.3);
                
                color *= flare * uIntensity;
                
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });
    
    sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystem.add(sun);
    
    // Planet data (distance, size, color, speed)
    const planetData = [
        { dist: 6, size: 0.4, color: 0x8C7853, speed: 0.02, name: "Mercury" },
        { dist: 8, size: 0.7, color: 0xFFC649, speed: 0.015, name: "Venus" },
        { dist: 10, size: 0.8, color: 0x6B93D6, speed: 0.01, name: "Earth" },
        { dist: 12, size: 0.6, color: 0xCD5C5C, speed: 0.008, name: "Mars" },
        { dist: 16, size: 1.8, color: 0xD2691E, speed: 0.005, name: "Jupiter" },
        { dist: 20, size: 1.5, color: 0xFAD5A5, speed: 0.003, name: "Saturn" },
        { dist: 24, size: 1.0, color: 0x4FD0E7, speed: 0.002, name: "Uranus" },
        { dist: 28, size: 0.9, color: 0x4B70DD, speed: 0.001, name: "Neptune" }
    ];
    
    // Create planets with orbital paths
    planetData.forEach((data, index) => {
        const planetGroup = new THREE.Group();
        
        // Create orbital path (ring)
        const orbitGeometry = new THREE.RingGeometry(data.dist - 0.1, data.dist + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xFCC24D,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        solarSystem.add(orbit);
        
        // Create planet
        const planetGeometry = new THREE.SphereGeometry(data.size, 16, 16);
        const planetMaterial = new THREE.MeshPhongMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.9
        });
        
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.x = data.dist;
        planet.castShadow = true;
        planet.receiveShadow = true;
        
        // Add planet glow
        const glowGeometry = new THREE.SphereGeometry(data.size * 1.2, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        planet.add(glow);
        
        // Special effects for special planets
        if (data.name === "Saturn") {
            // Add Saturn's rings
            const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xDAA520,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            planet.add(rings);
        }
        
        if (data.name === "Earth") {
            // Add Earth's moon
            const moonGeometry = new THREE.SphereGeometry(0.2, 8, 8);
            const moonMaterial = new THREE.MeshPhongMaterial({ color: 0xC0C0C0 });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.x = 2;
            planet.add(moon);
        }
        
        planetGroup.add(planet);
        planetGroup.userData = {
            speed: data.speed,
            distance: data.dist,
            planet: planet,
            angle: Math.random() * Math.PI * 2
        };
        
        solarSystem.add(planetGroup);
        planets.push(planetGroup);
    });
    
    scene.add(solarSystem);
}

// Create epic star field background
function createStarField() {
    const starCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        
        // Random positions in a large sphere
        const radius = 100 + Math.random() * 100;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        // Star colors (white to blue-white)
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i3] = intensity;
        colors[i3 + 1] = intensity;
        colors[i3 + 2] = intensity + Math.random() * 0.2;
        
        sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            varying vec3 vColor;
            uniform float uTime;
            
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            varying vec3 vColor;
            uniform float uTime;
            
            void main() {
                float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                float strength = 1.0 - distanceToCenter * 2.0;
                strength = max(strength, 0.0);
                
                // Add twinkling effect
                float twinkle = sin(uTime * 10.0 + gl_FragCoord.x * 0.01) * 0.2 + 0.8;
                
                gl_FragColor = vec4(vColor * twinkle, strength);
            }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true
    });
    
    starField = new THREE.Points(geometry, material);
    scene.add(starField);
}

// Create colorful nebula clouds
function createNebula() {
    const nebulaGroup = new THREE.Group();
    
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.SphereGeometry(15, 16, 16);
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color().setHSL(0.7 + i * 0.1, 0.8, 0.4) }
            },
            vertexShader: `
                varying vec3 vPosition;
                uniform float uTime;
                
                void main() {
                    vPosition = position;
                    vec3 newPosition = position;
                    newPosition += sin(uTime + position.x * 0.01) * normal * 2.0;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                varying vec3 vPosition;
                uniform float uTime;
                uniform vec3 uColor;
                
                void main() {
                    float noise = sin(vPosition.x * 0.01 + uTime) * sin(vPosition.y * 0.01 + uTime) * sin(vPosition.z * 0.01 + uTime);
                    noise = noise * 0.5 + 0.5;
                    
                    float alpha = noise * 0.1;
                    gl_FragColor = vec4(uColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide
        });
        
        const nebulaPart = new THREE.Mesh(geometry, material);
        nebulaPart.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 80
        );
        nebulaPart.userData = { speed: Math.random() * 0.001 + 0.0005 };
        
        nebulaGroup.add(nebulaPart);
    }
    
    scene.add(nebulaGroup);
    window.nebulaGroup = nebulaGroup;
}

// Create asteroid belt around the solar system
function createAsteroidBelt() {
    const asteroidGroup = new THREE.Group();
    
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 0.3 + 0.1;
        const geometry = new THREE.DodecahedronGeometry(size);
        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color().setHSL(0.1, 0.3, 0.4),
            transparent: true,
            opacity: 0.8
        });
        
        const asteroid = new THREE.Mesh(geometry, material);
        
        // Position in belt between Mars and Jupiter
        const angle = Math.random() * Math.PI * 2;
        const radius = 13 + Math.random() * 2;
        const height = (Math.random() - 0.5) * 2;
        
        asteroid.position.x = Math.cos(angle) * radius;
        asteroid.position.z = Math.sin(angle) * radius;
        asteroid.position.y = height;
        
        asteroid.userData = {
            angle: angle,
            radius: radius,
            speed: Math.random() * 0.005 + 0.002,
            rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            )
        };
        
        asteroidGroup.add(asteroid);
    }
    
    scene.add(asteroidGroup);
    window.asteroidBelt = asteroidGroup;
}

// Create shooting stars for extra magic
function createShootingStars() {
    const shootingStars = [];
    
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 8);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.8
        });
        
        const star = new THREE.Mesh(geometry, material);
        star.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 100
        );
        
        star.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.3,
                (Math.random() - 0.5) * 0.5
            ),
            life: Math.random() * 300 + 100
        };
        
        scene.add(star);
        shootingStars.push(star);
    }
    
    window.shootingStars = shootingStars;
}

// Setup dramatic space lighting
function setupSpaceLighting() {
    // Sun light (main light source)
    const sunLight = new THREE.PointLight(0xFFDD44, 2, 100);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);
    
    // Ambient space light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
    scene.add(ambientLight);
    
    // Distant star light
    const starLight = new THREE.DirectionalLight(0x9999FF, 0.3);
    starLight.position.set(50, 50, 50);
    scene.add(starLight);
    
    // Nebula lighting
    const nebulaLight1 = new THREE.PointLight(0xFF6B9D, 0.5, 80);
    nebulaLight1.position.set(30, 20, -30);
    scene.add(nebulaLight1);
    
    const nebulaLight2 = new THREE.PointLight(0x6BFFC0, 0.5, 80);
    nebulaLight2.position.set(-30, -20, 30);
    scene.add(nebulaLight2);
}

// The EPIC animation loop for space
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Update sun
    if (sun && sun.material && sun.material.uniforms) {
        sun.material.uniforms.uTime.value = time;
        sun.material.uniforms.uIntensity.value = 1.0 + Math.sin(time * 2) * 0.1;
        sun.rotation.y += 0.01;
    }
    
    // Update planets orbiting the sun
    planets.forEach((planetGroup, index) => {
        planetGroup.userData.angle += planetGroup.userData.speed;
        
        const x = Math.cos(planetGroup.userData.angle) * planetGroup.userData.distance;
        const z = Math.sin(planetGroup.userData.angle) * planetGroup.userData.distance;
        
        planetGroup.position.x = x;
        planetGroup.position.z = z;
        
        // Rotate planet on its axis
        if (planetGroup.userData.planet) {
            planetGroup.userData.planet.rotation.y += 0.02;
        }
    });
    
    // Update star field twinkling
    if (starField && starField.material && starField.material.uniforms) {
        starField.material.uniforms.uTime.value = time;
        starField.rotation.y += 0.0002;
    }
    
    // Update nebula
    if (window.nebulaGroup) {
        window.nebulaGroup.children.forEach((nebula, index) => {
            nebula.rotation.x += nebula.userData.speed;
            nebula.rotation.y += nebula.userData.speed * 0.7;
            nebula.material.uniforms.uTime.value = time;
        });
    }
    
    // Update asteroid belt
    if (window.asteroidBelt) {
        window.asteroidBelt.children.forEach(asteroid => {
            asteroid.userData.angle += asteroid.userData.speed;
            
            const x = Math.cos(asteroid.userData.angle) * asteroid.userData.radius;
            const z = Math.sin(asteroid.userData.angle) * asteroid.userData.radius;
            
            asteroid.position.x = x;
            asteroid.position.z = z;
            
            // Rotate asteroids
            asteroid.rotation.x += asteroid.userData.rotationSpeed.x;
            asteroid.rotation.y += asteroid.userData.rotationSpeed.y;
            asteroid.rotation.z += asteroid.userData.rotationSpeed.z;
        });
    }
    
    // Update shooting stars
    if (window.shootingStars) {
        window.shootingStars.forEach((star, index) => {
            star.position.add(star.userData.velocity);
            star.userData.life--;
            
            if (star.userData.life <= 0) {
                // Reset shooting star
                star.position.set(
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 50,
                    (Math.random() - 0.5) * 100
                );
                star.userData.life = Math.random() * 300 + 100;
                star.userData.velocity.set(
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.5
                );
            }
        });
    }
    
    // Camera movement based on mouse (space exploration feel)
    const targetX = mouseX * 10;
    const targetY = -mouseY * 10;
    
    camera.position.x += (targetX - camera.position.x) * 0.02;
    camera.position.y += (targetY + 20 - camera.position.y) * 0.02;
    
    // On hover, zoom in closer to the solar system
    if (isHovered) {
        camera.position.z += (25 - camera.position.z) * 0.05;
        // Add gentle camera shake for space vibration
        camera.position.x += Math.sin(time * 5) * 0.2;
        camera.position.y += Math.cos(time * 3) * 0.1;
    } else {
        camera.position.z += (40 - camera.position.z) * 0.02;
    }
    
    camera.lookAt(0, 0, 0);
    
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
        console.log('🚀 EPIC SOLAR SYSTEM INITIALIZED! Welcome to space! 🌌');
    } catch (error) {
        console.error('Space exploration failed:', error);
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
        console.log('🛰️ Service Worker support detected - Ready for space mission!');
    });
}