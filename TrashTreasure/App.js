import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Convert Base64 string to a Blob
const convertBase64ToBlob = (base64) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};

const LandingPage = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const takePicture = async () => {
    console.log('Requesting camera permissions...');
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(`Camera permission status: ${status}`);
    if (status !== 'granted') {
      alert('Camera permission is required to take pictures');
      return;
    }

    console.log('Launching camera...');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(`Camera launch result: ${JSON.stringify(result)}`);

    if (!result.cancelled) {
      handleImagePicked(result.assets[0].uri);
    }
  };

  const handleImagePicked = async (uri) => {
    setImage(uri);

    const blob = convertBase64ToBlob(uri);
    const formData = new FormData();
    // Extracting file extension based on MIME type
    const extension = blob.type.split('/')[1]; // Assumes 'image/png' => 'png'
    formData.append('file', blob, `image.${extension}`); // Use the dynamic extension


    try {
      // Make the request to the specified URL
      const response = await axios({
        method: 'post',
        url: 'http://192.168.1.108:5000/predict',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Response:', response.data);
      setPrediction(response.data.predicted_class)
      // Handle response here
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error here
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrashTreasure</Text>
      <Text style={styles.subtitle}>Turning Trash into Treasure</Text>
      <Text style={styles.description}>
        Recycling helps to reduce pollution, conserve resources, and create a better environment
        for future generations.
      </Text>
      <TouchableOpacity onPress={takePicture}>
        <View style={styles.animationContainer}>
          <Text style={styles.animationText}>♻️</Text>
        </View>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {prediction && (
        <Text style={styles.prediction}>
          Prediction: {prediction}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  animationContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  animationText: {
    fontSize: 40,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  prediction: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default LandingPage;
