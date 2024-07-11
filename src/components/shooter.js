
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import React, { useEffect, useRef } from 'react';

const Shooter = () => {
    const mountRef = useRef(null);
    class Thre {
        constructor(mountRef) {
          // Set up the scene, camera, and renderer
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          this.camera.position.set(0, 0, 4);
    
          // Set up lights
          const ambientLight = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.5);
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(0.2, 1, 1);
    
          this.scene.add(ambientLight);
          this.scene.add(directionalLight);
    
          this.renderer = new THREE.WebGLRenderer({ antialias: true });
          this.renderer.setSize(window.innerWidth, window.innerHeight);
          this.renderer.setAnimationLoop(this.render.bind(this));
          this.scene.background = new THREE.Color(0xaaaaaa);
    
          // Create star geometry
          const geometry = new THREE.BoxGeometry()
          const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
          this.mesh = new THREE.Mesh(geometry, material);
          this.scene.add(this.mesh);
    
          this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    
          // Append the renderer to the DOM
          if (mountRef.current) {
            mountRef.current.appendChild(this.renderer.domElement);
          } else {
            console.error('Mount reference not found');
            return;
          }
    
       
        }
    
       
    
        // Render function
        render() {
          this.mesh.rotateY(0.01);
          this.renderer.render(this.scene, this.camera);
        }
      };

      useEffect(() => {
        // Create a new instance of Thre class
        const threInstance = new Thre(mountRef, false);
    
        // Clean up on component unmount
        return () => {
          if (mountRef.current) {
            mountRef.current.removeChild(threInstance.renderer.domElement);
          }
        };
      }, []);
  return (
    <div>
        <h1>Andy's First Video Game</h1>
       <div ref={mountRef}></div>
    </div>
  )
}

export default Shooter
