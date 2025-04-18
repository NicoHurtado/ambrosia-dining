import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import { Camera, X, MapPin, Tag, DollarSign, ChevronDown, Send } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import ChefHatRating from '@/components/ui/ChefHatRating';

export default function LogFoodScreen() {
  const insets = useSafeAreaInsets();
  
  const [foodName, setFoodName] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  
  // Sample image for demo purposes
  const sampleImageUri = 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg';
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  
  const handleClose = () => {
    router.back();
  };
  
  const handleSave = () => {
    console.log('Food entry saved:', {
      foodName,
      restaurantName,
      rating,
      price,
      notes,
      tags,
      imageUri: imageUri || sampleImageUri,
    });
    
    router.back();
  };
  
  const handleTakePhoto = () => {
    // For demo, just set the sample image
    setImageUri(sampleImageUri);
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <X size={24} color={Colors.gray[700]} />
        </TouchableOpacity>
        <Text style={styles.title}>Log Food</Text>
        <View style={styles.spacer} />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Food image */}
        <View style={styles.imageContainer}>
          {imageUri ? (
            <>
              <Image source={{ uri: imageUri }} style={styles.foodImage} />
              <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={handleTakePhoto}
              >
                <Camera size={20} color={Colors.white} />
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleTakePhoto}
            >
              <Camera size={32} color={Colors.gray[500]} />
              <Text style={styles.addPhotoText}>Add Food Photo</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Form fields */}
        <View style={styles.formContainer}>
          {/* Dish name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What did you eat?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Truffle Pasta, Classic Burger"
              placeholderTextColor={Colors.gray[400]}
              value={foodName}
              onChangeText={setFoodName}
            />
          </View>
          
          {/* Restaurant */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Restaurant</Text>
            <View style={styles.locationInput}>
              <MapPin size={20} color={Colors.primary[800]} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Search or enter restaurant name"
                placeholderTextColor={Colors.gray[400]}
                value={restaurantName}
                onChangeText={setRestaurantName}
              />
            </View>
          </View>
          
          {/* Rating */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>How was it?</Text>
            <View style={styles.ratingContainer}>
              <ChefHatRating
                rating={rating}
                onRatingChange={handleRatingChange}
                size="large"
                showValue
              />
            </View>
          </View>
          
          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.priceInput}>
              <DollarSign size={20} color={Colors.gray[600]} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Enter price"
                placeholderTextColor={Colors.gray[400]}
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
          
          {/* Tags */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tags</Text>
            <View style={styles.tagsInput}>
              <Tag size={20} color={Colors.gray[600]} style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Add tags (e.g., Spicy, Lunch)"
                placeholderTextColor={Colors.gray[400]}
                value={newTag}
                onChangeText={setNewTag}
                onSubmitEditing={handleAddTag}
                returnKeyType="done"
              />
            </View>
            
            {tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveTag(tag)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <X size={14} color={Colors.gray[600]} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any notes or thoughts about your food experience..."
              placeholderTextColor={Colors.gray[400]}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Save button */}
      <View style={styles.footer}>
        <Button
          title="Save to Food Diary"
          variant="primary"
          size="large"
          fullWidth
          onPress={handleSave}
          icon={<Send size={20} color={Colors.white} />}
          iconPosition="right"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  closeButton: {
    padding: Spacing.sm,
  },
  title: {
    ...Typography.h5,
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addPhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    ...Typography.body1,
    color: Colors.gray[600],
    marginTop: Spacing.sm,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  changePhotoText: {
    ...Typography.body2,
    color: Colors.white,
    marginLeft: Spacing.xs,
  },
  formContainer: {
    padding: Spacing.screenPadding,
  },
  inputGroup: {
    marginBottom: Spacing.xl,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : 0,
    height: Spacing.inputHeight,
    ...Typography.body1,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  textArea: {
    height: 120,
    paddingTop: Spacing.md,
    textAlignVertical: 'top',
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
  },
  tagsInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    height: Spacing.inputHeight,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  inputWithIcon: {
    flex: 1,
    ...Typography.body1,
    paddingVertical: Platform.OS === 'ios' ? Spacing.sm : 0,
    height: '100%',
  },
  ratingContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    padding: Spacing.lg,
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.md,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[200],
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  tagText: {
    ...Typography.body2,
    color: Colors.gray[800],
    marginRight: Spacing.xs,
  },
  footer: {
    padding: Spacing.screenPadding,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
});