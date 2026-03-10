import React from 'react';
import { View, Text, Platform } from 'react-native';
import Animated, { FadeInUp, ZoomIn, FadeIn } from 'react-native-reanimated';
import { Pill, BookOpen, Quote, Sparkles } from 'lucide-react-native';

interface PrescriptionProps {
  title: string;
  content: string;
  quote: string;
  style?: 'F' | 'T' | 'W';
}

export default function PrescriptionCard({ title, content, quote, style = 'F' }: PrescriptionProps) {
  const styleInfo = {
    'F': { name: '공감의 약', color: '#F87171' },
    'T': { name: '이성의 약', color: '#60A5FA' },
    'W': { name: '온기의 약', color: '#FBBF24' }
  };

  return (
    <Animated.View 
      entering={FadeInUp.duration(800).springify()} 
      className="bg-white p-8 rounded-[40px] shadow-2xl border-t-[12px] border-sage-green"
      style={{ shadowColor: '#B7C9B0', shadowOpacity: 0.2, shadowRadius: 20 }}
    >
      {/* Badge Section */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="bg-sage-green/10 px-4 py-1.5 rounded-full flex-row items-center">
          <Sparkles size={12} color="#B7C9B0" />
          <Text className="text-[10px] font-bold text-sage-green ml-1 tracking-tighter uppercase">
            {styleInfo[style].name}
          </Text>
        </View>
        <Pill size={22} color="#B7C9B0" />
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold text-soft-charcoal mb-6 leading-8" style={{ fontFamily: Platform.OS === 'ios' ? 'Apple SD Gothic Neo' : 'sans-serif-medium' }}>
        {title}
      </Text>
      
      {/* Content Body */}
      <View className="bg-warm-white p-6 rounded-3xl mb-8 border border-gray-50">
        <View className="flex-row mb-3 items-center opacity-40">
          <BookOpen size={14} color="#4A4A4A" />
          <Text className="ml-2 text-xs font-bold text-soft-charcoal uppercase tracking-widest">
            Prescription Details
          </Text>
        </View>
        <Text 
          className="text-gray-700 leading-7 text-lg" 
          style={{ 
            fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
            fontStyle: 'normal'
          }}
        >
          {content}
        </Text>
      </View>

      {/* Quote Footer */}
      <View className="items-center border-t border-gray-50 pt-8 mt-2">
        <Quote size={28} color="#B7C9B0" className="mb-4 opacity-20" />
        <Text 
          className="text-center text-gray-500 px-6 leading-6"
          style={{ 
            fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
            fontSize: 15
          }}
        >
          {quote}
        </Text>
      </View>

      <View className="mt-8 items-center">
        <Text className="text-[10px] text-gray-300 font-bold tracking-widest">SUMPYO AI • DIGITAL PHARMACY</Text>
      </View>
    </Animated.View>
  );
}
