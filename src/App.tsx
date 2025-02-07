import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import AdminView from './pages/AdminView';
import UserView from './pages/UserView';
import Header from './components/Header';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isAdmin={isAdmin} onToggle={() => setIsAdmin(!isAdmin)} />
      {isAdmin ? <AdminView /> : <UserView />}
    </ThemeProvider>
  );
};

export default App;
