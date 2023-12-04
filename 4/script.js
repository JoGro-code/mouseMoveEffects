// script.js
document.addEventListener("DOMContentLoaded", () => {
  let scene, camera, renderer, plane, mouse, uniforms;

  function init() {
    // Initialize scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10
    );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize mouse coordinates
    mouse = new THREE.Vector2();

    // Uniforms for shaders
    uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: mouse },
    };

    // Create a plane to apply the effect
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    camera.position.z = 1;

    // Event listeners
    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);

    onWindowResize();
    animate();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.resolution.value.x = renderer.domElement.width;
    uniforms.resolution.value.y = renderer.domElement.height;
  }

  function onDocumentMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.05;
    renderer.render(scene, camera);
  }

  // Vertex Shader
  const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

  // Fragment Shader
  const fragmentShader = `
        uniform vec2 resolution;
        uniform float time;
        uniform vec2 mouse;
        varying vec2 vUv;

        void main() {
            vec2 uv = vUv;
            vec2 mousePos = (mouse + 1.0) / 2.0; // Convert to 0.0 - 1.0 range

            // Calculate radial effect based on mouse position
            float distanceFromMouse = distance(mousePos, uv);
            float effect = smoothstep(0.0, 0.2, 1.0 - distanceFromMouse);

            // Color influenced by mouse position
            vec3 color = mix(vec3(1.0, 1.0, 1.0), vec3(0.5, 0.0, 0.0), effect);

            gl_FragColor = vec4(color, 1.0);
        }
    `;

  init();
});
