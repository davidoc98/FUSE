import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { AppButton } from '../../components/AppButton';
import { useStore } from '../../store/useStore';

interface PublishScreenProps {
  uri: string;
}

export const PublishScreen: React.FC<PublishScreenProps> = ({ uri }) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addVideo = useStore((state) => state.addVideo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);

  const handlePublish = () => {
    if (!title.trim() || !uri) return;

    addVideo({
      url: uri,
      title: title.trim(),
      description: description.trim(),
      tags: aiGenerated ? ['AI'] : [],
    });

    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <AppIcon name="arrow-back" size={24} color={tokens.colors['on-surface']} />
        </Pressable>
        <Text style={styles.headerTitle}>Опубликовать</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.previewContainer}>
            <View style={styles.thumbnail}>
                <Image source={{ uri }} style={styles.image} />
                <View style={styles.playIcon}>
                    <AppIcon name="play" size={24} color="white" />
                </View>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.titleInput}
                    placeholder="Название истории"
                    placeholderTextColor={tokens.colors['on-surface-variant']}
                    value={title}
                    onChangeText={setTitle}
                    maxLength={60}
                />
                <TextInput
                    style={styles.descInput}
                    placeholder="Добавьте описание, упомяните соавторов..."
                    placeholderTextColor={tokens.colors['on-surface-variant']}
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    maxLength={300}
                />
            </View>
        </View>

        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Настройки и прозрачность (Proof Layer)</Text>

            <Pressable style={styles.settingRow} onPress={() => setAiGenerated(!aiGenerated)}>
                <View style={styles.settingInfo}>
                    <Text style={styles.settingLabel}>Создано с помощью AI</Text>
                    <Text style={styles.settingDesc}>Укажите, если видео или аудио сгенерированы искусственным интеллектом.</Text>
                </View>
                <View style={[styles.toggle, aiGenerated && styles.toggleActive]}>
                    {aiGenerated && <AppIcon name="checkmark" size={16} color={tokens.colors.background} />}
                </View>
            </Pressable>
        </View>

        <AppButton
            title="Опубликовать"
            onPress={handlePublish}
            style={[styles.publishBtn, !title.trim() && styles.publishBtnDisabled]}
            disabled={!title.trim()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingVertical: tokens.spacing.stackSm,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
  },
  headerTitle: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.headlineMd.fontFamily,
    fontSize: 18,
    fontWeight: '600',
  },
  backBtn: {
    padding: tokens.spacing.unit,
  },
  content: {
    padding: tokens.spacing.containerMarginMobile,
  },
  previewContainer: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.stackLg,
  },
  thumbnail: {
    width: 100,
    height: 140,
    backgroundColor: tokens.colors['surface-container-highest'],
    borderRadius: tokens.rounded.md,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 4,
  },
  inputs: {
    flex: 1,
    marginLeft: tokens.spacing.stackMd,
  },
  titleInput: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors['surface-container-highest'],
    paddingBottom: tokens.spacing.stackSm,
    marginBottom: tokens.spacing.stackMd,
  },
  descInput: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: tokens.spacing.stackLg,
  },
  sectionTitle: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.labelCaps.fontFamily,
    fontSize: tokens.typography.labelCaps.fontSize,
    textTransform: 'uppercase',
    letterSpacing: tokens.typography.labelCaps.letterSpacing,
    marginBottom: tokens.spacing.stackMd,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors['surface-container'],
    padding: tokens.spacing.stackSm,
    borderRadius: tokens.rounded.md,
  },
  settingInfo: {
    flex: 1,
    marginRight: tokens.spacing.stackMd,
  },
  settingLabel: {
    color: tokens.colors['on-surface'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDesc: {
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 12,
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: tokens.colors['outline-variant'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: tokens.colors.primary,
    borderColor: tokens.colors.primary,
  },
  publishBtn: {
    marginTop: tokens.spacing.stackLg,
  },
  publishBtnDisabled: {
    opacity: 0.5,
  }
});
