import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { Search, MapPin, SlidersHorizontal, ChevronRight } from 'lucide-react-native';
import RestaurantCard, { Restaurant } from '@/components/ui/RestaurantCard';
import FilterChip from '@/components/ui/FilterChip';
import MoodFilterChip, { MoodType } from '@/components/ui/MoodFilterChip';

// Sample data
const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Rustic Table',
    imageUri: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
    cuisine: 'American',
    rating: 4.7,
    priceLevel: 3,
    distance: '0.5 mi',
    isRecommended: true,
  },
  {
    id: '2',
    name: 'Sushi Perfection',
    imageUri: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    cuisine: 'Japanese',
    rating: 4.5,
    priceLevel: 4,
    distance: '1.2 mi',
    isNew: true,
  },
  {
    id: '3',
    name: 'Pasta Paradiso',
    imageUri: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    cuisine: 'Italian',
    rating: 4.2,
    priceLevel: 2,
    distance: '0.8 mi',
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    imageUri: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    cuisine: 'Mexican',
    rating: 4.3,
    priceLevel: 2,
    distance: '1.5 mi',
    isRecommended: true,
  },
  {
    id: '5',
    name: 'Green Garden',
    imageUri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    cuisine: 'Vegetarian',
    rating: 4.0,
    priceLevel: 3,
    distance: '2.0 mi',
    isNew: true,
  },
];

const cuisineFilters = [
  'All',
  'American',
  'Italian',
  'Japanese',
  'Mexican',
  'Chinese',
  'Thai',
  'Indian',
  'Vegetarian',
];

const moodFilters: MoodType[] = ['impress', 'chill', 'romantic', 'friends', 'family', 'quick'];

export default function DiscoverScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  
  const handleRestaurantPress = (restaurant: Restaurant) => {
    // Navigate to restaurant details
    console.log('View restaurant:', restaurant.name);
  };
  
  const handleSaveRestaurant = (restaurant: Restaurant) => {
    // Save restaurant to favorites
    console.log('Save restaurant:', restaurant.name);
  };
  
  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };
  
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(selectedMood === mood ? null : mood);
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hey, Foodie!</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.primary[800]} />
              <Text style={styles.location}>New York, NY</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Image
              source={{ uri: 'https://media.elcomercio.com/wp-content/uploads/2024/12/Diseno-sin-titulo-55-1024x683.jpg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or cuisines..."
            placeholderTextColor={Colors.gray[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.filtersButton}
            onPress={() => console.log('Open filters')}
          >
            <SlidersHorizontal size={20} color={Colors.gray[600]} />
          </TouchableOpacity>
        </View>
        
        {/* Cuisine Filters */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
          >
            {cuisineFilters.map((cuisine) => (
              <FilterChip
                key={cuisine}
                label={cuisine}
                selected={selectedCuisine === cuisine}
                onPress={() => handleCuisineSelect(cuisine)}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Mood Filters */}
        <View style={styles.filterSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>I'm in the mood for...</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScrollContent}
          >
            {moodFilters.map((mood) => (
              <MoodFilterChip
                key={mood}
                mood={mood}
                selected={selectedMood === mood}
                onPress={handleMoodSelect}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* AI Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithLink}>
            <Text style={styles.sectionTitle}>For You</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => console.log('See all recommendations')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color={Colors.primary[800]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {restaurants
              .filter((r) => r.isRecommended)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onPress={handleRestaurantPress}
                  onSave={handleSaveRestaurant}
                  style={styles.horizontalCard}
                />
              ))}
          </ScrollView>
        </View>
        
        {/* New Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithLink}>
            <Text style={styles.sectionTitle}>New Places</Text>
            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => console.log('See all new places')}
            >
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={16} color={Colors.primary[800]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {restaurants
              .filter((r) => r.isNew)
              .map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onPress={handleRestaurantPress}
                  onSave={handleSaveRestaurant}
                  style={styles.horizontalCard}
                />
              ))}
          </ScrollView>
        </View>
        
        {/* All Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Restaurants</Text>
          </View>
          
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={handleRestaurantPress}
              onSave={handleSaveRestaurant}
              size="large"
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.h3,
    marginBottom: Spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...Typography.body2,
    color: Colors.gray[600],
    marginLeft: Spacing.xs,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    height: 50,
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body1,
    padding: 0,
  },
  filtersButton: {
    padding: Spacing.sm,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    marginBottom: Spacing.md,
  },
  sectionHeaderWithLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    ...Typography.body2,
    color: Colors.primary[800],
    fontFamily: 'Poppins-Medium',
  },
  filtersScrollContent: {
    paddingRight: Spacing.lg,
  },
  horizontalScrollContent: {
    paddingRight: Spacing.lg,
  },
  horizontalCard: {
    marginRight: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
});