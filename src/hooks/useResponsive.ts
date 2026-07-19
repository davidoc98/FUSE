import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 768; // Стандартная точка перехода для планшетов/ПК
  const isLargeDesktop = width >= 1024;

  return {
    width,
    height,
    isDesktop,
    isLargeDesktop,
  };
};
