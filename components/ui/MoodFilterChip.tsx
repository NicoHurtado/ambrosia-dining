import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';

export type MoodType = 'impress' | 'chill' | 'romantic' | 'friends' | 'family' | 'quick';

interface MoodFilterChipProps {
  mood: MoodType;
  selected: boolean;
  onPress: (mood: MoodType) => void;
}

interface MoodConfig {
  label: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  selectedBackgroundColor: string;
  selectedBorderColor: string;
}

export default function MoodFilterChip({
  mood,
  selected,
  onPress,
}: MoodFilterChipProps) {
  const moodConfigs: Record<MoodType, MoodConfig> = {
    impress: {
      label: 'Impress',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.accent[100],
      selectedBorderColor: Colors.accent[400],
    },
    chill: {
      label: 'Something Chill',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.secondary[100],
      selectedBorderColor: Colors.secondary[300],
    },
    romantic: {
      label: 'Romantic',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.primary[100],
      selectedBorderColor: Colors.primary[300],
    },
    friends: {
      label: 'With Friends',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.success[100],
      selectedBorderColor: Colors.success[300],
    },
    family: {
      label: 'Family Friendly',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.warning[100],
      selectedBorderColor: Colors.warning[300],
    },
    quick: {
      label: 'Quick Bite',
      color: Colors.gray[700],
      backgroundColor: Colors.gray[100],
      borderColor: Colors.gray[200],
      selectedBackgroundColor: Colors.error[100],
      selectedBorderColor: Colors.error[300],
    },
  };

  const config = moodConfigs[mood];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: selected ? config.selectedBackgroundColor : config.backgroundColor,
          borderColor: selected ? config.selectedBorderColor : config.borderColor,
        },
      ]}
      onPress={() => onPress(mood)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? config.selectedBorderColor : config.color,
          },
        ]}
      >
        {config.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  label: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
  },
});