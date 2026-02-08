import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import FindNearbyResScreen from './src/screens/FindNearbyResScreen';

function App() {

  return (
    <SafeAreaProvider>
      <FindNearbyResScreen />
    </SafeAreaProvider>
  );
}

export default App;
