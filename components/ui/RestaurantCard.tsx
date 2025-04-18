import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageStyle } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { ChefHat, BookmarkPlus, Star } from 'lucide-react-native';

export interface Restaurant {
  id: string;
  name: string;
  imageUri: string;
  cuisine: string;
  rating: number;
  priceLevel: number;
  distance: string;
  isNew?: boolean;
  isRecommended?: boolean;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
  onSave: (restaurant: Restaurant) => void;
  style?: any;
  size?: 'small' | 'medium' | 'large';
}

export default function RestaurantCard({
  restaurant,
  onPress,
  onSave,
  style,
  size = 'medium',
}: RestaurantCardProps) {
  const {
    name,
    imageUri,
    cuisine,
    rating,
    priceLevel,
    distance,
    isNew,
    isRecommended,
  } = restaurant;
  
  // Sizing based on card size
  const cardStyles = {
    small: {
      container: { width: 160 },
      image: { height: 120 } as ImageStyle,
    },
    medium: {
      container: { width: 240 },
      image: { height: 160 } as ImageStyle,
    },
    large: {
      container: { width: '100%' },
      image: { height: 200 } as ImageStyle,
    },
  };

  // Price level display
  const renderPriceLevel = () => {
    return '$'.repeat(priceLevel);
  };
  
  // Chef hat rating component
  const renderRating = () => {
    return (
      <View style={styles.ratingContainer}>
        <ChefHat size={16} color={Colors.accent[400]} />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, cardStyles[size].container, style]}
      onPress={() => onPress(restaurant)}
      activeOpacity={0.9}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, cardStyles[size].image]}
          resizeMode="cover"
        />
        
        {/* Bookmark button */}
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => onSave(restaurant)}
        >
          <BookmarkPlus size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <View style={styles.content}>
        {/* Tags */}
        <View style={styles.tagsContainer}>
          {isNew && (
            <View style={[styles.tag, styles.newTag]}>
              <Text style={styles.newTagText}>New</Text>
            </View>
          )}
          {isRecommended && (
            <View style={[styles.tag, styles.recommendedTag]}>
              <Star size={12} color={Colors.white} />
              <Text style={styles.recommendedTagText}>AI Pick</Text>
            </View>
          )}
        </View>
        
        {/* Restaurant name */}
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        
        {/* Info row */}
        <View style={styles.infoRow}>
          <Text style={styles.cuisine} numberOfLines={1}>{cuisine}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.price}>{renderPriceLevel()}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
        
        {/* Rating */}
        {renderRating()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: Spacing.lg,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  bookmarkButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: Spacing.xs,
  },
  content: {
    padding: Spacing.lg,
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xs,
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    marginRight: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newTag: {
    backgroundColor: Colors.success[500],
  },
  newTagText: {
    ...Typography.caption,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  recommendedTag: {
    backgroundColor: Colors.primary[800],
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendedTagText: {
    ...Typography.caption,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    marginLeft: Spacing.xxs,
  },
  name: {
    ...Typography.h6,
    marginBottom: Spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: Spacing.xs,
  },
  cuisine: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  dot: {
    ...Typography.caption,
    color: Colors.gray[400],
    marginHorizontal: 4,
  },
  price: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  distance: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    color: Colors.accent[400],
    marginLeft: Spacing.xs,
  },
});