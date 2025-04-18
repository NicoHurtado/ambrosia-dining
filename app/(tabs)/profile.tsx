import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { 
  Settings, ChefHat, Users, BookMarked, UtensilsCrossed, MessageCircle, 
  Bell, LogOut, Heart, GiftIcon, CalendarClock, BadgePercent 
} from 'lucide-react-native';
import FriendListItem, { Friend } from '@/components/FriendListItem';

// Sample friends data
const friends: Friend[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatarUri: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    favoriteCuisine: 'Italian',
    foodieLevel: 8,
    restaurantVisits: 42,
  },
  {
    id: '2',
    name: 'James Smith',
    avatarUri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    favoriteCuisine: 'Mexican',
    foodieLevel: 6,
    restaurantVisits: 28,
  },
  {
    id: '3',
    name: 'Sophia Chen',
    avatarUri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    favoriteCuisine: 'Japanese',
    foodieLevel: 9,
    restaurantVisits: 53,
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  
  const profileMenuItems = [
    {
      icon: <UtensilsCrossed size={20} color={Colors.primary[800]} />,
      title: 'My Food Journey',
      subtitle: 'View all your food memories',
    },
    {
      icon: <BookMarked size={20} color={Colors.primary[800]} />,
      title: 'Saved Places',
      subtitle: 'Restaurants you want to visit',
    },
    {
      icon: <Users size={20} color={Colors.primary[800]} />,
      title: 'My Friends',
      subtitle: 'Manage your foodie connections',
    },
    {
      icon: <GiftIcon size={20} color={Colors.primary[800]} />,
      title: 'Gift Cards',
      subtitle: 'Send a treat to your friends',
    },
    {
      icon: <CalendarClock size={20} color={Colors.primary[800]} />,
      title: 'Calendar',
      subtitle: 'Your upcoming restaurant plans',
    },
    {
      icon: <BadgePercent size={20} color={Colors.primary[800]} />,
      title: 'Offers & Rewards',
      subtitle: 'See your available perks',
    },
  ];
  
  const handleFriendPress = (friend: Friend) => {
    console.log('View friend profile:', friend.name);
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with settings */}
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => console.log('Open settings')}
          >
            <Settings size={24} color={Colors.gray[700]} />
          </TouchableOpacity>
        </View>
        
        {/* Profile card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://media.elcomercio.com/wp-content/uploads/2024/12/Diseno-sin-titulo-55-1024x683.jpg' }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Cristiano Ronaldo</Text>
            <View style={styles.foodieLevelContainer}>
              <ChefHat size={16} color={Colors.accent[400]} />
              <Text style={styles.foodieLevel}>Level 7 Foodie</Text>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>156</Text>
                <Text style={styles.statLabel}>Entries</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>84</Text>
                <Text style={styles.statLabel}>Places</Text>
              </View>
              
              <View style={styles.statDivider} />
              
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Friends</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.primary[50] }]}>
              <Bell size={20} color={Colors.primary[800]} />
            </View>
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.success[50] }]}>
              <Heart size={20} color={Colors.success[600]} />
            </View>
            <Text style={styles.actionText}>Favorites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: Colors.accent[50] }]}>
              <MessageCircle size={20} color={Colors.accent[400]} />
            </View>
            <Text style={styles.actionText}>Reviews</Text>
          </TouchableOpacity>
        </View>
        
        {/* Profile menu */}
        <View style={styles.menuContainer}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => console.log(`Navigate to ${item.title}`)}
            >
              <View style={styles.menuIconContainer}>{item.icon}</View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuArrow}>
                <View style={styles.arrowCircle} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Friends section */}
        <View style={styles.friendsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <TouchableOpacity
              onPress={() => console.log('View all friends')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {friends.map((friend) => (
            <FriendListItem
              key={friend.id}
              friend={friend}
              onPress={handleFriendPress}
              showStats
            />
          ))}
        </View>
        
        {/* Log out button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => console.log('Log out')}
        >
          <LogOut size={20} color={Colors.error[600]} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    marginBottom: Spacing.xl,
  },
  screenTitle: {
    ...Typography.h3,
  },
  settingsButton: {
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
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.xl,
    flexDirection: 'row',
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.h4,
    marginBottom: Spacing.xs,
  },
  foodieLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  foodieLevel: {
    ...Typography.body2,
    color: Colors.accent[400],
    marginLeft: Spacing.xs,
    fontFamily: 'Poppins-Medium',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h6,
    color: Colors.primary[800],
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.gray[300],
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionText: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
  },
  menuSubtitle: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  menuArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray[400],
  },
  friendsSection: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h5,
  },
  viewAllText: {
    ...Typography.body2,
    color: Colors.primary[800],
    fontFamily: 'Poppins-Medium',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  logoutText: {
    ...Typography.body1,
    color: Colors.error[600],
    fontFamily: 'Poppins-Medium',
    marginLeft: Spacing.sm,
  },
});