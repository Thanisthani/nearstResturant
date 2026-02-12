import { SafeAreaProvider } from 'react-native-safe-area-context';
import FindNearbyResScreen from './src/screens/FindNearbyResScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlashMessage from 'react-native-flash-message';
import { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';

function App() {
  useEffect(() => {
    const init = async () => {};

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <FindNearbyResScreen />
          <FlashMessage position="top" />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
