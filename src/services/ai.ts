export type PrescriptionStyle = 'F' | 'T' | 'W';

export interface AnalysisResult {
  title: string;
  content: string;
  quote: string;
  style?: PrescriptionStyle;
}

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export async function getPrescription(userConcern: string, style: PrescriptionStyle = 'F'): Promise<AnalysisResult> {
  if (!API_KEY) {
    console.error('Gemini API Key is missing!');
  }

  const stylePrompts = {
    'F': '따뜻한 공감과 감정적 지지를 중심으로 답변하는 공감형 약사',
    'T': '냉철하지만 현실적인 해결책과 이성적 분석을 제공하는 이성형 약사',
    'W': '포근한 위로와 격려, 아날로그적인 감성을 담아 답변하는 위로형 약사'
  };

  const prompt = `
    당신은 심야의 AI 약사입니다. 현재 선택된 조제 스타일은 [${stylePrompts[style]}] 입니다.
    사용자의 고민을 듣고, 마음을 어루만지는 처방전 제목, 상세 처방 내용, 그리고 위로가 되는 한 줄 명언(quote)을 JSON 형식으로 작성해 주세요. 
    
    처방전 제목은 창의적이고 은유적이어야 하며(예: 반짝이는 고독의 연고, 젖은 마음을 말리는 볕 등), 내용은 선택된 스타일에 맞춰 따뜻한 구어체로 작성해 주세요. 

    사용자의 고민: "${userConcern}"

    반드시 아래 JSON 형식으로만 응답하세요:
    { 
      "title": "처방전 제목", 
      "content": "상세 처방 내용", 
      "quote": "위로가 되는 한 줄 명언" 
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return { ...JSON.parse(text), style } as AnalysisResult;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      title: '잠시 쉬어가는 시간',
      content: '지금은 약방의 문이 잠시 닫혀 있습니다. 잠시 후에 다시 들러주세요. 당신의 마음은 소중합니다.',
      quote: '잠시 멈추어도 괜찮습니다.',
      style
    };
  }
}
