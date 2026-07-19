import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { LinearGradient } from 'expo-linear-gradient';

export const CreateScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AppIcon name="close" size={28} color={tokens.colors['on-surface']} />
        <Text style={styles.headerTitle}>Новая история</Text>
        <AppIcon name="settings-outline" size={24} color={tokens.colors['on-surface']} />
      </View>

      <View style={styles.cameraPlaceholder}>
        <AppIcon name="camera-outline" size={64} color={tokens.colors['surface-container-highest']} />
        <Text style={styles.placeholderText}>Камера временно недоступна в прототипе</Text>
      </View>

      <View style={styles.controlsRow}>
        <View style={styles.sideControls}>
           <Pressable style={styles.controlBtn}>
               <AppIcon name="image-outline" size={28} color="white" />
           </Pressable>
        </View>

        <Pressable style={styles.recordBtnContainer}>
            <LinearGradient
                colors={[tokens.colors['primary-container'], tokens.colors['secondary-container']]}
                style={styles.recordBtnRing}
            >
                <View style={styles.recordBtnInner} />
            </LinearGradient>
        </Pressable>

        <View style={styles.sideControls}>
           <Pressable style={styles.controlBtn}>
               <AppIcon name="sparkles-outline" size={28} color="white" />
           </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.containerMarginMobile,
    paddingBottom: tokens.spacing.stackSm,
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: tokens.colors['surface-container-low'],
    margin: tokens.spacing.containerMarginMobile,
    borderRadius: tokens.rounded.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: tokens.spacing.stackSm,
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 120, // space for tab bar
    paddingHorizontal: tokens.spacing.containerMarginMobile,
  },
  sideControls: {
    width: 60,
    alignItems: 'center',
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: tokens.colors['surface-container-high'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBtnContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordBtnRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4, // border width
  },
  recordBtnInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: tokens.colors.background,
  }
});
