import {View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import BottomTabs from './src/navigation/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  
 
    
  return (
    <NavigationContainer>
      <BottomTabs/>
    </NavigationContainer>
  );
}

