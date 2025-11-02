
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import CookieBanner from './components/feature/CookieBanner';

function App() {
  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <AppRoutes />
      <CookieBanner />
    </BrowserRouter>
  );
}

export default App;
