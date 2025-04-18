import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { ChefHat } from 'lucide-react-native';

export interface Friend {
  id: string;
  name: string;
  avatarUri: string;
  favoriteCuisine?: string;
  foodieLevel?: number;
  restaurantVisits?: number;
  selected?: boolean;
}

interface FriendListItemProps {
  friend: Friend;
  onPress?: (friend: Friend) => void;
  selectable?: boolean;
  showStats?: boolean;
}

export default function FriendListItem({
  friend,
  onPress,
  selectable = false,
  showStats = false,
}: FriendListItemProps) {
  const { name, avatarUri, favoriteCuisine, foodieLevel, restaurantVisits, selected } = friend;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectable && styles.selectableContainer,
        selected && styles.selectedContainer,
      ]}
      onPress={() => onPress?.(friend)}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        
        {favoriteCuisine && (
          <Text style={styles.cuisine}>Loves {favoriteCuisine}</Text>
        )}
        
        {showStats && (
          <View style={styles.statsContainer}>
            {foodieLevel !== undefined && (
              <View style={styles.statItem}>
                <ChefHat size={14} color={Colors.accent[400]} />
                <Text style={styles.statText}>Level {foodieLevel}</Text>
              </View>
            )}
            
            {restaurantVisits !== undefined && (
              <View style={styles.statItem}>
                <Text style={styles.statText}>{restaurantVisits} places</Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      {selectable && selected && (
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmark} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  selectableContainer: {
    borderRadius: 12,
    marginBottom: Spacing.sm,
    padding: Spacing.sm,
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedContainer: {
    backgroundColor: Colors.primary[50],
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  avatar: {
    width: Spacing.avatarSize.medium,
    height: Spacing.avatarSize.medium,
    borderRadius: Spacing.avatarSize.medium / 2,
  },
  infoContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  name: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  cuisine: {
    ...Typography.caption,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statText: {
    ...Typography.caption,
    color: Colors.gray[700],
    marginLeft: 4,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary[800],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
});