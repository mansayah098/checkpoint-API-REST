import { HandbagProvider } from './context/HandbagContext';
import HandbagList from './components/HandbagList';

function App() {
  return (
    <HandbagProvider>
      <HandbagList />
    </HandbagProvider>
  );
}

export default App;