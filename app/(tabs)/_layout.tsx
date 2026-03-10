import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Archive } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: '약방',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: '약장',
          tabBarIcon: ({ color }) => <Archive size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
