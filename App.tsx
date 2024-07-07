import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import BaseNavigation from './src/navigation/BaseNavigation';
import { JournalProvider } from './src/context/JournalContext';

export default function App() {
  return (
    <AuthProvider>
      <JournalProvider>
        <NavigationContainer>
          <BaseNavigation />
        </NavigationContainer>
      </JournalProvider>
     
    </AuthProvider>
  );
}
