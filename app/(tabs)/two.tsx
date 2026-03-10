import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInLeft, Layout } from 'react-native-reanimated';
import { Trash2, Calendar, Pill, Sparkles } from 'lucide-react-native';
import { usePrescriptionStore } from '@/src/store/usePrescriptionStore';

export default function CabinetScreen() {
  const history = usePrescriptionStore((state) => state.history);
  const removePrescription = usePrescriptionStore((state) => state.removePrescription);

  const confirmDelete = (id: string) => {
    Alert.alert(
      '처방전 폐기',
      '이 처방전을 정말로 폐기할까요? 소중한 위로의 기록이 사라집니다.',
      [
        { text: '취소', style: 'cancel' },
        { text: '폐기', style: 'destructive', onPress: () => removePrescription(id) },
      ]
    );
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
  };

  const styleInfo = {
    'F': { name: '공감', color: '#F87171' },
    'T': { name: '이성', color: '#60A5FA' },
    'W': { name: '온기', color: '#FBBF24' }
  };

  return (
    <View className="flex-1 bg-warm-white px-6 pt-20">
      <Text className="text-3xl font-bold text-soft-charcoal mb-2">나만의 약장</Text>
      <Text className="text-lg text-gray-400 mb-8 font-medium">차곡차곡 모아둔 마음의 기록들</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInLeft.delay(index * 100).duration(500)}
            layout={Layout.springify()}
            className="bg-white p-5 rounded-[28px] mb-4 shadow-sm flex-row items-center border border-gray-50"
          >
            <View className="bg-warm-white p-4 rounded-2xl mr-4">
              <Pill size={24} color="#B7C9B0" />
            </View>
            
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                {item.style && (
                  <View className="bg-sage-green/10 px-2 py-0.5 rounded-md mr-2">
                    <Text className="text-[8px] font-bold text-sage-green uppercase">
                      {styleInfo[item.style as keyof typeof styleInfo]?.name || '조제'}
                    </Text>
                  </View>
                )}
                <Text className="text-sm text-gray-400 font-medium">
                  {formatDate(item.createdAt)}
                </Text>
              </View>
              
              <Text className="text-lg font-bold text-soft-charcoal" numberOfLines={1}>
                {item.title}
              </Text>
            </View>

            <TouchableOpacity 
              onPress={() => confirmDelete(item.id)} 
              className="p-3 bg-gray-50 rounded-full"
              activeOpacity={0.6}
            >
              <Trash2 size={18} color="#FFBDAD" />
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-32">
            <View className="bg-gray-100 p-6 rounded-full mb-4">
              <Sparkles size={32} color="#D1D5DB" />
            </View>
            <Text className="text-gray-400 font-medium">아직 보관된 처방전이 없습니다.</Text>
            <Text className="text-gray-300 text-xs mt-2 text-center leading-5">
              당신의 이야기를 들려주시면`n소중한 처방전이 이곳에 쌓입니다.
            </Text>
          </View>
        }
      />
    </View>
  );
}
