// Base spacing unit (8px)
export const BASE = 8;

export default {
  // Core spacing values
  xxs: BASE * 0.25, // 2px
  xs: BASE * 0.5,   // 4px
  sm: BASE,         // 8px
  md: BASE * 1.5,   // 12px
  lg: BASE * 2,     // 16px
  xl: BASE * 3,     // 24px
  xxl: BASE * 4,    // 32px
  
  // Additional spacing values
  '2xl': BASE * 6,  // 48px
  '3xl': BASE * 8,  // 64px
  '4xl': BASE * 12, // 96px
  '5xl': BASE * 16, // 128px
  
  // Specific component spacing
  cardPadding: BASE * 2,
  screenPadding: BASE * 2,
  sectionSpacing: BASE * 3,
  inputHeight: BASE * 6,
  buttonHeight: BASE * 6,
  tabBarHeight: BASE * 8,
  avatarSize: {
    small: BASE * 4,
    medium: BASE * 6,
    large: BASE * 8,
  },
};