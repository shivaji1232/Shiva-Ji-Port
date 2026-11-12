import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobileQuery = window.matchMedia("(max-width: 700px)");

function makeBronzeMaterial(options = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: 0x9a734a,
    roughness: 0.3,
    metalness: 0.68,
    clearcoat: 0.7,
    clearcoatRoughness: 0.24,
    ...options
  });
}

function addStudioLighting(scene) {
  scene.add(new THREE.HemisphereLight(0xd8d0c2, 0x171817, 1.45));
  const key = new THREE.PointLight(0xffdfbd, 30, 20);
  key.position.set(-3.5, 4, 5);
  scene.add(key);
  const fill = new THREE.PointLight(0xc5c8bf, 12, 18);
  fill.position.set(4, -1.5, 3);
  scene.add(fill);
  const rim = new THREE.PointLight(0xb1845b, 20, 17);
  rim.position.set(0, 3, -4);
  scene.add(rim);
}

function addDust(scene, count, radius) {
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * radius * 2;
    positions[offset + 1] = (Math.random() - 0.5) * radius * 2;
    positions[offset + 2] = (Math.random() - 0.5) * radius * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xc3a17d,
    size: mobileQuery.matches ? 0.012 : 0.016,
    transparent: true,
    opacity: 0.22,
    sizeAttenuation: true,
    depthWrite: false
  });
  const dust = new THREE.Points(geometry, material);
  scene.add(dust);
  return dust;
}

function createHeroSculpture(scene) {
  const group = new THREE.Group();
  group.position.set(0.35, 0, 0);
  scene.add(group);
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.16, 0.3, 192, 24, 2, 3),
    makeBronzeMaterial()
  );
  knot.rotation.set(0.25, -0.3, -0.18);
  group.add(knot);
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(1.9, 0.008, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0xb18a61, transparent: true, opacity: 0.38 })
  );
  orbit.rotation.set(1.12, 0.38, -0.35);
  group.add(orbit);
  return { group, knot, orbit };
}

function createUniverseSculpture(scene) {
  const group = new THREE.Group();
  group.position.set(0.4, 0, 0);
  scene.add(group);
  const material = makeBronzeMaterial({ roughness: 0.36, metalness: 0.58 });
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.78, 0.19, 144, 18, 2, 3),
    material
  );
  knot.position.set(0, 0.1, 0);
  group.add(knot);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 28, 20), material);
  orb.position.set(-1.55, 0.7, -0.25);
  group.add(orb);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.075, 18, 64), material);
  ring.position.set(1.6, -0.72, -0.25);
  ring.rotation.set(0.55, 0.25, -0.55);
  group.add(ring);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xb18a61,
    transparent: true,
    opacity: 0.24
  });
  const connections = [
    [[-1.4, 0.62, -0.22], [-0.67, 0.2, -0.05]],
    [[0.66, -0.23, -0.05], [1.32, -0.58, -0.22]]
  ];
  connections.forEach(points => {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map(point => new THREE.Vector3(...point))
    );
    group.add(new THREE.Line(geometry, lineMaterial));
  });
  return { group, knot, orb, ring };
}

function updateSize(host, renderer, camera) {
  const { width, height } = host.getBoundingClientRect();
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function createScene({ host, canvas, type }) {
  if (!host || !canvas) throw new Error(`Missing canvas for the ${type} scene.`);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  camera.position.set(0, 0, type === "hero" ? 7.8 : 8.8);
  addStudioLighting(scene);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobileQuery.matches,
    powerPreference: "low-power"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobileQuery.matches ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const dust = addDust(scene, mobileQuery.matches ? 30 : 72, type === "hero" ? 5.8 : 6.8);
  const sculpture = type === "hero" ? createHeroSculpture(scene) : createUniverseSculpture(scene);
  const clock = new THREE.Clock();
  let visible = false;
  let frameId = 0;
  let disposed = false;
  let targetX = 0;
  let targetY = 0;

  const render = () => renderer.render(scene, camera);
  const stop = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
  };
  const animate = () => {
    if (disposed || !visible || document.hidden || reducedMotion) {
      frameId = 0;
      return;
    }
    frameId = requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    sculpture.group.rotation.y += (targetX * 0.18 - sculpture.group.rotation.y) * 0.012;
    sculpture.group.rotation.x += (targetY * 0.14 - sculpture.group.rotation.x) * 0.012;
    sculpture.group.rotation.y += type === "hero" ? 0.0021 : 0.00135;
    sculpture.group.rotation.z = Math.sin(time * 0.1) * 0.014;
    dust.rotation.y = time * 0.001;

    if (type === "hero") {
      sculpture.knot.rotation.y += 0.0018;
      sculpture.orbit.rotation.z += 0.00054;
    } else {
      sculpture.knot.rotation.y += 0.00135;
      sculpture.orb.rotation.y += 0.001;
      sculpture.ring.rotation.z -= 0.00035;
      sculpture.orb.position.y = 0.7 + Math.sin(time * 0.22) * 0.025;
    }
    camera.position.x += (targetX * 0.12 - camera.position.x) * 0.01;
    camera.position.y += (-targetY * 0.1 - camera.position.y) * 0.01;
    camera.lookAt(0, 0, 0);
    render();
  };
  const start = () => {
    if (!frameId && visible && !document.hidden && !reducedMotion) {
      clock.start();
      frameId = requestAnimationFrame(animate);
    }
  };
  const onPointerMove = event => {
    const bounds = host.getBoundingClientRect();
    targetX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    targetY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
  };
  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };
  const onVisibilityChange = () => document.hidden ? stop() : start();
  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) {
        render();
        start();
      } else {
        stop();
      }
    }, { threshold: 0.01 })
    : null;

  updateSize(host, renderer, camera);
  render();
  if (observer) observer.observe(host);
  else {
    visible = true;
    start();
  }
  host.addEventListener("pointermove", onPointerMove, { passive: true });
  host.addEventListener("pointerleave", onPointerLeave, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  const onResize = () => {
    updateSize(host, renderer, camera);
    render();
  };
  const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
  if (resizeObserver) resizeObserver.observe(host);
  else window.addEventListener("resize", onResize);

  return () => {
    disposed = true;
    stop();
    observer?.disconnect();
    resizeObserver?.disconnect();
    window.removeEventListener("resize", onResize);
    host.removeEventListener("pointermove", onPointerMove);
    host.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    scene.traverse(object => {
      object.geometry?.dispose();
      if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
      else object.material?.dispose();
    });
    renderer.dispose();
  };
}

export { createScene };
