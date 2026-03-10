import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity, Pressable,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import {
  Sparkles,
  Send,
  RefreshCcw,
  Heart,
  Brain,
  Coffee,
  Flame,
} from "lucide-react-native";
import {
  getPrescription,
  AnalysisResult,
  PrescriptionStyle,
} from "@/src/services/ai";
import { usePrescriptionStore } from "@/src/store/usePrescriptionStore";
import PrescriptionCard from "@/src/components/Prescription/PrescriptionCard";

const { width } = Dimensions.get("window");

type Step = "consultation" | "styleSelection" | "alchemy" | "prescription";

export default function HomeScreen() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [step, setStep] = useState<Step>("consultation");
  const [concern, setConcern] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<PrescriptionStyle>("F");
  const [prescription, setPrescription] = useState<AnalysisResult | null>(null);
  const addPrescription = usePrescriptionStore(
    (state) => state.addPrescription,
  );

  const translateY = useSharedValue(0);

  useEffect(() => {
    // Floating Animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000 }),
        withTiming(10, { duration: 2000 }),
      ),
      -1,
      true,
    );

    // Force hide splash after 2 seconds
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const animatedFloatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const handleStartSelection = () => {
    if (!concern.trim()) return;
    setStep("styleSelection");
  };

  const handleRequest = async () => {
    setStep("alchemy");
    try {
      const result = await getPrescription(concern, selectedStyle);
      setPrescription(result);
      addPrescription(result);
      setStep("prescription");
    } catch (error) {
      console.error(error);
      setStep("consultation");
    }
  };

  const reset = () => {
    setConcern("");
    setPrescription(null);
    setStep("consultation");
  };

  const styles = [
    {
      id: "F",
      name: "공감",
      desc: "마음을 어루만지는 따뜻한 위로",
      icon: Heart,
    },
    {
      id: "T",
      name: "이성",
      desc: "냉철하고 현실적인 분석과 조언",
      icon: Brain,
    },
    {
      id: "W",
      name: "온기",
      desc: "포근한 격려와 아날로그적 감성",
      icon: Coffee,
    },
  ] as const;

  // 1. Splash Screen (No 'entering' props for stability)
  if (isSplashVisible) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#B7C9B0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ alignItems: "center" }}>
          <Animated.View style={animatedFloatingStyle}>
            <View
              style={{
                backgroundColor: "white",
                padding: 24,
                borderRadius: 100,
              }}
            >
              <Flame size={64} color="#B7C9B0" />
            </View>
          </Animated.View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "white",
              marginTop: 32,
              letterSpacing: 4,
            }}
          >
            숨표 AI
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              marginTop: 16,
              fontWeight: "500",
              opacity: 0.8,
            }}
          >
            마음이 쉬어가는 시간
          </Text>

          <Pressable
            onPress={() => {
              console.log("Skip button pressed!");
              setIsSplashVisible(false);
            }}
            style={({ pressed }) => ({
              marginTop: 40,
              padding: 20,
              zIndex: 10,
              opacity: pressed ? 0.6 : 1,
            })}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                opacity: 0.9,
                textDecorationLine: "underline",
                fontWeight: "600",
              }}
            >
              건너뛰기
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // 2. Main Content
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#F9F8F6" }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 60 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: 24 }}>
          {/* Header */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Animated.View style={animatedFloatingStyle}>
              <View
                style={{
                  backgroundColor: "rgba(183, 201, 176, 0.2)",
                  padding: 20,
                  borderRadius: 100,
                }}
              >
                <Flame size={40} color="#B7C9B0" />
              </View>
            </Animated.View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#4A4A4A",
                marginTop: 16,
              }}
            >
              심야의 약방
            </Text>
            <Text
              style={{ color: "#9CA3AF", marginTop: 4, textAlign: "center" }}
            >
              당신의 지친 하루에 쉼표를 찍어드립니다
            </Text>
          </View>

          {/* Logic Steps */}
          {step === "consultation" && (
            <View
              style={{
                backgroundColor: "white",
                padding: 24,
                borderRadius: 32,
                borderWidth: 1,
                borderColor: "#F3F4F6",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Sparkles size={20} color="#B7C9B0" />
                <Text
                  style={{
                    marginLeft: 8,
                    fontWeight: "bold",
                    color: "#374151",
                    fontSize: 18,
                  }}
                >
                  오늘 당신의 마음은 어떤가요?
                </Text>
              </View>
              <TextInput
                multiline
                placeholder="털어놓고 싶은 이야기를 담아주세요..."
                placeholderTextColor="#9CA3AF"
                style={{
                  backgroundColor: "#F9F8F6",
                  padding: 20,
                  borderRadius: 16,
                  height: 200,
                  marginBottom: 24,
                  color: "#374151",
                  fontSize: 16,
                  textAlignVertical: "top",
                }}
                value={concern}
                onChangeText={setConcern}
              />
              <TouchableOpacity
                onPress={handleStartSelection}
                disabled={!concern.trim()}
                style={{
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: !concern.trim() ? "#F3F4F6" : "#B7C9B0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 18,
                    color: !concern.trim() ? "#D1D5DB" : "white",
                  }}
                >
                  다음 단계로
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {step === "styleSelection" && (
            <View style={{ gap: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#4A4A4A",
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                어떤 처방을 원하시나요?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                {styles.map((s) => (
                  <TouchableOpacity
                    key={s.id}
                    onPress={() => setSelectedStyle(s.id as PrescriptionStyle)}
                    style={{
                      width: width * 0.26,
                      padding: 16,
                      borderRadius: 24,
                      borderWidth: 2,
                      borderColor:
                        selectedStyle === s.id ? "#B7C9B0" : "transparent",
                      backgroundColor:
                        selectedStyle === s.id ? "white" : "#F9F8F6",
                      alignItems: "center",
                    }}
                  >
                    <s.icon
                      size={32}
                      color={selectedStyle === s.id ? "#B7C9B0" : "#D1D5DB"}
                    />
                    <Text
                      style={{
                        marginTop: 8,
                        fontWeight: "bold",
                        color: selectedStyle === s.id ? "#B7C9B0" : "#9CA3AF",
                      }}
                    >
                      {s.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity
                onPress={handleRequest}
                style={{
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "#B7C9B0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                  처방전 조제 시작
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {step === "alchemy" && (
            <View style={{ alignItems: "center", paddingVertical: 80 }}>
              <ActivityIndicator size="large" color="#B7C9B0" />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#4A4A4A",
                  marginTop: 24,
                }}
              >
                마음을 읽고 있습니다...
              </Text>
            </View>
          )}

          {step === "prescription" && prescription && (
            <View>
              <PrescriptionCard {...prescription} />
              <TouchableOpacity
                onPress={reset}
                style={{ marginTop: 40, alignItems: "center" }}
              >
                <Text style={{ color: "#B7C9B0", fontWeight: "bold" }}>
                  새로 조제하기
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
