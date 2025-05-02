import { useColorScheme as useNativewindColorScheme } from 'nativewind';
// import { Appearance } from 'react-native';

export function useColorScheme() {
  // eslint-disable-next-line @typescript-eslint/unbound-method  -- unoverridable package types
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  // const systemColorSchema = Appearance.getColorScheme() ?? 'dark';

  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  };
}
