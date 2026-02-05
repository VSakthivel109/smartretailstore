import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar, Dimensions, SafeAreaView, ActivityIndicator, Alert, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock Data
const RECOMMENDATIONS = [
  { id: 1, name: 'Smart Watch Pro', price: '$299', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80', tag: 'Trending', rating: 4.8 },
  { id: 2, name: 'Wireless Buds', price: '$149', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80', tag: 'Sale', rating: 4.5 },
  { id: 3, name: 'AI Assistant Hub', price: '$199', image: 'https://images.unsplash.com/photo-1589492477829-5f88409c7ab0?w=500&q=80', tag: 'New', rating: 4.9 },
  { id: 4, name: 'VR Headset', price: '$399', image: 'https://images.unsplash.com/photo-1626387777596-1144ea8ce441?w=500&q=80', tag: 'Best Seller', rating: 4.7 },
  { id: 5, name: 'Smart Lamp', price: '$49', image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80', tag: 'Eco', rating: 4.2 },
];

const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: 'laptop-outline' },
  { id: 2, name: 'Fashion', icon: 'shirt-outline' },
  { id: 3, name: 'Home', icon: 'home-outline' },
  { id: 4, name: 'Beauty', icon: 'sparkles-outline' },
  { id: 5, name: 'Sports', icon: 'basketball-outline' },
  { id: 6, name: 'Toys', icon: 'game-controller-outline' },
];

export default function App() {
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- Scan Handlers ---
  const handleScanPress = () => {
    setScanModalVisible(true);
  };

  const executeScan = (type) => {
    setScanModalVisible(false);
    setLoading(true);
    // Simulate AI scanning based on type
    setTimeout(() => {
      setLoading(false);
      let message = '';
      if (type === 'barcode') message = 'Product found: Organic Green Tea (via Barcode).\n\nPrice: $12.99';
      if (type === 'image') message = 'Object Identified: Running Shoes.\n\nAI Suggestion: Nike Air Zoom matching this style.';
      if (type === 'tag') message = 'NFC Tag Read: Loyalty Points Added!';

      Alert.alert('Scan Result', message);
    }, 2000);
  };

  // --- Product Handlers ---
  const handleProductPress = (item) => {
    setSelectedProduct(item);
    setProductModalVisible(true);
  };

  const handleProductAction = (action) => {
    setProductModalVisible(false);
    Alert.alert('Success', `${action}: ${selectedProduct?.name}`);
  };

  const handleAskAI = () => {
    Alert.alert('AI Assistant', 'How can I help you shop today? I can compare prices, check ingredients, or suggest outfits.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Good Morning,</Text>
          <Text style={styles.headerTitle}>Alex</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => Alert.alert("Profile", "Profile settings and options coming soon!")}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' }} style={styles.avatar} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#A0A0A0" />
          <Text style={styles.placeholderText}>Search for products...</Text>
          <TouchableOpacity onPress={handleScanPress}>
            <Ionicons name="scan-outline" size={24} color="#4ECCA3" />
          </TouchableOpacity>
        </View>

        {/* AI Banner */}
        <TouchableOpacity style={styles.aiBanner} onPress={handleAskAI} activeOpacity={0.9}>
          <View style={styles.aiContent}>
            <View style={styles.aiIconContainer}>
              <MaterialCommunityIcons name="robot" size={32} color="#FFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.aiTitle}>Ask Retail AI</Text>
              <Text style={styles.aiText}>Get personalized shopping advice instantly.</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, activeCategory === index && styles.categoryCardActive]}
              onPress={() => setActiveCategory(index)}
            >
              <Ionicons name={cat.icon} size={24} color={activeCategory === index ? "#1A1A2E" : "#FFF"} />
              <Text style={[styles.categoryText, activeCategory === index && styles.categoryTextActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* For You / Recommendations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Picked For You</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationsList}>
          {RECOMMENDATIONS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard} activeOpacity={0.9} onPress={() => handleProductPress(item)}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={{ color: '#BBB', fontSize: 12, marginLeft: 4 }}>{item.rating}</Text>
                  </View>
                </View>
                {/* Changed to just an icon, actual action handled by card press now */}
                <View style={styles.addButton}>
                  <Ionicons name="add" size={20} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent Activity / Insights */}
        <Text style={styles.sectionTitle}>Your Insights</Text>
        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Ionicons name="trending-up" size={24} color="#4ECCA3" />
            <Text style={styles.insightTitle}>Spending Trend</Text>
          </View>
          <Text style={styles.insightText}>You've saved 15% more this month by using our AI price comparison tool.</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* --- MODALS --- */}

      {/* 1. Loading / Scan Simulated Overlay */}
      {loading && (
        <View style={styles.overlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#4ECCA3" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        </View>
      )}

      {/* 2. Scan Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={scanModalVisible}
        onRequestClose={() => setScanModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Output</Text>
            <Text style={styles.modalSubtitle}>How would you like to scan?</Text>

            <TouchableOpacity style={styles.modalOption} onPress={() => executeScan('barcode')}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(78, 204, 163, 0.2)' }]}>
                <Ionicons name="barcode-outline" size={24} color="#4ECCA3" />
              </View>
              <Text style={styles.modalOptionText}>Scan Barcode</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => executeScan('image')}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(54, 162, 235, 0.2)' }]}>
                <Ionicons name="camera-outline" size={24} color="#36A2EB" />
              </View>
              <Text style={styles.modalOptionText}>Identify Object (AI)</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={() => executeScan('tag')}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 99, 132, 0.2)' }]}>
                <Ionicons name="pricetag-outline" size={24} color="#FF6384" />
              </View>
              <Text style={styles.modalOptionText}>Read NFC Tag</Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setScanModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3. Product Options Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={productModalVisible}
        onRequestClose={() => setProductModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setProductModalVisible(false)}
        >
          <View style={styles.productModalContent}>
            {selectedProduct && (
              <>
                <Image source={{ uri: selectedProduct.image }} style={styles.modalProductImage} />
                <Text style={styles.modalProductTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>

                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleProductAction('Added to Cart')}>
                    <Ionicons name="cart" size={24} color="#FFF" />
                    <Text style={styles.actionButtonText}>Add to Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#333' }]} onPress={() => handleProductAction('Saved for Later')}>
                    <Ionicons name="heart" size={24} color="#FF6B6B" />
                    <Text style={styles.actionButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => setProductModalVisible(false)}>
                  <Text style={{ color: '#888' }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>


      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4ECCA3" />
          <Text style={[styles.navText, { color: '#4ECCA3' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="cart-outline" size={24} color="#888" />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Ionicons name="scan" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#888" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#888" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    position: 'relative',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#4ECCA3',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1A1A2E',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#252540',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  placeholderText: {
    flex: 1,
    color: '#A0A0A0',
    marginLeft: 10,
    fontSize: 16,
  },
  aiBanner: {
    backgroundColor: '#4ECCA3',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  aiTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  aiText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#4ECCA3',
    fontSize: 14,
    marginRight: 20,
  },
  categoriesList: {
    paddingLeft: 20,
    marginBottom: 30,
  },
  categoryCard: {
    backgroundColor: '#252540',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#303050',
  },
  categoryCardActive: {
    backgroundColor: '#4ECCA3',
    borderColor: '#4ECCA3',
  },
  categoryText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  categoryTextActive: {
    color: '#1A1A2E',
  },
  recommendationsList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  productCard: {
    width: 180,
    backgroundColor: '#252540',
    borderRadius: 20,
    marginRight: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#303050',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  tagContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: '#4ECCA3',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    color: '#4ECCA3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#4ECCA3',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightCard: {
    backgroundColor: 'rgba(78, 204, 163, 0.1)',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(78, 204, 163, 0.3)',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightTitle: {
    color: '#4ECCA3',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  insightText: {
    color: '#D0D0D0',
    lineHeight: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#1A1A2E',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#252540',
    paddingBottom: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#888',
  },
  scanButton: {
    top: -20,
    backgroundColor: '#4ECCA3',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4ECCA3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#1A1A2E',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loadingBox: {
    backgroundColor: '#252540',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1A1A2E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: 300,
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 25,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252540',
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  modalOptionText: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#252540',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  // Product Modal Styles
  productModalContent: {
    margin: 20,
    marginTop: 150,
    backgroundColor: '#252540',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  modalProductImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  modalProductTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalProductPrice: {
    color: '#4ECCA3',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4ECCA3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
