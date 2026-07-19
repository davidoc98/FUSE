import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, Alert } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../../design-system/tokens';
import { AppIcon } from '../../components/AppIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export const CreateScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const toggleFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(current => (current === 'off' ? 'on' : current === 'on' ? 'auto' : 'off'));
  };

  const handlePermissions = async () => {
    if (!cameraPermission?.granted) await requestCameraPermission();
    if (!microphonePermission?.granted) await requestMicrophonePermission();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      router.push({ pathname: '/publish', params: { uri: result.assets[0].uri } });
    }
  };

  const handleRecord = async () => {
    if (!cameraRef.current) return;

    if (isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      try {
        const video = await cameraRef.current.recordAsync({ maxDuration: 60 });
        if (video?.uri) {
          router.push({ pathname: '/publish', params: { uri: video.uri } });
        }
      } catch (e) {
        setIsRecording(false);
        Alert.alert('Ошибка', 'Не удалось записать видео');
      }
    }
  };

  if (!cameraPermission || !microphonePermission) {
    return <View style={styles.container} />;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.placeholderText}>Камера и микрофон нужны для записи.</Text>
        <Pressable onPress={handlePermissions} style={styles.permissionBtn}>
          <Text style={styles.permissionBtnText}>Разрешить доступ</Text>
        </Pressable>
      </View>
    );
  }

  if (Platform.OS === 'web') {
      return (
         <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
              <Pressable onPress={() => router.push('/')}>
                 <AppIcon name="close" size={28} color={tokens.colors['on-surface']} />
              </Pressable>
              <Text style={styles.headerTitle}>Новая история</Text>
              <AppIcon name="settings-outline" size={24} color={tokens.colors['on-surface']} />
            </View>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>Веб-камера поддерживается ограниченно.</Text>
              <Pressable onPress={pickImage} style={styles.permissionBtn}>
                 <Text style={styles.permissionBtnText}>Выбрать файл</Text>
              </Pressable>
            </View>
         </View>
      )
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        flash={flash}
        mode="video"
        ref={cameraRef}
      >
        <View style={[styles.header, { marginTop: insets.top + tokens.spacing.stackSm }]}>
          <Pressable onPress={() => router.push('/')}>
            <AppIcon name="close" size={28} color="white" />
          </Pressable>
          <Text style={[styles.headerTitle, { color: 'white' }]}>Новая история</Text>
          <Pressable onPress={toggleFlash}>
             <AppIcon name={flash === 'off' ? "flash-off-outline" : "flash-outline"} size={24} color="white" />
          </Pressable>
        </View>

        <View style={styles.controlsRow}>
          <View style={styles.sideControls}>
            <Pressable style={styles.controlBtn} onPress={pickImage}>
                <AppIcon name="images-outline" size={24} color="white" />
            </Pressable>
          </View>

          <Pressable style={styles.recordBtnContainer} onPress={handleRecord}>
              <LinearGradient
                  colors={[tokens.colors['primary-container'], tokens.colors['secondary-container']]}
                  style={[styles.recordBtnRing, isRecording && styles.recordBtnRingActive]}
              >
                  <View style={[styles.recordBtnInner, isRecording && styles.recordBtnInnerActive]} />
              </LinearGradient>
          </Pressable>

          <View style={styles.sideControls}>
            <Pressable style={styles.controlBtn} onPress={toggleFacing}>
                <AppIcon name="camera-reverse-outline" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: tokens.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.containerMarginDesktop,
  },
  permissionBtn: {
    marginTop: tokens.spacing.stackMd,
    paddingHorizontal: tokens.spacing.stackMd,
    paddingVertical: tokens.spacing.stackSm,
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.rounded.md,
  },
  permissionBtnText: {
    color: tokens.colors.background,
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.containerMarginMobile,
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
    color: tokens.colors['on-surface-variant'],
    fontFamily: tokens.typography.bodyMd.fontFamily,
    fontSize: 14,
    textAlign: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: tokens.spacing.containerMarginMobile,
  },
  sideControls: {
    width: 60,
    alignItems: 'center',
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    padding: 4,
  },
  recordBtnRingActive: {
     transform: [{ scale: 1.2 }],
  },
  recordBtnInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: 'white',
  },
  recordBtnInnerActive: {
     borderRadius: tokens.rounded.sm,
     width: '40%',
     height: '40%',
     backgroundColor: tokens.colors.primary,
  }
});
