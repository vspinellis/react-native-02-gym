import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { useTheme, Box } from 'native-base';
import { AppRoutes } from './app.routes';

export function Router() {
  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}