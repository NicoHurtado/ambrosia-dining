import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';
import Spacing from '@/constants/Spacing';
import StatCard from '@/components/StatCard';
import {
  UtensilsCrossed,
  Wallet,
  Clock,
  CalendarDays,
  Users,
  Flame,
  ChefHat,
  BadgePercent,
  TagIcon,
  ArrowUpRight,
  PieChart,
} from 'lucide-react-native';
import FilterChip from '@/components/ui/FilterChip';

const timeFrames = ['This Month', 'Last Month', '3 Months', '6 Months', 'Year'];

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTimeFrame, setActiveTimeFrame] = useState('This Month');
  
  const handleTimeFrameChange = (timeFrame: string) => {
    setActiveTimeFrame(timeFrame);
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Food Stats</Text>
        </View>
        
        {/* Time frame selector */}
        <View style={styles.timeFrameContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.timeFrameScroll}
          >
            {timeFrames.map((timeFrame) => (
              <FilterChip
                key={timeFrame}
                label={timeFrame}
                selected={activeTimeFrame === timeFrame}
                onPress={() => handleTimeFrameChange(timeFrame)}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Summary cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.primaryCard]}>
              <Text style={styles.summaryValue}>21</Text>
              <Text style={styles.summaryLabel}>Restaurants</Text>
            </View>
            <View style={[styles.summaryCard, styles.secondaryCard]}>
              <Text style={styles.summaryValue}>36</Text>
              <Text style={styles.summaryLabel}>Dishes</Text>
            </View>
          </View>
          
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.accentCard]}>
              <Text style={styles.summaryValue}>4.2</Text>
              <Text style={styles.summaryLabel}>Avg Rating</Text>
            </View>
            <View style={[styles.summaryCard, styles.tertiaryCard]}>
              <Text style={styles.summaryValue}>$426</Text>
              <Text style={styles.summaryLabel}>Spent</Text>
            </View>
          </View>
        </View>
        
        {/* Detailed stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dining Habits</Text>
          
          <StatCard
            title="Total Restaurants"
            value="21"
            icon={<UtensilsCrossed size={24} color={Colors.primary[800]} />}
            subtitle="5 more than last month"
          />
          
          <StatCard
            title="Money Spent"
            value="$426"
            icon={<Wallet size={24} color={Colors.error[600]} />}
            color={Colors.error[600]}
            subtitle="$86 more than last month"
          />
          
          <StatCard
            title="Time Spent Dining"
            value="32h 15m"
            icon={<Clock size={24} color={Colors.success[600]} />}
            color={Colors.success[600]}
            subtitle="Average 1.5h per visit"
          />
          
          <StatCard
            title="Most Active Day"
            value="Friday"
            icon={<CalendarDays size={24} color={Colors.accent[400]} />}
            color={Colors.accent[400]}
            subtitle="8 restaurant visits"
          />
        </View>
        
        {/* Food preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Preferences</Text>
          
          <View style={styles.preferencesContainer}>
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIcon, { backgroundColor: `${Colors.primary[800]}20` }]}>
                <TagIcon size={20} color={Colors.primary[800]} />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Top Cuisine</Text>
                <Text style={styles.preferenceValue}>Italian</Text>
              </View>
              <ArrowUpRight size={16} color={Colors.gray[500]} />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIcon, { backgroundColor: `${Colors.accent[400]}20` }]}>
                <Flame size={20} color={Colors.accent[400]} />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Most Ordered</Text>
                <Text style={styles.preferenceValue}>Pizza</Text>
              </View>
              <ArrowUpRight size={16} color={Colors.gray[500]} />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIcon, { backgroundColor: `${Colors.success[600]}20` }]}>
                <ChefHat size={20} color={Colors.success[600]} />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Highest Rated</Text>
                <Text style={styles.preferenceValue}>Sushi</Text>
              </View>
              <ArrowUpRight size={16} color={Colors.gray[500]} />
            </View>
            
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIcon, { backgroundColor: `${Colors.error[600]}20` }]}>
                <BadgePercent size={20} color={Colors.error[600]} />
              </View>
              <View style={styles.preferenceContent}>
                <Text style={styles.preferenceLabel}>Best Value</Text>
                <Text style={styles.preferenceValue}>Mexican</Text>
              </View>
              <ArrowUpRight size={16} color={Colors.gray[500]} />
            </View>
          </View>
        </View>
        
        {/* Social stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Stats</Text>
          
          <View style={styles.socialContainer}>
            <View style={styles.socialColumn}>
              <Text style={styles.socialValue}>12</Text>
              <Text style={styles.socialLabel}>Friends</Text>
            </View>
            
            <View style={styles.socialDivider} />
            
            <View style={styles.socialColumn}>
              <Text style={styles.socialValue}>8</Text>
              <Text style={styles.socialLabel}>Group Meals</Text>
            </View>
            
            <View style={styles.socialDivider} />
            
            <View style={styles.socialColumn}>
              <Text style={styles.socialValue}>5</Text>
              <Text style={styles.socialLabel}>Recommendations</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => console.log('View social details')}
          >
            <Text style={styles.viewDetailsText}>View Detailed Social Stats</Text>
            <PieChart size={16} color={Colors.primary[800]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100],
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
  },
  timeFrameContainer: {
    marginBottom: Spacing.xl,
  },
  timeFrameScroll: {
    paddingRight: Spacing.xl,
  },
  summaryContainer: {
    marginBottom: Spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    padding: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryCard: {
    backgroundColor: Colors.primary[800],
    marginRight: Spacing.md,
  },
  secondaryCard: {
    backgroundColor: Colors.secondary[100],
  },
  accentCard: {
    backgroundColor: Colors.accent[400],
    marginRight: Spacing.md,
  },
  tertiaryCard: {
    backgroundColor: Colors.success[500],
  },
  summaryValue: {
    ...Typography.h3,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    ...Typography.body2,
    color: Colors.white,
    opacity: 0.8,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h5,
    marginBottom: Spacing.lg,
  },
  preferencesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  preferenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  preferenceContent: {
    flex: 1,
  },
  preferenceLabel: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  preferenceValue: {
    ...Typography.body1,
    fontFamily: 'Poppins-Medium',
  },
  socialContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.lg,
  },
  socialColumn: {
    flex: 1,
    alignItems: 'center',
  },
  socialValue: {
    ...Typography.h3,
    color: Colors.primary[800],
    marginBottom: Spacing.xs,
  },
  socialLabel: {
    ...Typography.caption,
    color: Colors.gray[600],
  },
  socialDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.gray[200],
  },
  viewDetailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  viewDetailsText: {
    ...Typography.body2,
    fontFamily: 'Poppins-Medium',
    color: Colors.primary[800],
    marginRight: Spacing.sm,
  },
});