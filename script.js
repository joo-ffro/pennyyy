
document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.querySelector('.container');
    if (container) {
        container.style.display = 'none';
    }
    
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                
                
            }
        }, 1500); 
    });

    

    
    const scrollHint = document.querySelector('.scroll-hint');
    let hideScrollHint = false;

    if (scrollHint) {
       
        scrollHint.style.cursor = 'pointer';
        
        
        scrollHint.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });

       
        let scrollTimeout;
        const hideOnScroll = () => {
            if (!hideScrollHint) {
                scrollHint.style.opacity = '0';
                scrollHint.style.pointerEvents = 'none';
                hideScrollHint = true;
                
                
                sessionStorage.setItem('scrollHintHidden', 'true');
            }
            
           
            clearTimeout(scrollTimeout);
            
            
            scrollTimeout = setTimeout(() => {
                window.removeEventListener('scroll', hideOnScroll);
            }, 1000);
        };

        
        if (!sessionStorage.getItem('scrollHintHidden')) {
           
            window.addEventListener('scroll', hideOnScroll, { once: true });
            
           
            setTimeout(() => {
                if (!hideScrollHint) {
                    scrollHint.style.opacity = '0';
                    scrollHint.style.pointerEvents = 'none';
                    hideScrollHint = true;
                }
            }, 10000);
        } else {
            
            scrollHint.style.display = 'none';
        }
    }
});


function initAnimations() {
    
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

   
    gsap.utils.toArray('.time-block').forEach((block, i) => {
        gsap.from(block, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            delay: 1 + (i * 0.15),
            ease: 'back.out(1.7)'
        });
    });

   
    gsap.from('.subtitle', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 1.5,
        ease: 'power2.out'
    });

    
    gsap.from('.scroll-down', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 2,
        ease: 'power2.out'
    });
}


function setupScrollAnimations() {
    
    const wishes = document.querySelectorAll('.wish');
    
    wishes.forEach((wish, index) => {
        gsap.to(wish, {
            scrollTrigger: {
                trigger: wish,
                start: 'top 80%',
                toggleActions: 'play none none none',
                onEnter: () => wish.classList.add('visible')
            }
        });
    });

    
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        opacity: 0,
        ease: 'none'
    });
}

// Countdown
function startCountdown() {
    
    const targetDate = new Date('March 20, 2026 00:00:00 GMT+0530').getTime();
    const countdown = setInterval(() => {
        
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            
            
            document.querySelector('.hero-content').style.display = 'none';
            document.getElementById('birthday-celebration').classList.remove('hidden');
            
            // confetti effect
            createConfetti();
            
            
            return;
        }
        
        // time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // countdown 
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        
        animateCountdownNumbers(days, hours, minutes, seconds);
        
    }, 1000);
}

let previousValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function animateCountdownNumbers(days, hours, minutes, seconds) {
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    const values = { days, hours, minutes, seconds };
    
    Object.keys(values).forEach(unit => {
        if (values[unit] !== previousValues[unit]) {
            const element = elements[unit];
            element.style.transform = 'scale(1.2)';
            element.style.color = '#ff4757';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 300);
            
            previousValues[unit] = values[unit];
        }
    });
}

