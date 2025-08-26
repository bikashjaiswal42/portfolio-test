// Three.js Background Animation
class ThreeBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID "${containerId}" not found.`);
            return;
        }

        // Initialize properties
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        // Initialize the 3D scene
        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        this.camera.position.z = 3;
        
        // Create renderer with transparency
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Create particle system
        this.createParticles();
        
        // Create floating objects
        this.createFloatingObjects();
    }

    createParticles() {
        // Create particle geometry
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        
        // Create positions array for particles
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        
        // Set random positions and colors
        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Position
            positions[i] = (Math.random() - 0.5) * 10;     // x
            positions[i + 1] = (Math.random() - 0.5) * 10; // y
            positions[i + 2] = (Math.random() - 0.5) * 10; // z
            
            // Color - cyan to purple gradient
            colors[i] = Math.random() * 0.2;       // r
            colors[i + 1] = Math.random() * 0.5 + 0.5; // g
            colors[i + 2] = Math.random() * 0.5 + 0.5; // b
        }
        
        // Add attributes to geometry
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        // Create mesh
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    createFloatingObjects() {
        // Create geometric shapes that will float in the background
        const shapes = [];
        
        // Create a torus
        const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 50);
        const torusMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-2, 1, -5);
        this.scene.add(torus);
        shapes.push(torus);
        
        // Create an octahedron
        const octahedronGeometry = new THREE.OctahedronGeometry(0.8);
        const octahedronMaterial = new THREE.MeshPhongMaterial({
            color: 0xff00ff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
        octahedron.position.set(2, -1, -3);
        this.scene.add(octahedron);
        shapes.push(octahedron);
        
        // Create a dodecahedron
        const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.6);
        const dodecahedronMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ffaa,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
        dodecahedron.position.set(0, 2, -4);
        this.scene.add(dodecahedron);
        shapes.push(dodecahedron);
        
        // Store shapes for animation
        this.shapes = shapes;
        
        // Add directional light for the shapes
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }

    addEventListeners() {
        // Mouse move event
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Window resize event
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onMouseMove(event) {
        // Update mouse position
        this.mouseX = (event.clientX - this.windowHalfX) / 100;
        this.mouseY = (event.clientY - this.windowHalfY) / 100;
    }

    onWindowResize() {
        // Update camera and renderer on window resize
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        // Animation loop
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        // Rotate particles based on mouse position
        if (this.particles) {
            this.particles.rotation.x += 0.0005;
            this.particles.rotation.y += 0.0005;
            
            // Subtle mouse influence
            this.particles.rotation.x += (this.mouseY - this.particles.rotation.x) * 0.01;
            this.particles.rotation.y += (this.mouseX - this.particles.rotation.y) * 0.01;
        }
        
        // Animate floating shapes
        if (this.shapes) {
            this.shapes.forEach((shape, index) => {
                // Different rotation speeds for each shape
                shape.rotation.x += 0.003 * (index + 1);
                shape.rotation.y += 0.004 * (index + 1);
                
                // Subtle floating motion
                shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
            });
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. Please include the Three.js library.');
        return;
    }
    
    // Initialize background
    const background = new ThreeBackground('three-bg');
});