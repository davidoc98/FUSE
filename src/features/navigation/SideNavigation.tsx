import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { useRouter, useSegments } from 'expo-router';

export const SideNavigation = () => {
  const router = useRouter();
  const segments = useSegments();

  // Basic active state check
  const getIsActive = (route: string) => {
    if (route === '/') return segments.length === 1 && segments[0] === '(tabs)';
    return segments.includes(route.replace('/', '') as never);
  };

  const NavItem = ({ name, icon, route }: { name: string, icon: any, route: string }) => {
    const isActive = getIsActive(route);
    return (
      <Pressable
        style={[styles.navItem, isActive && styles.navItemActive]}
        onPress={() => router.push(route as any)}
      >
        <AppIcon name={icon} size={28} color={isActive ? tokens.colors.primary : tokens.colors['on-surface']} />
        <Text style={[styles.navText, isActive && styles.navTextActive]}>{name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>FUSE</Text>
      </View>

      <View style={styles.menu}>
        <NavItem name="Пульс" icon="infinite" route="/" />
        <NavItem name="Круг" icon="people-outline" route="/circle" />
        <NavItem name="Создать" icon="add-circle-outline" route="/create" />
        <NavItem name="Миры" icon="planet-outline" route="/worlds" />
        <NavItem name="Профиль" icon="person-outline" route="/profile" />
      </View>

      <View style={styles.bottomMenu}>
        <Pressable style={styles.navItem} onPress={() => router.push('/inbox')}>
          <AppIcon name="chatbubbles-outline" size={28} color={tokens.colors['on-surface']} />
          <Text style={styles.navText}>Сообщения</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: '100%',
    backgroundColor: tokens.colors['surface-container'],
    borderRightWidth: 1,
    borderRightColor: tokens.colors['surface-container-highest'],
    paddingVertical: tokens.spacing.stackLg,
    paddingHorizontal: tokens.spacing.stackMd,
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginBottom: tokens.spacing.stackLg,
    paddingHorizontal: tokens.spacing.unit * 3,
  },
  logoText: {
    color: tokens.colors.primary,
    fontFamily: tokens.typography.displayLg.fontFamily,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  menu: {
    flex: 1,
    gap: tokens.spacing.stackSm,
  },
  bottomMenu: {
    marginTop: 'auto',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: tokens.spacing.unit * 3,
    paddingHorizontal: tokens.spacing.unit * 3,
    borderRadius: tokens.rounded.md,
    gap: tokens.spacing.stackSm,
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 179, 176, 0.1)', // primary color with 10% opacity
  },
  navText: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  navTextActive: {
    color: tokens.colors.primary,
  }
});
