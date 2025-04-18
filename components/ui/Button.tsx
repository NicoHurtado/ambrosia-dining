import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  TouchableOpacityProps,
  View
} from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  title: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  title,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  
  // Determine button and text styles based on variant and size
  const buttonStyle = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style
  ];
  
  const textStyle = [
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText
  ];

  // Render content
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary[800]} />;
    }
    
    if (!icon) {
      return <Text style={textStyle}>{title}</Text>;
    }
    
    // Render with icon
    return (
      <View style={styles.contentWithIcon}>
        {iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
        <Text style={textStyle}>{title}</Text>
        {iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  
  // Variant styles
  primaryButton: {
    backgroundColor: Colors.primary[800],
  },
  secondaryButton: {
    backgroundColor: Colors.secondary[100],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[800],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  
  // Size styles
  smallButton: {
    height: Spacing.buttonHeight - Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  mediumButton: {
    height: Spacing.buttonHeight,
    paddingHorizontal: Spacing.xl,
  },
  largeButton: {
    height: Spacing.buttonHeight + Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  
  // Text styles
  primaryText: {
    ...Typography.buttonMedium,
    color: Colors.white,
  },
  secondaryText: {
    ...Typography.buttonMedium,
    color: Colors.primary[800],
  },
  outlineText: {
    ...Typography.buttonMedium,
    color: Colors.primary[800],
  },
  ghostText: {
    ...Typography.buttonMedium,
    color: Colors.primary[800],
  },
  
  // Text size styles
  smallText: {
    ...Typography.buttonSmall,
  },
  mediumText: {
    ...Typography.buttonMedium,
  },
  largeText: {
    ...Typography.buttonLarge,
  },
  
  // Disabled styles
  disabledButton: {
    backgroundColor: Colors.gray[200],
    borderColor: Colors.gray[200],
  },
  disabledText: {
    color: Colors.gray[500],
  },
  
  // Icon styles
  contentWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: Spacing.sm,
  },
  iconRight: {
    marginLeft: Spacing.sm,
  },
});