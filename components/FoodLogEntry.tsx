import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { MapPin, Clock, Tag } from 'lucide-react-native';
import ChefHatRating from '@/components/ui/ChefHatRating';

export interface FoodLogEntryData {
  id: string;
  restaurantName: string;
  dishName: string;
  imageUri: string;
  rating: number;
  location: string;
  date: string;
  tags: string[];
  price?: string;
  notes?: string;
}

interface FoodLogEntryProps {
  entry: FoodLogEntryData;
  onPress: (entry: FoodLogEntryData) => void;
}

export default function FoodLogEntry({ entry, onPress }: FoodLogEntryProps) {
  const {
    restaurantName,
    dishName,
    imageUri,
    rating,
    location,
    date,
    tags,
    price,
  } = entry;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(entry)}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.dishName} numberOfLines={1}>{dishName}</Text>
        <Text style={styles.restaurantName} numberOfLines={1}>{restaurantName}</Text>
        
        <View style={styles.ratingContainer}>
          <ChefHatRating rating={rating} size="small" readOnly />
          {price && <Text style={styles.price}>{price}</Text>}
        </View>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MapPin size={14} color={Colors.gray[500]} />
            <Text style={styles.infoText} numberOfLines={1}>{location}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Clock size={14} color={Colors.gray[500]} />
            <Text style={styles.infoText}>{date}</Text>
          </View>
        </View>
        
        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Tag size={14} color={Colors.gray[500]} />
            <Text style={styles.tagsText} numberOfLines={1}>
              {tags.join(', ')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 100,
  },
  image: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  dishName: {
    ...Typography.h6,
    marginBottom: Spacing.xxs,
  },
  restaurantName: {
    ...Typography.body2,
    color: Colors.gray[600],
    marginBottom: Spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  price: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[800],
  },
  infoContainer: {
    marginBottom: Spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  infoText: {
    ...Typography.caption,
    color: Colors.gray[700],
    marginLeft: Spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsText: {
    ...Typography.caption,
    color: Colors.gray[600],
    marginLeft: Spacing.xs,
  },
});