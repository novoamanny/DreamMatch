import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  ResultsScreen: { imageUri: string };
};

const ResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ResultsScreen'>>();
  const navigation = useNavigation();

  const { imageUri } = route.params;

  // Dummy detected colors & matched products
  const detectedColors = ['#5D3A00', '#C19A6B', '#F5DEB3'];
  const matchedProducts = [
    {
      id: 'prod1',
      name: 'Chestnut Brown Extensions',
      image: 'https://i.imgur.com/4AI1hEL.jpg',
    },
    {
      id: 'prod2',
      name: 'Golden Blonde Extensions',
      image: 'https://i.imgur.com/lkTnV0v.jpg',
    },
  ];

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