function createConfetti() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('birthday-celebration');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;
    
    const particles = [];
    const colors = ['#ff6b6b', '#ff8e8e', '#ffd93d', '#4ecdc4', '#45b7d1', '#96ceb4'];
    
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            shape: Math.floor(Math.random() * 3) 
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(particle => {
            particle.y += particle.speed;
            particle.rotation += particle.rotationSpeed * 0.1;
            
            if (particle.y > height) {
                particle.y = -particle.size;
                particle.x = Math.random() * width;
            }
            
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            
            ctx.fillStyle = particle.color;
            
            if (particle.shape === 0) {
                // Circle
                ctx.beginPath();
                ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (particle.shape === 1) {
                // Square
                ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
            } else {
                // Triangle
                ctx.beginPath();
                ctx.moveTo(0, -particle.size / 2);
                ctx.lineTo(particle.size / 2, particle.size / 2);
                ctx.lineTo(-particle.size / 2, particle.size / 2);
                ctx.closePath();
                ctx.fill();
            }
            
            ctx.restore();
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    animateConfetti();
}

// 3D Scene
function init3DScene() {
    
    const canvas = document.getElementById('birthday-canvas');
    
    
    const scene = new THREE.Scene();
    
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xff6b6b, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
        colorsArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    const shapes = [];
    const shapeGeometry = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TorusGeometry(1, 0.3, 16, 100)
    ];
    
    const shapeMaterials = [
        new THREE.MeshPhongMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0x45b7d1, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0x96ceb4, transparent: true, opacity: 0.7 })
    ];
    

    for (let i = 0; i < 8; i++) {
        const geometry = shapeGeometry[Math.floor(Math.random() * shapeGeometry.length)];
        const material = shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)].clone();
        
        const shape = new THREE.Mesh(geometry, material);
        

        shape.position.x = (Math.random() - 0.5) * 40;
        shape.position.y = (Math.random() - 0.5) * 40;
        shape.position.z = (Math.random() - 0.5) * 40;
        
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;

        const scale = 1 + Math.random() * 2;
        shape.scale.set(scale, scale, scale);
        

        shape.userData = {
            startY: shape.position.y,
            speed: 0.2 + Math.random() * 0.3,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        };
        
        shapes.push(shape);
        scene.add(shape);
    }
    

    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x, y + 0.25);
    heartShape.bezierCurveTo(x, y, x - 0.25, y, x - 0.25, y + 0.15);
    heartShape.bezierCurveTo(x - 0.25, y + 0.4, x + 0.25, y + 0.6, x, y + 0.9);
    heartShape.bezierCurveTo(x - 0.25, y + 0.6, x - 0.75, y + 0.4, x - 0.75, y + 0.15);
    heartShape.bezierCurveTo(x - 0.75, y, x - 0.5, y, x - 0.5, y + 0.25);
    heartShape.bezierCurveTo(x - 0.5, y, x, y - 0.25, x, y + 0.25);
    
    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.1,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 0.1,
        bevelThickness: 0.1
    });
    
    for (let i = 0; i < 5; i++) {
        const heartMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.7,
            shininess: 100
        });
        
        const heart = new THREE.Mesh(heartGeometry, heartMaterial);
        

        heart.position.x = (Math.random() - 0.5) * 50;
        heart.position.y = (Math.random() - 0.5) * 30 - 10;
        heart.position.z = (Math.random() - 0.5) * 50;
        
        heart.rotation.x = Math.random() * Math.PI;
        heart.rotation.y = Math.random() * Math.PI;
        

        const scale = 0.5 + Math.random() * 1.5;
        heart.scale.set(scale, scale, scale);
        

        heart.userData = {
            startY: heart.position.y,
            speed: 0.1 + Math.random() * 0.2,
            rotationSpeed: (Math.random() - 0.5) * 0.01
        };
        
        shapes.push(heart);
        scene.add(heart);
    }
    
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    

    function animate() {
        requestAnimationFrame(animate);
        

        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] -= 0.05; 
            
            
            if (positions[i + 1] < -50) {
                positions[i] = (Math.random() - 0.5) * 100;
                positions[i + 1] = 50;
                positions[i + 2] = (Math.random() - 0.5) * 100;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        

        const time = Date.now() * 0.001;
        
        shapes.forEach(shape => {
            
            shape.position.y = shape.userData.startY + Math.sin(time * shape.userData.speed) * 0.5;
            
            
            shape.rotation.x += shape.userData.rotationSpeed;
            shape.rotation.y += shape.userData.rotationSpeed * 1.5;
   
            const pulse = Math.sin(time * 0.5) * 0.1 + 1;
            shape.scale.setScalar(pulse);
        });
        
        
        scene.rotation.y = time * 0.05;
        
        renderer.render(scene, camera);
    }
    
    
    animate();
}
