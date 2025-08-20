import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
 

// Function to upload image to your Node.js API
async function uploadImageForAnalysis(imageUri: string) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'hair.jpg',
      type: 'image/jpeg',
    } as any);

    const response = await fetch('http://192.168.4.198:3000/analyze-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Upload failed:', err);
    throw err;
  }
}

const CaptureImage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('We need access to your photos to analyze your hair color.');
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

      try {
        setLoading(true);
        const analysisResult = await uploadImageForAnalysis(uri);

        navigation.navigate('DreamMatch', {
          imageUri: uri,
          analysisResult, // pass dynamic hair shades
        });
      } catch (err) {
        alert('Failed to analyze hair. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Animatable.Image
              animation="fadeInDown"
              duration={1000}
              delay={100}
              source={require('../assets/images/dc-logo-black.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.hero}>Find Your Perfect Hair Match</Text>

            <Text style={styles.description}>
              Upload a photo to analyze your natural hair color. Our AI scans your hair, detects your tone, and matches you to the perfect extension shade.
              {'\n\n'}
              🔍 For best results:
              {'\n'}• Take your photo in natural daylight
              {'\n'}• Make sure your hair is fully visible (no hats or filters)
              {'\n'}• Use a plain background
              {'\n'}• Avoid shadows or blur
            </Text>

            <Animatable.View animation="fadeInUp" duration={800} delay={300} style={styles.card}>
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholder}>Ready to upload your photo</Text>
                <Text style={styles.instructions}>
                  Choose a clear photo of your hair in natural lighting for the most accurate results.
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handlePickImage}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Upload a Photo</Text>
                )}
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Image source={require('../assets/images/red.jpeg')} style={styles.uploadedImage} />
            <Image source={require('../assets/images/bluee.jpeg')} style={styles.uploadedImage} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAF6F7' },
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 40 },
  container: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 24 },
  logo: { width: 180, height: 60, marginBottom: 24 },
  hero: { fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#2D2D2D', marginBottom: 12 },
  description: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 32, lineHeight: 22, paddingHorizontal: 10 },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  placeholderContainer: { alignItems: 'center', marginBottom: 20 },
  placeholder: { fontSize: 16, color: '#aaa', marginBottom: 10 },
  instructions: { fontSize: 14, color: '#888', textAlign: 'center', paddingHorizontal: 8 },
  button: {
    backgroundColor: '#EF84AE',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#EF84AE',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  uploadedImage: {
    width: 220,
    height: 220,
    
    marginBottom: 20,
  },
});

export default CaptureImage;
