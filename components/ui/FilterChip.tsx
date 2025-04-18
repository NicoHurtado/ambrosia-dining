import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { X } from 'lucide-react-native';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
  onClose?: () => void;
  disabled?: boolean;
}

export default function FilterChip({
  label,
  selected = false,
  onPress,
  icon,
  onClose,
  disabled = false,
}: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
        disabled && styles.disabledContainer,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.label,
            selected && styles.selectedLabel,
            disabled && styles.disabledLabel,
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
        {selected && onClose && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={14} color={Colors.primary[800]} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.gray[100],
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  selectedContainer: {
    backgroundColor: Colors.primary[100],
    borderColor: Colors.primary[300],
  },
  disabledContainer: {
    backgroundColor: Colors.gray[100],
    borderColor: Colors.gray[200],
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    fontFamily: 'Poppins-Medium',
    color: Colors.gray[700],
  },
  selectedLabel: {
    color: Colors.primary[800],
  },
  disabledLabel: {
    color: Colors.gray[500],
  },
  closeButton: {
    marginLeft: Spacing.xs,
  },
});