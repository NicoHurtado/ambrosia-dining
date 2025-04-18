import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import FoodLogEntry, { FoodLogEntryData } from '@/components/FoodLogEntry';
import { Calendar, Search } from 'lucide-react-native';

// Sample food log data
const foodLogEntries: FoodLogEntryData[] = [
  {
    id: '1',
    restaurantName: 'Gourmet Burger Co.',
    dishName: 'Classic Cheeseburger',
    imageUri: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    rating: 4,
    location: 'Downtown',
    date: 'Today, 1:30 PM',
    tags: ['Burger', 'Lunch'],
    price: '$15.99',
    notes: 'Perfectly cooked medium rare. Great fries too!',
  },
  {
    id: '2',
    restaurantName: 'Sushi Paradise',
    dishName: 'Rainbow Roll',
    imageUri: 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg',
    rating: 5,
    location: 'Midtown',
    date: 'Yesterday, 7:15 PM',
    tags: ['Sushi', 'Dinner', 'Date night'],
    price: '$22.50',
    notes: 'Incredibly fresh fish, nice atmosphere.',
  },
  {
    id: '3',
    restaurantName: 'Italiano Authentico',
    dishName: 'Pasta Carbonara',
    imageUri: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg',
    rating: 3,
    location: 'Village',
    date: 'Mar 15, 6:30 PM',
    tags: ['Italian', 'Pasta', 'Dinner'],
    price: '$18.00',
    notes: 'Good flavor but a bit too salty.',
  },
  {
    id: '4',
    restaurantName: 'Morning Glory Café',
    dishName: 'Avocado Toast',
    imageUri: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    rating: 4,
    location: 'Uptown',
    date: 'Mar 12, 9:45 AM',
    tags: ['Breakfast', 'Healthy'],
    price: '$12.00',
    notes: 'Perfect brunch spot.',
  },
  {
    id: '5',
    restaurantName: 'Taco Fiesta',
    dishName: 'Street Tacos Combo',
    imageUri: 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg',
    rating: 5,
    location: 'Downtown',
    date: 'Mar 10, 12:15 PM',
    tags: ['Mexican', 'Lunch', 'Spicy'],
    price: '$14.50',
    notes: 'Authentic flavors, great salsa verde!',
  },
];

export default function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const [selectedEntry, setSelectedEntry] = useState<FoodLogEntryData | null>(null);
  
  const handleEntryPress = (entry: FoodLogEntryData) => {
    setSelectedEntry(entry);
    // Navigate to detail view
    console.log('View food log entry:', entry.dishName);
  };
  
  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>My Food Diary</Text>
        <TouchableOpacity 
          style={styles.calendarButton}
          onPress={() => console.log('Open calendar')}
        >
          <Calendar size={24} color={Colors.primary[800]} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.gray[400]} style={styles.searchIcon} />
        <Text style={styles.searchPlaceholder}>Search your food memories...</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>21</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Total Entries</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.3</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Recent Meals</Text>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={foodLogEntries}
        renderItem={({ item }) => (
          <FoodLogEntry entry={item} onPress={handleEntryPress} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  listContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
  searchPlaceholder: {
    ...Typography.body1,
    color: Colors.gray[400],
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h4,
    color: Colors.primary[800],
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.gray[200],
  },
  sectionTitle: {
    ...Typography.h5,
    marginBottom: Spacing.lg,
  },
});