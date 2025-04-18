import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChefHat } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import Animated, { useAnimatedStyle, withSpring, useSharedValue, interpolateColor } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ChefHatRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  readOnly?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

export default function ChefHatRating({
  rating,
  maxRating = 5,
  size = 'medium',
  readOnly = false,
  onRatingChange,
  showValue = false,
}: ChefHatRatingProps) {
  
  // Size configuration
  const sizeConfig = {
    small: { hatSize: 18, spacing: Spacing.xs },
    medium: { hatSize: 24, spacing: Spacing.sm },
    large: { hatSize: 32, spacing: Spacing.md },
  };
  
  const { hatSize, spacing } = sizeConfig[size];
  
  // Animated values for chef hats
  const animatedScales = Array.from({ length: maxRating }, () => useSharedValue(1));
  
  const handleRating = (newRating: number) => {
    if (readOnly) return;
    
    // Animate the pressed hat
    animatedScales[newRating - 1].value = withSpring(1.2, {}, () => {
      animatedScales[newRating - 1].value = withSpring(1);
    });
    
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };
  
  const renderChefHats = () => {
    return Array.from({ length: maxRating }).map((_, index) => {
      const isActive = index < rating;
      
      const animatedStyle = useAnimatedStyle(() => {
        return {
          transform: [{ scale: animatedScales[index].value }],
        };
      });
      
      return (
        <AnimatedPressable
          key={index}
          style={[styles.hatContainer, animatedStyle]}
          onPress={() => handleRating(index + 1)}
          disabled={readOnly}
        >
          <ChefHat 
            size={hatSize} 
            color={isActive ? Colors.accent[400] : Colors.gray[300]} 
            strokeWidth={2}
          />
        </AnimatedPressable>
      );
    });
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.ratingContainer, { gap: spacing }]}>
        {renderChefHats()}
      </View>
      
      {showValue && (
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hatContainer: {
    padding: 2,
  },
  ratingText: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    color: Colors.gray[700],
    marginLeft: Spacing.sm,
  },
});