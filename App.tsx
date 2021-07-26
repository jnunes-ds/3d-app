import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Expo from 'expo';
import {Scene, Mesh, MeshBasicMaterial, PerspectiveCamera, BoxBufferGeometry} from 'three';
import ExpoTHREE, {THREE, Renderer} from 'expo-three';
import {ExpoWebGLRenderingContext, GLView} from 'expo-gl';

interface CanvasProps{
  width: number;
  height: number;
}

interface Props extends ExpoWebGLRenderingContext{
  canvas: CanvasProps;
}

export default function App(){

  async function onContextCreate(gl: Props){
    //THREE.js code
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth/gl.drawingBufferHeight,
      0.1,
      1000
    );

    gl.canvas = {width: gl.drawingBufferWidth, height: gl.drawingBufferHeight}
    camera.position.z = 2;

    const renderer = new Renderer({gl});
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry =  new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: 'blue'
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    function render(){
      requestAnimationFrame(render);
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
    width: 500,
    height: 500
  }
});