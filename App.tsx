import React from 'react';
import { View, StyleSheet } from 'react-native';
import Expo from 'expo';
import {
  Scene,
  Mesh,
  PerspectiveCamera, 
  BoxBufferGeometry, 
  AmbientLight,
  MeshStandardMaterial,
  Color,
  DirectionalLight,
  Vector3
} from 'three';
import ExpoTHREE, {Renderer} from 'expo-three';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';

interface CanvasProps{
  width: number;
  height: number;
}

interface GLProps extends ExpoWebGLRenderingContext{
  canvas: CanvasProps;
}

export default function App(){

  async function onContextCreate(gl: GLProps){
    //THREE.js code
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      100,
      width / height,
      0.1,
      1000
    );
    const ambientLightColor = new Color(0x454545);
    const ambientLight = new AmbientLight(ambientLightColor);
    scene.add(ambientLight);

    const directionalLightColor = new Color(0xFFFFFF);
    const directionalLight = new DirectionalLight(directionalLightColor, 1);
    directionalLight.position.set(3, 3, 3);
    scene.add(directionalLight);
    
    gl.canvas = {width, height}
    camera.position.z = 2;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry =  new BoxBufferGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({
      color: 0x4f5589
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    function update(){
      if(cube.rotation.x <= 12.555){
        cube.rotation.x += 0.01;
      }else{
        cube.rotation.x = 0;
      }

      if(cube.rotation.y <= 12.555){
        cube.rotation.y += 0.01;
      }else{
        cube.rotation.y = 0;
      }
    }

    function render(){
      requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    }

    render();
  } 
  
  return (
    <View style={styles.container}>
      <GLView 
        onContextCreate={onContextCreate}
        style={styles.GLView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  GLView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#212121'
  }
});