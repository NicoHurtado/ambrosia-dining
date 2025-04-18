import { StyleSheet } from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  // Headings
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 40,
    color: Colors.text,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    lineHeight: 36,
    color: Colors.text,
  },
  h3: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.text,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.text,
  },
  h5: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.text,
  },
  h6: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.text,
  },
  
  // Body text
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.text,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
  },
  
  // Special text
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.gray[500],
  },
  overline: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: Colors.gray[600],
  },
  
  // Button text
  buttonLarge: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonMedium: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonSmall: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 18,
  },
  
  // Labels
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.gray[700],
  },
});