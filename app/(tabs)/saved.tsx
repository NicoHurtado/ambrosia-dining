import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import RestaurantCard, { Restaurant } from '@/components/ui/RestaurantCard';
import { CalendarClock, CalendarDays, MapPin, Clock } from 'lucide-react-native';
import FilterChip from '@/components/ui/FilterChip';

// Sample saved restaurants
const savedRestaurants: (Restaurant & { dateSaved?: string; plannedDate?: string })[] = [
  {
    id: '1',
    name: 'The Rustic Table',
    imageUri: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg',
    cuisine: 'American',
    rating: 4.7,
    priceLevel: 3,
    distance: '0.5 mi',
    dateSaved: '2 days ago',
    plannedDate: 'Saturday, 7:30 PM',
  },
  {
    id: '2',
    name: 'Sushi Perfection',
    imageUri: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    cuisine: 'Japanese',
    rating: 4.5,
    priceLevel: 4,
    distance: '1.2 mi',
    dateSaved: '1 week ago',
  },
  {
    id: '3',
    name: 'Pasta Paradiso',
    imageUri: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg',
    cuisine: 'Italian',
    rating: 4.2,
    priceLevel: 2,
    distance: '0.8 mi',
    dateSaved: '3 days ago',
    plannedDate: 'Next Friday, 8:00 PM',
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    imageUri: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    cuisine: 'Mexican',
    rating: 4.3,
    priceLevel: 2,
    distance: '1.5 mi',
    dateSaved: '2 weeks ago',
  },
  {
    id: '5',
    name: 'Green Garden',
    imageUri: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    cuisine: 'Vegetarian',
    rating: 4.0,
    priceLevel: 3,
    distance: '2.0 mi',
    dateSaved: '5 days ago',
  },
];

const filterOptions = ['All Saved', 'Planned', 'Visited', 'Want to Try'];

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All Saved');
  
  const handleRestaurantPress = (restaurant: Restaurant) => {
    // Navigate to restaurant details
    console.log('View restaurant:', restaurant.name);
  };
  
  const handleSaveRestaurant = (restaurant: Restaurant) => {
    // Remove restaurant from saved list
    console.log('Remove restaurant:', restaurant.name);
  };
  
  const handleFilterPress = (filter: string) => {
    setActiveFilter(filter);
  };
  
  const plannedRestaurants = savedRestaurants.filter(r => r.plannedDate);
  
  const renderRestaurantItem = ({ item }: { item: Restaurant & { dateSaved?: string; plannedDate?: string } }) => (
    <View style={styles.restaurantItemContainer}>
      <RestaurantCard
        restaurant={item}
        onPress={handleRestaurantPress}
        onSave={handleSaveRestaurant}
        size="large"
      />
      
      <View style={styles.savedInfoContainer}>
        <View style={styles.savedInfoItem}>
          <Clock size={14} color={Colors.gray[500]} />
          <Text style={styles.savedInfoText}>Saved {item.dateSaved}</Text>
        </View>
        
        {item.plannedDate && (
          <View style={styles.savedInfoItem}>
            <CalendarDays size={14} color={Colors.primary[600]} />
            <Text style={[styles.savedInfoText, { color: Colors.primary[600] }]}>
              {item.plannedDate}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Places I Want to Go</Text>
        <TouchableOpacity
          style={styles.planButton}
          onPress={() => console.log('Open calendar planning')}
        >
          <CalendarClock size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Filter options */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterOptions.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              selected={activeFilter === filter}
              onPress={() => handleFilterPress(filter)}
            />
          ))}
        </ScrollView>
      </View>
      
      {/* Upcoming planned visits */}
      {plannedRestaurants.length > 0 && activeFilter !== 'Visited' && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Visits</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plannedScrollContent}
          >
            {plannedRestaurants.map((restaurant) => (
              <TouchableOpacity
                key={restaurant.id}
                style={styles.plannedCard}
                onPress={() => handleRestaurantPress(restaurant)}
              >
                <Text style={styles.plannedName} numberOfLines={1}>{restaurant.name}</Text>
                <View style={styles.plannedInfo}>
                  <CalendarDays size={14} color={Colors.primary[800]} />
                  <Text style={styles.plannedDate}>{restaurant.plannedDate}</Text>
                </View>
                <View style={styles.plannedInfo}>
                  <MapPin size={14} color={Colors.gray[600]} />
                  <Text style={styles.plannedLocation}>{restaurant.distance} away</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {/* All saved restaurants */}
      <FlatList
        data={savedRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {activeFilter === 'All Saved' ? 'All Saved Places' : activeFilter}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
  },
  planButton: {
    backgroundColor: Colors.primary[800],
    borderRadius: 12,
    padding: Spacing.md,
  },
  filterContainer: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.screenPadding,
  },
  filterScroll: {
    paddingRight: Spacing.xl,
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h5,
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.lg,
  },
  plannedScrollContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingRight: Spacing.screenPadding + Spacing.xl,
  },
  plannedCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginRight: Spacing.lg,
    width: 200,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  plannedName: {
    ...Typography.h6,
    marginBottom: Spacing.xs,
  },
  plannedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  plannedDate: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[800],
    marginLeft: Spacing.xs,
  },
  plannedLocation: {
    ...Typography.caption,
    color: Colors.gray[600],
    marginLeft: Spacing.xs,
  },
  listContent: {
    padding: Spacing.screenPadding,
    paddingTop: 0,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  restaurantItemContainer: {
    marginBottom: Spacing.xl,
  },
  savedInfoContainer: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  savedInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  savedInfoText: {
    ...Typography.caption,
    color: Colors.gray[600],
    marginLeft: Spacing.xs,
  },
});