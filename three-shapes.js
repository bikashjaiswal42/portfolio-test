// Three.js Shapes and Elements for Portfolio
class ThreeShapes {
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
        this.shapes = [];
        this.clock = new THREE.Clock();
        this.mixer = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

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
            60, // Field of view
            this.container.clientWidth / this.container.clientHeight, // Aspect ratio
            0.1, // Near clipping plane
            100 // Far clipping plane
        );
        this.camera.position.z = 5;
        
        // Create renderer with transparency
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        
        // Add lights
        this.addLights();
        
        // Create 3D shapes
        this.createShapes();
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
        
        // Point lights for dramatic effect
        const pointLight1 = new THREE.PointLight(0x00ffff, 1, 10);
        pointLight1.position.set(2, 2, 2);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff00ff, 1, 10);
        pointLight2.position.set(-2, -2, 2);
        this.scene.add(pointLight2);
    }

    createShapes() {
        // Create different 3D shapes for skills section
        this.createCube();
        this.createSphere();
        this.createTorus();
        this.createCone();
        this.createOctahedron();
        this.createTetrahedron();
    }

    createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = this.createCustomMaterial(0x00ffff);
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(-3, 2, 0);
        cube.userData = { type: 'cube', hovered: false };
        
        this.scene.add(cube);
        this.shapes.push(cube);
    }

    createSphere() {
        const geometry = new THREE.SphereGeometry(0.7, 32, 32);
        const material = this.createCustomMaterial(0xff00ff);
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(3, 2, 0);
        sphere.userData = { type: 'sphere', hovered: false };
        
        this.scene.add(sphere);
        this.shapes.push(sphere);
    }

    createTorus() {
        const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
        const material = this.createCustomMaterial(0x00ff00);
        const torus = new THREE.Mesh(geometry, material);
        torus.position.set(0, 2, 0);
        torus.userData = { type: 'torus', hovered: false };
        
        this.scene.add(torus);
        this.shapes.push(torus);
    }

    createCone() {
        const geometry = new THREE.ConeGeometry(0.7, 1.5, 32);
        const material = this.createCustomMaterial(0xffff00);
        const cone = new THREE.Mesh(geometry, material);
        cone.position.set(-3, -1, 0);
        cone.userData = { type: 'cone', hovered: false };
        
        this.scene.add(cone);
        this.shapes.push(cone);
    }

    createOctahedron() {
        const geometry = new THREE.OctahedronGeometry(0.7);
        const material = this.createCustomMaterial(0xff5500);
        const octahedron = new THREE.Mesh(geometry, material);
        octahedron.position.set(0, -1, 0);
        octahedron.userData = { type: 'octahedron', hovered: false };
        
        this.scene.add(octahedron);
        this.shapes.push(octahedron);
    }

    createTetrahedron() {
        const geometry = new THREE.TetrahedronGeometry(0.8);
        const material = this.createCustomMaterial(0x00ffaa);
        const tetrahedron = new THREE.Mesh(geometry, material);
        tetrahedron.position.set(3, -1, 0);
        tetrahedron.userData = { type: 'tetrahedron', hovered: false };
        
        this.scene.add(tetrahedron);
        this.shapes.push(tetrahedron);
    }

    createCustomMaterial(color) {
        // Create a custom material with glow effect
        return new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            wireframe: true,
            emissive: color,
            emissiveIntensity: 0.2,
            side: THREE.DoubleSide
        });
    }

    addEventListeners() {
        // Mouse move for hover effects
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        
        // Window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onMouseMove(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.shapes);
        
        // Reset all shapes
        this.shapes.forEach(shape => {
            if (shape.userData.hovered) {
                shape.userData.hovered = false;
                gsap.to(shape.scale, {
                    duration: 0.5,
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "elastic.out(1, 0.3)"
                });
                gsap.to(shape.material, {
                    duration: 0.5,
                    emissiveIntensity: 0.2,
                    opacity: 0.8
                });
            }
        });
        
        // Handle hover effect
        if (intersects.length > 0) {
            const shape = intersects[0].object;
            shape.userData.hovered = true;
            
            gsap.to(shape.scale, {
                duration: 0.5,
                x: 1.2,
                y: 1.2,
                z: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
            
            gsap.to(shape.material, {
                duration: 0.5,
                emissiveIntensity: 0.5,
                opacity: 1
            });
        }
    }

    onWindowResize() {
        // Update camera and renderer on window resize
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        // Animation loop
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        // Get elapsed time
        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        
        // Animate shapes
        this.shapes.forEach((shape, index) => {
            // Rotate shapes
            shape.rotation.x += 0.005;
            shape.rotation.y += 0.01;
            
            // Add floating motion
            shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002;
        });
        
        // Update animation mixer if exists
        if (this.mixer) {
            this.mixer.update(delta);
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
    
    // Check if container exists
    if (document.getElementById('skills-3d')) {
        // Initialize 3D shapes for skills section
        const skillsShapes = new ThreeShapes('skills-3d');
    }
});