import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  ResultsScreen: { imageUri: string };
};

const ResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ResultsScreen'>>();
  const navigation = useNavigation();
  const { imageUri } = route.params;

  const [detectedColors, setDetectedColors] = useState<string[]>([]);
  const [matchedProducts, setMatchedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          name: 'hair.jpg',
          type: 'image/jpeg',
        } as any);

        const response = await fetch('http://192.168.4.198:3000/match?k=12', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const data = await response.json();

        // Map API results to state
        setDetectedColors(data.userHair.map((h: any) => h.hex));
        // flatten topMatches and pick first for demo
        const products: any[] = [];
        data.topMatches.forEach((shades: any) => {
          shades.forEach((ext: any) => {
            products.push(ext);
          });
        });
        setMatchedProducts(products);
      } catch (err) {
        console.error('Error uploading image:', err);
      } finally {
        setLoading(false);
      }
    };

    uploadImage();
  }, [imageUri]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', flex: 1 }]}>
        <ActivityIndicator size="large" color="#EF84AE" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#555' }}>Analyzing your hair...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Hair Color Match</Text>

      <Text style={styles.subtitle}>Uploaded Photo</Text>
      <Image source={{ uri: imageUri }} style={styles.uploadedImage} />

      <Text style={styles.subtitle}>Detected Hair Tones</Text>
      <View style={styles.colorRow}>
        {detectedColors.map((color, idx) => (
          <View key={idx} style={[styles.colorCircle, { backgroundColor: color }]} />
        ))}
      </View>

      <Text style={styles.subtitle}>Recommended Extensions</Text>
      {matchedProducts.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productCard}
          onPress={() => alert(`Selected ${product.name}`)}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text style={styles.productName}>{product.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#FAF6F7',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  uploadedImage: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 24,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flexShrink: 1,
  },
});

export default ResultsScreen;
