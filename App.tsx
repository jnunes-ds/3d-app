import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Expo from 'expo';
import {Scene, Mesh, MeshBasicMaterial, PerspectiveCamera} from 'three';
import ExpoTHREE, {THREE, Renderer} from 'expo-three';
import {ExpoWebGLRenderingContext} from 'expo-gl';

export default function App(){
  
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});