import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Procedural, stylised tactical operative built from primitives so the
 * preview needs no external model files. Returns a small control API.
 */
export function createOperativeScene(container, options = {}) {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.style.touchAction = 'none';
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  const homePosition = new THREE.Vector3(0.92, 1.26, 3.5);
  const homeTarget = new THREE.Vector3(0, 0.86, 0);
  camera.position.copy(homePosition);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(homeTarget);
  controls.enableDamping = true;
  controls.dampingFactor = 0.075;
  controls.enablePan = false;
  controls.minDistance = 2.1;
  controls.maxDistance = 5.6;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.62;
  controls.rotateSpeed = 0.8;
  controls.zoomSpeed = 0.65;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.7;
  controls.saveState();

  /* ---------- materials ---------- */

  const materials = [];
  const material = (color, extra = {}) => {
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.84,
      metalness: 0.05,
      ...extra,
    });
    materials.push(mat);
    return mat;
  };

  const skin = material(0xc9977a, { roughness: 0.68 });
  const skinShadow = material(0xb08363, { roughness: 0.7 });
  const hair = material(0x1a1512, { roughness: 0.88 });
  const vest = material(0x4b5243, { roughness: 0.93 });
  const vestDark = material(0x2b3029, { roughness: 0.9 });
  const plate = material(0x3f463c, { roughness: 0.62, metalness: 0.24 });
  const shirt = material(0x1f2226, { roughness: 0.95 });
  const pants = material(0x343a33, { roughness: 0.95 });
  const pantsDark = material(0x272b26, { roughness: 0.9 });
  const boot = material(0x191a1a, { roughness: 0.55, metalness: 0.12 });
  const glove = material(0x22242a, { roughness: 0.86 });
  const strap = material(0x1c1e1b, { roughness: 0.9 });
  const signal = material(0xff5a1f, {
    roughness: 0.5,
    metalness: 0.2,
    emissive: 0xff3d00,
    emissiveIntensity: 0.35,
  });
  const metal = material(0x6a7178, { roughness: 0.4, metalness: 0.6 });

  /* ---------- helpers ---------- */

  const rb = (w, h, d, r = 0.02) => new RoundedBoxGeometry(w, h, d, 3, r);
  const capsule = (r, len) => new THREE.CapsuleGeometry(r, len, 6, 16);

  const mesh = (parent, geometry, mat, position = [0, 0, 0], rotation = [0, 0, 0]) => {
    const item = new THREE.Mesh(geometry, mat);
    item.position.set(...position);
    item.rotation.set(...rotation);
    item.castShadow = true;
    item.receiveShadow = true;
    parent.add(item);
    return item;
  };

  /* ---------- character ---------- */

  const character = new THREE.Group();
  scene.add(character);

  /* legs */
  [-1, 1].forEach((side) => {
    mesh(character, rb(0.18, 0.17, 0.17, 0.05), pants, [side * 0.105, 0.9, 0]);
    mesh(character, capsule(0.104, 0.26), pants, [side * 0.105, 0.655, 0]);
    mesh(character, rb(0.095, 0.15, 0.07, 0.02), pantsDark, [side * 0.185, 0.645, 0.02]);
    mesh(character, rb(0.135, 0.125, 0.145, 0.04), pantsDark, [side * 0.105, 0.478, 0.03]);
    mesh(character, capsule(0.077, 0.22), pants, [side * 0.105, 0.29, 0.006]);
    mesh(character, rb(0.138, 0.05, 0.255, 0.02), boot, [side * 0.105, 0.028, 0.028]);
    mesh(character, rb(0.132, 0.115, 0.22, 0.035), boot, [side * 0.105, 0.104, 0.016]);
    mesh(character, rb(0.158, 0.05, 0.165, 0.02), strap, [side * 0.105, 0.163, 0.002]);
    mesh(character, rb(0.11, 0.022, 0.2, 0.008), pantsDark, [side * 0.105, 0.148, 0.02]);
  });

  /* hips + belt */
  mesh(character, rb(0.335, 0.2, 0.245, 0.06), pants, [0, 0.955, 0]);
  mesh(character, rb(0.345, 0.055, 0.255, 0.02), strap, [0, 1.045, 0]);
  mesh(character, rb(0.06, 0.035, 0.022, 0.008), metal, [0, 1.045, 0.131]);

  /* right thigh drop holster */
  mesh(character, rb(0.07, 0.175, 0.1, 0.025), strap, [0.207, 0.705, 0.04]);
  mesh(character, rb(0.082, 0.022, 0.112, 0.008), signal, [0.207, 0.782, 0.04]);
  mesh(character, rb(0.052, 0.05, 0.07, 0.018), metal, [0.207, 0.63, 0.055], [0.2, 0, 0]);

  /* torso */
  mesh(character, rb(0.355, 0.46, 0.235, 0.07), shirt, [0, 1.245, 0]);
  mesh(character, rb(0.405, 0.36, 0.285, 0.07), vest, [0, 1.255, 0]);
  mesh(character, rb(0.3, 0.285, 0.055, 0.02), plate, [0, 1.265, 0.15]);
  mesh(character, rb(0.29, 0.25, 0.045, 0.02), plate, [0, 1.275, -0.15]);
  mesh(character, rb(0.392, 0.085, 0.292, 0.03), vestDark, [0, 1.09, 0]);
  mesh(character, rb(0.34, 0.012, 0.01, 0.004), strap, [0, 1.19, 0.198]);

  /* shoulder straps */
  mesh(character, rb(0.075, 0.034, 0.3, 0.012), strap, [0.115, 1.446, 0]);
  mesh(character, rb(0.075, 0.034, 0.3, 0.012), strap, [-0.115, 1.446, 0]);

  /* mag pouches + patch */
  [-0.09, 0, 0.09].forEach((x) => {
    mesh(character, rb(0.072, 0.105, 0.045, 0.014), vestDark, [x, 1.155, 0.185]);
  });
  mesh(character, rb(0.055, 0.03, 0.014, 0.006), signal, [0.085, 1.338, 0.182]);
  mesh(character, rb(0.075, 0.012, 0.016, 0.004), strap, [-0.085, 1.338, 0.182]);

  /* backpack */
  mesh(character, rb(0.24, 0.24, 0.12, 0.045), pantsDark, [0, 1.27, -0.205]);
  mesh(character, rb(0.048, 0.19, 0.022, 0.008), signal, [0, 1.27, -0.27]);

  /* collar + neck */
  mesh(character, new THREE.CylinderGeometry(0.1, 0.108, 0.075, 18), vest, [0, 1.455, 0]);
  mesh(character, new THREE.CylinderGeometry(0.062, 0.066, 0.11, 16), skin, [0, 1.5, 0]);

  /* arms */
  const arms = [];
  [-1, 1].forEach((side) => {
    const arm = new THREE.Group();
    arm.position.set(side * 0.25, 1.375, 0);
    /* right arm carries a little more weight, left hangs loose */
    arm.rotation.set(side === 1 ? -0.04 : 0.08, 0, side * 0.12);
    character.add(arm);
    arms.push(arm);

    mesh(arm, rb(0.142, 0.115, 0.168, 0.028), vest, [side * 0.012, 0.01, 0]);
    mesh(arm, capsule(0.062, 0.185), shirt, [0, -0.16, 0]);

    const forearm = new THREE.Group();
    forearm.position.set(0, -0.318, 0);
    forearm.rotation.x = side === 1 ? -0.95 : -0.28;
    forearm.rotation.z = side * -0.05;
    arm.add(forearm);

    mesh(forearm, rb(0.115, 0.1, 0.125, 0.03), vestDark, [side * 0.008, 0.002, 0]);
    mesh(forearm, capsule(0.052, 0.175), shirt, [0, -0.135, 0]);
    mesh(forearm, rb(0.078, 0.095, 0.1, 0.028), glove, [0, -0.268, 0.014]);
    mesh(forearm, rb(0.082, 0.02, 0.104, 0.008), strap, [0, -0.222, 0.012]);
    mesh(forearm, rb(0.055, 0.045, 0.06, 0.02), strap, [side * 0.002, -0.308, 0.048]);
  });

  /* head */
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 1.625, 0);
  headPivot.scale.setScalar(1.06);
  character.add(headPivot);

  const skull = mesh(headPivot, new THREE.SphereGeometry(0.135, 32, 26), skin, [0, 0.02, 0.006]);
  skull.scale.set(0.97, 1.13, 1.02);
  const jaw = mesh(headPivot, new THREE.SphereGeometry(0.105, 24, 20), skin, [0, -0.04, 0.026]);
  jaw.scale.set(0.93, 0.9, 0.93);

  const hairBack = mesh(headPivot, new THREE.SphereGeometry(0.149, 28, 22), hair, [0, 0.03, -0.03]);
  hairBack.scale.set(1.02, 1.06, 1.0);
  const bun = mesh(headPivot, new THREE.SphereGeometry(0.078, 22, 18), hair, [0, 0.064, -0.158]);
  bun.scale.set(1, 1.08, 0.95);

  /* temple strands frame the face */
  [-1, 1].forEach((side) => {
    const strand = mesh(
      headPivot,
      new THREE.SphereGeometry(0.046, 16, 14),
      hair,
      [side * 0.112, 0.035, 0.036],
      [0, 0, side * 0.16],
    );
    strand.scale.set(0.85, 1.5, 0.8);
  });

  /* soft centre-parted fringe */
  const fringeL = mesh(headPivot, new THREE.SphereGeometry(0.062, 18, 14), hair, [0.05, 0.078, 0.108]);
  fringeL.scale.set(1.6, 0.52, 0.95);
  fringeL.rotation.set(-0.2, 0.1, -0.45);
  const fringeR = mesh(headPivot, new THREE.SphereGeometry(0.056, 18, 14), hair, [-0.052, 0.082, 0.106]);
  fringeR.scale.set(1.55, 0.5, 0.95);
  fringeR.rotation.set(-0.2, -0.1, 0.48);

  [-1, 1].forEach((side) => {
    mesh(headPivot, new THREE.SphereGeometry(0.0128, 14, 12), hair, [side * 0.045, 0.018, 0.133]);
    mesh(headPivot, rb(0.035, 0.0045, 0.008, 0.002), hair, [side * 0.045, 0.036, 0.135], [0, 0, side * 0.06]);
    mesh(headPivot, rb(0.042, 0.0085, 0.014, 0.004), hair, [side * 0.047, 0.057, 0.129], [0, 0, side * 0.1]);
  });
  const nose = mesh(headPivot, new THREE.SphereGeometry(0.021, 16, 12), skin, [0, -0.008, 0.135]);
  nose.scale.set(0.82, 1.25, 0.9);
  mesh(headPivot, rb(0.042, 0.009, 0.012, 0.004), skinShadow, [0, -0.063, 0.129]);

  /* headset + boom mic */
  mesh(headPivot, new THREE.CylinderGeometry(0.034, 0.034, 0.03, 18), strap, [0.145, 0.018, -0.014], [0, 0, Math.PI / 2]);
  mesh(headPivot, new THREE.TorusGeometry(0.025, 0.004, 6, 20), signal, [0.16, 0.018, -0.014], [0, Math.PI / 2, 0]);
  const micCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.142, 0.008, -0.008),
    new THREE.Vector3(0.152, -0.055, 0.05),
    new THREE.Vector3(0.086, -0.078, 0.104),
  ]);
  mesh(headPivot, new THREE.TubeGeometry(micCurve, 22, 0.005, 6, false), strap);
  mesh(headPivot, new THREE.SphereGeometry(0.013, 12, 10), signal, [0.083, -0.08, 0.107]);
  mesh(headPivot, new THREE.SphereGeometry(0.009, 10, 8), strap, [-0.146, 0.018, -0.014]);

  /* equipment markers */
  const anchors = {
    head: new THREE.Object3D(),
    chest: new THREE.Object3D(),
    leg: new THREE.Object3D(),
  };
  anchors.head.position.set(0.01, 0.116, 0.05);
  headPivot.add(anchors.head);
  anchors.chest.position.set(0.022, 1.302, 0.2);
  character.add(anchors.chest);
  anchors.leg.position.set(0.21, 0.742, 0.11);
  character.add(anchors.leg);

  /* ---------- platform ---------- */

  const platform = new THREE.Group();
  scene.add(platform);

  /* unlit pad so the rim light stays on the character, with a separate
     shadow catcher to keep her grounded */
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(0.64, 72),
    new THREE.MeshBasicMaterial({ color: 0x0b0e0f }),
  );
  disc.rotation.x = -Math.PI / 2;
  platform.add(disc);

  const shadowCatcher = new THREE.Mesh(
    new THREE.CircleGeometry(0.635, 72),
    new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.5 }),
  );
  shadowCatcher.rotation.x = -Math.PI / 2;
  shadowCatcher.position.y = 0.001;
  shadowCatcher.receiveShadow = true;
  platform.add(shadowCatcher);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.64, 0.0034, 6, 120),
    new THREE.MeshBasicMaterial({ color: 0xff5a1f, transparent: true, opacity: 0.45 }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.004;
  platform.add(ring);

  const ringOuter = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.0022, 6, 120),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.14 }),
  );
  ringOuter.rotation.x = -Math.PI / 2;
  ringOuter.position.y = 0.003;
  platform.add(ringOuter);

  const glowTexture = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(255,104,52,0.13)');
    gradient.addColorStop(0.4, 'rgba(255,90,31,0.04)');
    gradient.addColorStop(1, 'rgba(255,90,31,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  })();

  const glow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.4),
    new THREE.MeshBasicMaterial({
      map: glowTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.4,
    }),
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.002;
  platform.add(glow);

  /* ---------- particles ---------- */

  const PARTICLE_COUNT = 110;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = [];

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const radius = 0.34 + Math.random() * 0.6;
    const angle = Math.random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.random() * 2.05;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    seeds.push(0.03 + Math.random() * 0.08);
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff8a5c,
    size: 0.014,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  /* ---------- lights ---------- */

  scene.add(new THREE.HemisphereLight(0x9db4c4, 0x0a0c0d, 0.85));

  const key = new THREE.DirectionalLight(0xfff3e6, 3.4);
  key.position.set(2.5, 3.3, 2.7);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 9;
  key.shadow.camera.left = -1.6;
  key.shadow.camera.right = 1.6;
  key.shadow.camera.top = 2.6;
  key.shadow.camera.bottom = -0.4;
  key.shadow.bias = -0.0009;
  scene.add(key);

  const rim = new THREE.SpotLight(0xff5a1f, 120, 12, 0.95, 0.75, 1.5);
  rim.position.set(-2.3, 2.7, -2.3);
  rim.target.position.set(0, 1.15, 0);
  scene.add(rim);
  scene.add(rim.target);

  const fill = new THREE.PointLight(0x4f8fb0, 26, 8, 2);
  fill.position.set(-2.1, 1.25, 1.9);
  scene.add(fill);

  const front = new THREE.DirectionalLight(0xffffff, 1.1);
  front.position.set(0.2, 1.5, 3.4);
  scene.add(front);

  const faceFill = new THREE.PointLight(0xffd6bf, 2.2, 5, 2);
  faceFill.position.set(0.5, 1.95, 1.85);
  scene.add(faceFill);

  /* ---------- view state ---------- */

  let autoRotateOn = true;
  let wireframeOn = false;
  let running = false;
  let disposed = false;
  let rafId = 0;
  let elapsed = 0;
  let ready = false;

  const clock = new THREE.Clock();
  const projected = new THREE.Vector3();

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = width / height < 1 ? 40 : 32;
    camera.updateProjectionMatrix();
  }

  function updateLabels() {
    if (!options.getLabels) return;
    const map = options.getLabels();
    if (!map) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    Object.keys(anchors).forEach((id) => {
      const element = map[id];
      if (!element) return;
      anchors[id].getWorldPosition(projected);
      projected.project(camera);

      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      const visible =
        projected.z < 1 &&
        projected.x > -1.2 &&
        projected.x < 1.2 &&
        y > -30 &&
        y < height + 30;

      element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      const next = visible ? '1' : '0';
      if (element.dataset.vis !== next) element.dataset.vis = next;
    });
  }

  function frame() {
    if (!running) return;
    rafId = requestAnimationFrame(frame);

    const delta = Math.min(clock.getDelta(), 0.05);
    elapsed += delta;

    if (!ready) {
      ready = true;
      container.dataset.ready = 'true';
    }

    character.position.y = Math.sin(elapsed * 1.5) * 0.006;
    headPivot.rotation.y = Math.sin(elapsed * 0.55) * 0.1;
    headPivot.rotation.x = Math.sin(elapsed * 0.42) * 0.026;

    arms.forEach((arm, i) => {
      const side = i === 0 ? -1 : 1;
      arm.rotation.z = side * 0.1 + Math.sin(elapsed * 0.9 + i * 1.4) * 0.012;
    });

    particles.rotation.y = elapsed * 0.03;
    const array = particleGeometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      array[i * 3 + 1] += seeds[i] * delta;
      if (array[i * 3 + 1] > 2.1) array[i * 3 + 1] = 0.02;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    ring.material.opacity = 0.4 + Math.sin(elapsed * 1.4) * 0.12;
    ringOuter.rotation.z = elapsed * 0.05;
    glow.material.opacity = 0.34 + Math.sin(elapsed * 1.1) * 0.07;

    controls.update();
    renderer.render(scene, camera);
    updateLabels();
  }

  function start() {
    if (running || disposed) return;
    resize();
    clock.getDelta();
    running = true;
    frame();
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function setActive(active) {
    if (active) start();
    else stop();
  }

  function setAutoRotate(on) {
    autoRotateOn = !!on;
    controls.autoRotate = autoRotateOn;
  }

  function setWireframe(on) {
    wireframeOn = !!on;
    materials.forEach((mat) => {
      mat.wireframe = wireframeOn;
    });
  }

  function resetView() {
    camera.position.copy(homePosition);
    controls.target.copy(homeTarget);
    controls.update();
    controls.autoRotate = autoRotateOn;
  }

  const resizeObserver = new ResizeObserver(() => {
    resize();
    if (!running) renderer.render(scene, camera);
  });
  resizeObserver.observe(container);

  resize();

  function dispose() {
    disposed = true;
    stop();
    resizeObserver.disconnect();
    controls.dispose();

    const geometries = new Set();
    scene.traverse((object) => {
      if (object.isMesh || object.isPoints) {
        geometries.add(object.geometry);
      }
    });
    geometries.forEach((geometry) => geometry?.dispose());

    materials.forEach((mat) => {
      mat.map?.dispose();
      mat.dispose();
    });
    particleMaterial.dispose();
    particleGeometry.dispose();
    glowTexture.dispose();
    platform.traverse((object) => {
      if (object.isMesh) {
        object.material.dispose();
        object.geometry.dispose();
      }
    });

    renderer.dispose();
    renderer.forceContextLoss?.();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
    delete container.dataset.ready;
  }

  return {
    setActive,
    setAutoRotate,
    setWireframe,
    resetView,
    resize,
    dispose,
    start,
    stop,
  };
}
