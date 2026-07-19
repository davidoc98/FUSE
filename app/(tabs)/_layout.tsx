import { Tabs } from 'expo-router';
import { tokens } from '../../src/design-system/tokens';
import { Platform } from 'react-native';
import { BottomNavigation } from '../../src/features/navigation/BottomNavigation';
import { AppIcon } from '../../src/components/AppIcon';

export default function TabLayout() {
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
