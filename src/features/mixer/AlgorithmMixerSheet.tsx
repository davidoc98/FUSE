import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useStore } from '../../store/useStore';
import { tokens } from '../../design-system/tokens';
import { AppButton } from '../../components/AppButton';
import { AlgorithmSlider } from './AlgorithmSlider';

export const AlgorithmMixerSheet = forwardRef<BottomSheet>((props, ref) => {
  const snapPoints = useMemo(() => ['85%'], []);
  const mixerSettings = useStore((state) => state.mixerSettings);
  const setMixerSettings = useStore((state) => state.setMixerSettings);
  const applyMixerSettings = useStore((state) => state.applyMixerSettings);

  const handleApply = useCallback(() => {
    applyMixerSettings();
    if (ref && 'current' in ref && ref.current) {
        ref.current.close();
    }
  }, [applyMixerSettings, ref]);

  const handleReset = useCallback(() => {
    setMixerSettings({
        mode: 'ai',
        familiarity: 0.5,
        entertainment: 0.5,
        locality: 0.5,
        depth: 0.5,
    });
  }, [setMixerSettings]);

  const renderBackdrop = useCallback(
		(props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.7} />,
		[]
	);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.header}>
            <Text style={styles.title}>Миксер рекомендаций</Text>
            <Pressable onPress={handleReset}>
                <Text style={styles.resetText}>Сбросить</Text>
            </Pressable>
        </View>

        <View style={styles.modeSelector}>
            {(['people', 'ai', 'any'] as const).map((mode) => (
                <Pressable
                    key={mode}
                    style={[styles.modeButton, mixerSettings.mode === mode && styles.modeButtonActive]}
                    onPress={() => setMixerSettings({ mode })}
                >
                    <Text style={[styles.modeText, mixerSettings.mode === mode && styles.modeTextActive]}>
                        {mode === 'people' ? 'Только люди' : mode === 'ai' ? 'С помощью AI' : 'Любой контент'}
                    </Text>
                </Pressable>
            ))}
        </View>

        <AlgorithmSlider
            label="Знакомое — Новое"
            value={mixerSettings.familiarity}
            leftLabel="Знакомое" rightLabel="Новое"
            onValueChange={(val) => setMixerSettings({ familiarity: val })}
        />
        <AlgorithmSlider
            label="Развлечение — Польза"
            value={mixerSettings.entertainment}
            leftLabel="Развлечение" rightLabel="Польза"
            onValueChange={(val) => setMixerSettings({ entertainment: val })}
        />
        <AlgorithmSlider
            label="Локальное — Глобальное"
            value={mixerSettings.locality}
            leftLabel="Локальное" rightLabel="Глобальное"
            onValueChange={(val) => setMixerSettings({ locality: val })}
        />
        <AlgorithmSlider
            label="Быстрое — Глубокое"
            value={mixerSettings.depth}
            leftLabel="Быстрое" rightLabel="Глубокое"
            onValueChange={(val) => setMixerSettings({ depth: val })}
        />

        <AppButton title="Обновить ленту" onPress={handleApply} style={styles.applyButton} />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: tokens.colors['surface-container'],
    borderRadius: tokens.rounded.xl,
  },
  handleIndicator: {
    backgroundColor: tokens.colors['outline-variant'],
    width: 48,
    height: 6,
  },
  contentContainer: {
    flex: 1,
    padding: tokens.spacing.containerMarginMobile,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.stackMd,
  },
  title: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: tokens.typography.headlineMd.fontSize,
    fontWeight: tokens.typography.headlineMd.fontWeight as any,
  },
  resetText: {
    color: tokens.colors.primary,
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: tokens.typography.bodyMd.fontSize,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: tokens.colors['surface-container-high'],
    borderRadius: tokens.rounded.md,
    padding: tokens.spacing.unit,
    marginBottom: tokens.spacing.stackLg,
  },
  modeButton: {
    flex: 1,
    paddingVertical: tokens.spacing.unit * 2.5,
    alignItems: 'center',
    borderRadius: tokens.rounded.sm,
  },
  modeButtonActive: {
    backgroundColor: tokens.colors['surface-bright'],
  },
  modeText: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
  },
  modeTextActive: {
    color: tokens.colors['on-surface'],
    fontWeight: '600',
  },
  applyButton: {
    marginTop: 'auto',
    marginBottom: tokens.spacing.stackMd,
  }
});

AlgorithmMixerSheet.displayName = 'AlgorithmMixerSheet';
