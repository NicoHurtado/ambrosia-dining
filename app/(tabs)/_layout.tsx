import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import { Compass, BookMarked, UtensilsCrossed, ChartBar, User } from 'lucide-react-native';
import FloatingActionButton from '@/components/FloatingActionButton';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();
  
  const handleAddLog = () => {
    router.push('/log-food');
  };

  return (
    <View style={styles.container}>
      <FloatingActionButton onPress={handleAddLog} />
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary[800],
          tabBarInactiveTintColor: Colors.gray[400],
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Compass color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="diary"
          options={{
            title: 'My Diary',
            tabBarIcon: ({ color, size }) => (
              <UtensilsCrossed color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color, size }) => (
              <BookMarked color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, size }) => (
              <ChartBar color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <User color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    height: 60,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});