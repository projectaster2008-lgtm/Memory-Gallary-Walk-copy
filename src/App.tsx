import { WorldProvider } from './context/WorldContext';
import WorldContainer from './components/WorldContainer';

export default function App() {
  return (
    <WorldProvider>
      <WorldContainer />
    </WorldProvider>
  );
}


