import { Tabs } from 'expo-router';
import { tokens } from '../../src/design-system/tokens';
import { Platform, View, StyleSheet } from 'react-native';
import { BottomNavigation } from '../../src/features/navigation/BottomNavigation';
import { SideNavigation } from '../../src/features/navigation/SideNavigation';
import { AppIcon } from '../../src/components/AppIcon';
import { useResponsive } from '../../src/hooks/useResponsive';

export default function TabLayout() {
  const { isDesktop } = useResponsive();

  if (isDesktop) {
    return (
      <View style={styles.desktopContainer}>
        <SideNavigation />
        <View style={styles.desktopContent}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { display: 'none' }, // Hide bottom tabs on desktop
            }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="circle" />
            <Tabs.Screen name="create" />
            <Tabs.Screen name="worlds" />
            <Tabs.Screen name="profile" />
          </Tabs>
        </View>
      </View>
    );
  }

  // Mobile layout
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.primary,
        tabBarInactiveTintColor: tokens.colors['on-surface-variant'],
        tabBarStyle: {
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : tokens.colors['surface-container'],
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarBackground: () => <BottomNavigation />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Пульс',
          tabBarIcon: ({ color }) => <AppIcon name="infinite" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="circle"
        options={{
          title: 'Круг',
          tabBarIcon: ({ color }) => <AppIcon name="people-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Создать',
          tabBarIcon: ({ color }) => <AppIcon name="add-circle-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="worlds"
        options={{
          title: 'Миры',
          tabBarIcon: ({ color }) => <AppIcon name="planet-outline" size={24} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <AppIcon name="person-outline" size={24} color={color as string} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: tokens.colors.background,
  },
  desktopContent: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  }
});
