import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CaptureImage = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginBottom: 20 }} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Pick from Gallery" onPress={handlePickImage} />
    </View>
  );
};

export default CaptureImage;
