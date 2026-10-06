// The hero star in WebGL: the traced outline, extruded. It turns into place once, then follows
// the pointer. Loaded on demand (see Hero.astro) so three.js never reaches phones.
import {
  AmbientLight,
  DirectionalLight,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  OrthographicCamera,
  Scene,
  Shape,
  WebGLRenderer,
} from "three";
import { watchVisibility } from "./client";
import { STAR_POINTS } from "./star";

// Matches --color-gold. three.js applies no tone mapping by default, so the face-on colour
// stays the brand gold instead of drifting warmer or paler.
const GOLD = "#ECAF42";
// Resting pose (radians): turned slightly so the star reads as an object, not a flat shape.
const REST = { x: 0.08, y: -0.3 };
// Where it starts, so it turns into place once when it first appears.
const ENTRANCE_Y = -1.25;

function starGeometry(): ExtrudeGeometry {
  const shape = new Shape();
  STAR_POINTS.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, -y);
    else shape.lineTo(x, -y);
  });
  shape.closePath();
  // The bevel is offset inwards by its own size, so the silhouette is exactly the traced star.
  const geometry = new ExtrudeGeometry(shape, {
    depth: 7,
    bevelEnabled: true,
    bevelThickness: 2.4,
    bevelSize: 1.1,
    bevelOffset: -1.1,
    bevelSegments: 6,
    curveSegments: 1,
  });
  geometry.center();
  return geometry;
}

/**
 * Renders the star into `host`, filling it exactly as the static SVG star does. Frames are
 * drawn only while the star is still moving toward the pointer, and never while off screen.
 */
export function mountStar(host: HTMLElement, onReady: () => void): void {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 3000);
  camera.position.z = 1000;
  const key = new DirectionalLight("#ffffff", 1.25);
  key.position.set(-0.5, 0.9, 1);
  scene.add(new AmbientLight("#ffffff", 2.1), key);

  const star = new Mesh(
    starGeometry(),
    new MeshStandardMaterial({ color: GOLD, roughness: 0.62, metalness: 0 }),
  );
  star.rotation.set(REST.x, ENTRANCE_Y, 0);
  scene.add(star);

  const pointer = { x: 0, y: 0 };
  let visible = true;
  let frame = 0;
  let last = 0;
  let announced = false;

  const draw = (now: number) => {
    frame = 0;
    const ease = Math.min(1, Math.min((now - last) / 1000, 1 / 30) * 2.4);
    last = now;
    const dy = REST.y + pointer.x * 0.5 - star.rotation.y;
    const dx = REST.x + pointer.y * 0.22 - star.rotation.x;
    star.rotation.y += dy * ease;
    star.rotation.x += dx * ease;
    renderer.render(scene, camera);
    if (!announced) {
      announced = true;
      onReady();
    }
    if (Math.abs(dx) + Math.abs(dy) > 0.0008) request();
  };
  const request = () => {
    if (!frame && visible) frame = requestAnimationFrame(draw);
  };

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = host;
    renderer.setSize(width, height, false);
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    star.scale.setScalar(height / 100);
    request();
  };
  new ResizeObserver(resize).observe(host);

  addEventListener(
    "pointermove",
    (event) => {
      pointer.x = (event.clientX / innerWidth) * 2 - 1;
      pointer.y = (event.clientY / innerHeight) * 2 - 1;
      request();
    },
    { passive: true },
  );
  watchVisibility(host, (onScreen) => {
    visible = onScreen;
    request();
  });
}
