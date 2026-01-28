/**
 * 3D Sphere Visualization Module
 * Uses Three.js for interactive 3D sphere
 */

class SphereVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphere = null;
        this.sections = [];
        this.particles = [];
        this.isRotating = true;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.rotationSpeed = 0.002;
        this.isInteracting = false;
        this.raycaster = null;
        this.mouse = null;
        this.hoveredSection = null;

        this.sectionData = [
            { name: 'Problem', color: 0xE74C3C, position: { theta: 0, phi: Math.PI / 4 } },
            { name: 'Theory', color: 0x3498DB, position: { theta: Math.PI / 3, phi: Math.PI / 4 } },
            { name: 'Method', color: 0x2ECC71, position: { theta: 2 * Math.PI / 3, phi: Math.PI / 4 } },
            { name: 'Findings', color: 0xF39C12, position: { theta: Math.PI, phi: Math.PI / 4 } },
            { name: 'Framework', color: 0x9B59B6, position: { theta: 4 * Math.PI / 3, phi: Math.PI / 4 } },
            { name: 'Impact', color: 0x1ABC9C, position: { theta: 5 * Math.PI / 3, phi: Math.PI / 4 } }
        ];

        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Sphere container not found');
            return;
        }

        // Check WebGL support
        if (!this.checkWebGLSupport()) {
            this.container.classList.add('no-webgl');
            return;
        }

        this.createScene();
        this.createSphere();
        this.createSectionMarkers();
        this.createParticles();
        this.createLights();
        this.setupEventListeners();
        this.animate();

        // Show section labels after a delay
        setTimeout(() => this.showSectionLabels(), 1500);
    }

    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }

    createScene() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f);
        this.scene.fog = new THREE.Fog(0x0a0a0f, 5, 15);

        // Camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Raycaster for interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    createSphere() {
        // Main sphere geometry
        const geometry = new THREE.SphereGeometry(1.8, 64, 64);

        // Create gradient material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color(0x6366f1) },
                color2: { value: new THREE.Color(0x8b5cf6) },
                color3: { value: new THREE.Color(0xd946ef) }
            },
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    vUv = uv;
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform vec3 color3;
                
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPosition;
                
                void main() {
                    // Gradient based on position
                    float gradient = (vPosition.y + 1.0) / 2.0;
                    
                    // Animated color mixing
                    vec3 color = mix(color1, color2, gradient);
                    color = mix(color, color3, sin(time * 0.5 + vPosition.x * 2.0) * 0.5 + 0.5);
                    
                    // Fresnel effect for edge glow
                    vec3 viewDir = normalize(cameraPosition - vPosition);
                    float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);
                    color += fresnel * 0.3;
                    
                    // Add some transparency
                    float alpha = 0.85 + fresnel * 0.15;
                    
                    gl_FragColor = vec4(color, alpha);
                }
            `,
            transparent: true,
            side: THREE.FrontSide
        });

        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);

        // Wireframe overlay
        const wireGeometry = new THREE.SphereGeometry(1.82, 32, 32);
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
            transparent: true,
            opacity: 0.1
        });
        const wireframe = new THREE.Mesh(wireGeometry, wireMaterial);
        this.sphere.add(wireframe);

        // Inner glow sphere
        const glowGeometry = new THREE.SphereGeometry(1.75, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.3,
            side: THREE.BackSide
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sphere.add(glow);
    }

    createSectionMarkers() {
        this.sectionData.forEach((section, index) => {
            // Calculate position on sphere surface
            const radius = 1.9;
            const theta = section.position.theta;
            const phi = section.position.phi;

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.cos(phi);
            const z = radius * Math.sin(phi) * Math.sin(theta);

            // Create marker (small sphere)
            const markerGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const markerMaterial = new THREE.MeshBasicMaterial({
                color: section.color,
                transparent: true,
                opacity: 0.9
            });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.set(x, y, z);
            marker.userData = { section: section.name, index: index };

            this.sphere.add(marker);
            this.sections.push(marker);

            // Create glow for marker
            const glowGeometry = new THREE.SphereGeometry(0.12, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: section.color,
                transparent: true,
                opacity: 0.3
            });
            const markerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
            marker.add(markerGlow);
        });
    }

    createParticles() {
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Random position in sphere around the main sphere
            const radius = 2.5 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.cos(phi);
            positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

            // Random colors from palette
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i * 3] = 0.39;     // 99/255 - purple
                colors[i * 3 + 1] = 0.4;  // 102/255
                colors[i * 3 + 2] = 0.95; // 241/255
            } else if (colorChoice < 0.66) {
                colors[i * 3] = 0.55;
                colors[i * 3 + 1] = 0.36;
                colors[i * 3 + 2] = 0.96;
            } else {
                colors[i * 3] = 0.85;
                colors[i * 3 + 1] = 0.27;
                colors[i * 3 + 2] = 0.94;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    createLights() {
        // Ambient light
        const ambient = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambient);

        // Main directional light
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        this.scene.add(dirLight);

        // Accent lights
        const accentLight1 = new THREE.PointLight(0x6366f1, 1, 10);
        accentLight1.position.set(-3, 2, 2);
        this.scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0xd946ef, 0.5, 10);
        accentLight2.position.set(3, -2, 2);
        this.scene.add(accentLight2);
    }

    setupEventListeners() {
        // Mouse move
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            this.mouse.x = this.mouseX;
            this.mouse.y = this.mouseY;

            this.checkHover();
        });

        // Mouse down/up for interaction
        this.container.addEventListener('mousedown', () => {
            this.isInteracting = true;
        });

        this.container.addEventListener('mouseup', () => {
            this.isInteracting = false;
        });

        this.container.addEventListener('mouseleave', () => {
            this.isInteracting = false;
        });

        // Click on sections
        this.container.addEventListener('click', (e) => {
            if (this.hoveredSection) {
                this.onSectionClick(this.hoveredSection);
            }
        });

        // Resize
        window.addEventListener('resize', () => this.onResize());
    }

    checkHover() {
        if (!this.raycaster || !this.camera) return;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.sections);

        // Reset previous hover
        if (this.hoveredSection) {
            this.hoveredSection.scale.setScalar(1);
        }

        if (intersects.length > 0) {
            this.hoveredSection = intersects[0].object;
            this.hoveredSection.scale.setScalar(1.3);
            this.container.style.cursor = 'pointer';
        } else {
            this.hoveredSection = null;
            this.container.style.cursor = 'default';
        }
    }

    onSectionClick(section) {
        const sectionName = section.userData.section;
        const sectionIndex = section.userData.index;

        // Dispatch custom event
        const event = new CustomEvent('sphereSectionClick', {
            detail: { section: sectionName, index: sectionIndex }
        });
        document.dispatchEvent(event);
    }

    showSectionLabels() {
        const labelsContainer = document.getElementById('sphere-sections');
        if (!labelsContainer) return;

        labelsContainer.innerHTML = '';

        this.sectionData.forEach((section, index) => {
            const label = document.createElement('div');
            label.className = `sphere-section-label ${section.name.toLowerCase()}`;
            label.innerHTML = `
                <span class="section-dot"></span>
                <span class="section-name">${section.name}</span>
            `;
            label.dataset.section = section.name;
            label.dataset.index = index;

            label.addEventListener('click', () => {
                this.onSectionClick({ userData: { section: section.name, index } });
            });

            labelsContainer.appendChild(label);

            // Add visible class with delay
            setTimeout(() => {
                label.classList.add('visible');
            }, 100 * (index + 1));
        });
    }

    onResize() {
        if (!this.camera || !this.renderer || !this.container) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (!this.sphere || !this.renderer || !this.scene || !this.camera) return;

        const time = performance.now() * 0.001;

        // Update shader time uniform
        if (this.sphere.material.uniforms) {
            this.sphere.material.uniforms.time.value = time;
        }

        // Auto rotation
        if (this.isRotating && !this.isInteracting) {
            this.sphere.rotation.y += this.rotationSpeed;
        }

        // Mouse influence on rotation
        if (this.isInteracting) {
            this.targetRotationY = this.mouseX * Math.PI * 0.5;
            this.targetRotationX = this.mouseY * Math.PI * 0.25;
        }

        // Smooth rotation interpolation
        this.sphere.rotation.y += (this.targetRotationY - this.sphere.rotation.y) * 0.05;
        this.sphere.rotation.x += (this.targetRotationX - this.sphere.rotation.x) * 0.05;

        // Animate particles
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.0005;
            this.particleSystem.rotation.x += 0.0002;
        }

        // Pulse section markers
        this.sections.forEach((marker, i) => {
            const scale = 1 + Math.sin(time * 2 + i) * 0.1;
            marker.children[0].scale.setScalar(scale);
        });

        this.renderer.render(this.scene, this.camera);
    }

    // Public methods
    pause() {
        this.isRotating = false;
    }

    resume() {
        this.isRotating = true;
    }

    focusSection(sectionName) {
        const section = this.sectionData.find(s => s.name.toLowerCase() === sectionName.toLowerCase());
        if (section) {
            this.targetRotationY = -section.position.theta;
            this.targetRotationX = section.position.phi - Math.PI / 2;
        }
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            if (this.container && this.renderer.domElement) {
                this.container.removeChild(this.renderer.domElement);
            }
        }

        // Dispose geometries and materials
        if (this.sphere) {
            this.sphere.geometry.dispose();
            this.sphere.material.dispose();
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
    }
}

// Export
if (typeof window !== 'undefined') {
    window.SphereVisualization = SphereVisualization;
}
