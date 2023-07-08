import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
