import React from 'react';
import { PublishScreen } from '../src/features/create/PublishScreen';
import { useLocalSearchParams } from 'expo-router';

export default function PublishRoute() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  return <PublishScreen uri={uri || ''} />;
}
