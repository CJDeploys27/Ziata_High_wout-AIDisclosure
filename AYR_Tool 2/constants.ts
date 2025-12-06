
import { Language, RiskLevel } from './types';

export const surveyQuestion = {
  questionId: 'q1',
  options: [
    { id: 'a', risk: 'Lower' as RiskLevel, explanationKey: 'explanationA' },
    { id: 'b', risk: 'Moderate' as RiskLevel, explanationKey: 'explanationB' },
    { id: 'c', risk: 'Higher' as RiskLevel, explanationKey: 'explanationC' },
  ],
};

type TranslationContent = {
  landingTitle: string;
  landingSubtitle: string;
  landingButton: string;
  languageTitle: string;
  progress: string;
  surveyQuestion: string;
  surveyOptions: {
    a: string;
    b: string;
    c: string;
  };
  resultsHeader: string;
  yourResults: string;
  riskLevels: {
    Lower: string;
    Moderate: string;
    Higher: string;
  };
  effectsOfResults: string;
  riskExplanation: string;
  explanations: {
    explanationA: string;
    explanationB: string;
    explanationC: string;
  };
  whatNext: string;
  whatNextBody: string;
  locations: string[];
  saveButton: string;
  callButton: string;
  againButton: string;
};

export const translations: Record<Language, TranslationContent> = {
  [Language.EN]: {
    landingTitle: 'One Step at a Time',
    landingSubtitle: 'Assess Your Risk Today',
    landingButton: 'Your First Steps',
    languageTitle: 'Please select your preferred language.',
    progress: 'Question 1 of 1',
    surveyQuestion: 'How often do you think about your long-term health and taking preventative measures?',
    surveyOptions: {
      a: "Regularly, I'm proactive about it.",
      b: 'Sometimes, when I feel symptoms or I\'m reminded.',
      c: "Rarely, I feel healthy and don't see the need.",
    },
    resultsHeader: 'For the next recipe, and every Sunday to come.',
    yourResults: 'Your Results',
    riskLevels: {
      Lower: 'Lower',
      Moderate: 'Moderate',
      Higher: 'Higher',
    },
    effectsOfResults: 'Effects of Your Results',
    riskExplanation: 'Effect on your risk:',
    explanations: {
        explanationA: 'Being proactive about your health is the best way to prevent future issues and is associated with lower risk.',
        explanationB: 'Reacting to symptoms is common, but preventative care can catch things early. This indicates a moderate risk level.',
        explanationC: 'Feeling healthy is great, but many serious conditions have no early symptoms. A lack of preventative thinking may increase risk.',
    },
    whatNext: 'What to do next.',
    whatNextBody: 'Take your results to a medical professional. Find a location near you.',
    locations: ['Dorchester', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'Roxbury', 'Other Location'],
    saveButton: 'Save Your Results',
    callButton: 'Call Now',
    againButton: 'Assess Again',
  },
  [Language.ES]: {
    landingTitle: 'Un Paso a la Vez',
    landingSubtitle: 'Evalúe su Riesgo Hoy',
    landingButton: 'Sus Primeros Pasos',
    languageTitle: 'Por favor, seleccione su idioma preferido.',
    progress: 'Pregunta 1 de 1',
    surveyQuestion: '¿Con qué frecuencia piensa en su salud a largo plazo y en tomar medidas preventivas?',
    surveyOptions: {
      a: 'Regularmente, soy proactivo al respecto.',
      b: 'A veces, cuando siento síntomas o me lo recuerdan.',
      c: 'Rara vez, me siento saludable y no veo la necesidad.',
    },
    resultsHeader: '¡Gracias por dar sus siguientes pasos!',
    yourResults: 'Sus Resultados',
    riskLevels: {
      Lower: 'Bajo',
      Moderate: 'Moderado',
      Higher: 'Alto',
    },
    effectsOfResults: 'Efectos de sus Resultados',
    riskExplanation: 'Efecto en su riesgo:',
    explanations: {
        explanationA: 'Ser proactivo con su salud es la mejor manera de prevenir problemas futuros y se asocia con un menor riesgo.',
        explanationB: 'Reaccionar a los síntomas es común, pero la atención preventiva puede detectar las cosas a tiempo. Esto indica un nivel de riesgo moderado.',
        explanationC: 'Sentirse saludable es genial, pero muchas condiciones graves no tienen síntomas tempranos. La falta de pensamiento preventivo puede aumentar el riesgo.',
    },
    whatNext: '¡Qué hacer a Continuación!',
    whatNextBody: 'Lleve sus resultados a un profesional médico. Encuentre una ubicación cerca de usted.',
    locations: ['Dorchester', 'Jamaica Plain', 'Mattapan', 'Mission Hill', 'Roxbury', 'Otra Ubicación'],
    saveButton: 'Guardar Resultados',
    callButton: 'Llamar Ahora',
    againButton: 'Evaluar de Nuevo',
  },
  [Language.ZH]: {
    landingTitle: '一步一个脚印',
    landingSubtitle: '今天评估您的风险',
    landingButton: '迈出第一步',
    languageTitle: '请选择您的首选语言。',
    progress: '问题 1 / 1',
    surveyQuestion: '您多久会考虑一次您的长期健康并采取预防措施？',
    surveyOptions: {
      a: '经常，我对此很主动。',
      b: '有时，当我感觉到症状或被提醒时。',
      c: '很少，我感觉很健康，觉得没必要。',
    },
    resultsHeader: '感谢您迈出下一步！',
    yourResults: '您的结果',
    riskLevels: {
      Lower: '较低',
      Moderate: '中等',
      Higher: '较高',
    },
    effectsOfResults: '您的结果的影响',
    riskExplanation: '对您风险的影响：',
    explanations: {
        explanationA: '积极主动地关注您的健康是预防未来问题的最佳方式，并且与较低的风险相关。',
        explanationB: '对症状做出反应是常见的，但预防性护理可以及早发现问题。这表明风险水平为中等。',
        explanationC: '感觉健康是件好事，但许多严重疾病早期没有症状。缺乏预防性思维可能会增加风险。',
    },
    whatNext: '接下来做什么！',
    whatNextBody: '将您的结果带给医疗专业人员。查找您附近的地点。',
    locations: ['多切斯特', '牙买加平原', '马塔潘', '使命山', '罗克斯伯里', '其他地点'],
    saveButton: '保存您的结果',
    callButton: '立即致电',
    againButton: '再次评估',
  },
};
