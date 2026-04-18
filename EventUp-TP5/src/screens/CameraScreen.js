import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Camera as CameraIcon, X, Check } from 'lucide-react-native';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const tirarFoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>Sem acesso à câmara</Text>;

  return (
    <View style={styles.container}>
      {!photo ? (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureBtn} onPress={tirarFoto}>
              <CameraIcon color="#fff" size={32} />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={styles.preview}>
          <Image source={{ uri: photo }} style={styles.image} />
          <View style={styles.confirmRow}>
            <TouchableOpacity onPress={() => setPhoto(null)} style={styles.btnCancel}>
              <X color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnOk}>
              <Check color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1, justifyContent: 'flex-end' },
  buttonContainer: { padding: 30, alignItems: 'center' },
  captureBtn: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#677019', justifyContent: 'center', alignItems: 'center' },
  preview: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, resizeMode: 'contain' },
  confirmRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  btnCancel: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 30 },
  btnOk: { backgroundColor: '#2ecc71', padding: 15, borderRadius: 30 }
});