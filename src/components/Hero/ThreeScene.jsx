import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { getImageUrl } from "../../utils";

export default function ThreeScene() {
  const mountRef = useRef(null);
  const [transformDone, setTransformDone] = useState(false);
  const playClipRef = useRef(() => {});

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 600;
    const height = mountRef.current.clientHeight || 300;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.001, 10000);
    camera.position.set(0, 0.3, 2.5);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power', preserveDrawingBuffer: false });
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.Light(0xffffff, 5);
    scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 4);
    hemiLight.position.set(1, 1, 0);
    scene.add(hemiLight);
    // Removed axes helper for clean look

    const loader = new GLTFLoader();
    let model = null;
    let mixer = null;
    let rafId = null;
    let isInView = true;
    let targetFps = 30; // throttle to reduce load while keeping motion
    let lastFrameTime = 0;
    const clock = new THREE.Clock();
    let clips = [];
    let joyfulClip = null;
    let dashClip = null;
    let transformClip = null;
    let isHoverPlaying = false;
    let playedThisHover = false;
      let transformPlayedEver = false; // do not transform again after first hover
    let currentClip = null;
    let joyfulCount = 0;
    let dashCount = 0;
    const JOYFUL_REPEAT = 0; // idle/joyful should run only once
    const DASH_REPEAT = 1;   // dash should run only once

    loader.load(
      getImageUrl("hero/bumble.glb"),
      (gltf) => {
        model = gltf.scene;
        console.log("GLB loaded:", model);
        // List all animation clips available in the GLB
        if (gltf.animations && gltf.animations.length > 0) {
          console.log(
            "Available animations (", gltf.animations.length, "):",
            gltf.animations.map((clip, i) => ({
              index: i,
              name: clip.name || `(unnamed-${i})`,
              durationSec: Number(clip.duration.toFixed(3)),
            }))
          );
        } else {
          console.log("No animations found in GLB.");
        }
        // Center and scale model to fit view
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center); // center at origin

        // Fit camera to model based on bounding box and aspect
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = maxDim; // true model size
        if (maxDim > 0) {
          const scale = 3.3 / maxDim; // modest scale to fit nicely
          model.scale.setScalar(scale);
        }

        scene.add(model);

        const fov = THREE.MathUtils.degToRad(camera.fov);
        const fitHeightDistance = (targetSize * model.scale.y) / (2 * Math.tan(fov / 2));
        const fitWidthDistance = (targetSize * model.scale.x) / (2 * Math.tan(fov / 2)) / camera.aspect;
        const distance = Math.max(fitHeightDistance, fitWidthDistance);
        camera.position.set(0, 1.0, distance * 1.6); // pull back a bit more to avoid frustum clipping
        camera.lookAt(0, 0, 0);

        // Set initial orientation
        model.rotation.y = -Math.PI / 0.44;

        // Collect clips and set joyful + dash + transform
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          clips = gltf.animations;

          // Exact names per your list
          joyfulClip = clips.find(c => c.name === 'idle01') || clips.find(c => /idle01/i.test(c.name));
          dashClip = clips.find(c => c.name === 'dash') || clips.find(c => /dash/i.test(c.name));
          transformClip = clips.find(c => /transform/i.test(c.name)) || null;

          // Trim idle01 to play only the ending part (tail)
          // if (joyfulClip) {
          //   const fps = 30; // assumed frames per second
          //   const totalFrames = Math.max(1, Math.floor(joyfulClip.duration * fps));
          //   const startFrame = 10; // last 30%
          //   const endFrame = totalFrames;
          //   const trimmed = THREE.AnimationUtils.subclip(
          //     joyfulClip,
          //     'idle01_tail',
          //     startFrame,
          //     endFrame,
          //     fps
          //   );
          //   joyfulClip = trimmed;
          // }

          const playClip = (clip, { loopOnce = true } = {}) => {
            if (!clip) return;
            const action = mixer.clipAction(clip);
            mixer.stopAllAction();
            action.reset();
            action.setLoop(loopOnce ? THREE.LoopOnce : THREE.LoopRepeat, loopOnce ? 0 : Infinity);
            action.clampWhenFinished = true;
            action.fadeIn(0.5).play();
            currentClip = clip;
            return action;
          };

          // Expose playClip to UI buttons
          playClipRef.current = (name) => {
            const findBy = (regex) => clips.find(c => regex.test(c.name || ""));
            let clip = null;
            switch (name) {
              case 'transform':
                clip = transformClip; break;
              case 'run':
                clip = findBy(/run|walk|move/i); break;
              case 'rage':
                clip = findBy(/rage|attack|fight/i); break;
              case 'dash':
                clip = dashClip; break;
              case 'idle':
                clip = joyfulClip; break;
              default:
                clip = joyfulClip;
            }
            if (clip) playClip(clip, { loopOnce: true });
          };

          // Sequence: play joyful JOYFUL_REPEAT times, then dash DASH_REPEAT times, then repeat
          // const playSequenceNext = () => {
          //   if (isHoverPlaying) return; // ignore while hover playing
          //   if (joyfulCount < JOYFUL_REPEAT && joyfulClip) {
          //     playClip(joyfulClip, { loopOnce: false });
          //   } else if (dashCount < DASH_REPEAT && dashClip) {
          //     playClip(dashClip, { loopOnce: true });
          //   } else {
          //     // Sequence finished: keep last pose, no further auto-play
          //     mixer.stopAllAction();
          //     currentClip = null;
          //   }
          // };

          // mixer.addEventListener('finished', () => {
          //   if (playedThisHover==false) {
          //     // transform clip finished

          //     isHoverPlaying = false;

          //     playSequenceNext();
          //     return;
          //   }
          //   // increment counters based on last clip played
          //   if (currentClip) {
          //     if (currentClip === joyfulClip) joyfulCount++;
          //     else if (currentClip === dashClip) dashCount++;
          //   }
          //   playSequenceNext();
          // });

          // Start sequence
          // playSequenceNext();
          playClip(joyfulClip, { loopOnce: true });
          // Hover handling: play transform once per hover, then resume sequence
          if (transformClip && mountRef.current) {
            const onEnter = () => {
              if (playedThisHover || transformPlayedEver) return; // don't replay during same hover or after first time ever
                            transformPlayedEver = true; // never allow transform again
              playedThisHover = true;
              isHoverPlaying = true;
              playClip(transformClip, { loopOnce: true });
              setTransformDone(true);
            };
            const onLeave = () => {
              playedThisHover = false; 
              isHoverPlaying = false;
              // setTimeout(() => {
              //   // After transform, play joyful again
              //   playClip(joyfulClip, { loopOnce: true });
              // }, 1000);

              // setTimeout(() => {
              //   // After transform, play joyful again
              //   playClip(clips.find(c => c.name === 'vehicle_idle01'), { loopOnce: true });
              // }, 10000);
            
              // playClip(joyfulClip, { loopOnce: true });

            //  setTimeout(() => {
            //   playClip(joyfulClip, { loopOnce: true });
            //  }, timeout);
            }
            mountRef.current.addEventListener('mouseenter', onEnter);
            mountRef.current.addEventListener('mouseleave', onLeave);
            // ensure cleanup removes listeners
          }
        }

        // Start the animation loop
        animate();
      },
      undefined,
      (error) => {
        console.error("Failed to load bumble.glb:", error);
      }
    );

    function renderScene() {
      renderer.render(scene, camera);
    }

    function animate(timestamp = 0) {
      const delta = clock.getDelta();
      if (!lastFrameTime || (timestamp - lastFrameTime) >= (1000 / targetFps)) {
        lastFrameTime = timestamp;
        if (mixer) mixer.update(delta);
        // Continuous gentle rotation when not playing hover transform
        if (model && !isHoverPlaying) {
          model.rotation.y += 0.01;
        }
        renderScene();
      }
      rafId = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(1);
      renderScene();
    }
    window.addEventListener("resize", handleResize);

    // Adjust FPS when out of view to avoid scroll lag but keep animation alive
    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      isInView = entry.isIntersecting;
      targetFps = isInView ? 30 : 15;
    }, { root: null, threshold: 0.0 });
    io.observe(mountRef.current);

    function cleanup() {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      renderer.dispose();
      if (renderer.domElement && mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    }
    return cleanup;
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        
        overflow: "visible",
        zIndex: 5,
      }}
    >
      {transformDone && (
        <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['idle','dash','rage','transform'].map((label) => (
            <button
              key={label}
              onClick={() => playClipRef.current(label)}
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: 'none',
                background: '#576cbc',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
