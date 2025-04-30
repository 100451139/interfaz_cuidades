import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import useAutoFetchAnuncios from './hooks/useAutoFetchAnuncios';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <Dashboard />
        <AutoFetchWrapper />
      </div>
    </AppProvider>
  );
}

function AutoFetchWrapper() {
  useAutoFetchAnuncios();
  return null;
}

export default App;