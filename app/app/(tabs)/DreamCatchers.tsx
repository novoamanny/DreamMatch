import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const collections = ['All', 'Tape-In', 'I-Tip', 'Keratin Bond'];

const allProducts = [
  {
    id: '1',
    name: 'Tape-In Extensions',
    price: '$199',
    collection: 'Tape-In',
    image: 'https://i.imgur.com/ZcLLrkY.jpg',
    url: 'https://dreamcatchers.com/collections/tape-in',
  },
  {
    id: '2',
    name: 'I-Tip Extensions',
    price: '$225',
    collection: 'I-Tip',
    image: 'https://i.imgur.com/0uD2MgD.jpg',
    url: 'https://dreamcatchers.com/collections/i-tip',
  },
  {
    id: '3',
    name: 'Keratin Bond Extensions',
    price: '$249',
    collection: 'Keratin Bond',
    image: 'https://i.imgur.com/NuGgybe.jpg',
    url: 'https://dreamcatchers.com/collections/keratin-bond',
  },
  {
    id: '4',
    name: 'Deluxe Tape-In Kit',
    price: '$299',
    collection: 'Tape-In',
    image: 'https://i.imgur.com/3WIHqkA.jpg',
    url: 'https://dreamcatchers.com/products/deluxe-tape-in-kit',
  },
];

const screenWidth = Dimensions.get('window').width;

const DCSHOP = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProducts =
    selectedFilter === 'All'
      ? allProducts
      : allProducts.filter((p) => p.collection === selectedFilter);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.hero}>
        <Image
          source={{ uri: 'https://i.imgur.com/3yKXh5V.jpg' }}
          style={styles.heroImage}
        />
        <Text style={styles.heroTitle}>Luxury Hair, Perfectly Matched</Text>
        <Text style={styles.heroSubtitle}>Explore our premium collections</Text>
      </Animatable.View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {collections.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Carousel */}
      <FlatList
        horizontal
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={screenWidth * 0.8 + 20}
        contentContainerStyle={styles.productList}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInUp" delay={index * 150} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => Linking.openURL(item.url)}
            >
              <Text style={styles.shopButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FAF6F7',
  },
  heroImage: {
    width: '90%',
    height: 200,
    borderRadius: 12,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    color: '#2D2D2D',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
    textAlign: 'center',
  },
  filters: {
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#EF84AE',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  productList: {
    paddingLeft: 16,
    paddingVertical: 24,
  },
  card: {
    width: screenWidth * 0.8,
    backgroundColor: '#fdfdfd',
    borderRadius: 20,
    marginRight: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
    marginBottom: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    color: '#EF84AE',
    marginBottom: 12,
  },
  shopButton: {
    backgroundColor: '#EF84AE',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default DCSHOP;
