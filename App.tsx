import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import BaseNavigation from './src/navigation/BaseNavigation';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <BaseNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
