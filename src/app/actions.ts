'use server';

import { healthQuery } from '@/ai/flows/health-query';
import { symptomCheck, type SymptomCheckOutput } from '@/ai/flows/symptom-check';
import type { Language } from '@/context/AppContext';
import { getHealthStatistics, GetHealthStatisticsOutput } from '@/ai/flows/get-health-statistics';


export async function askChatbot(query: string, language: Language): Promise<string> {
    if (!query) {
        return "Query is empty.";
    }

    const symptomKeywords = ['symptom', 'fever', 'headache', 'pain', 'cough', 'chills', 'sick', 'feel', 'belleful', 'run belle', 'high bp'];

    const isSymptomQuery = symptomKeywords.some(keyword => query.toLowerCase().includes(keyword));

    try {
        if (isSymptomQuery) {
            const result = await symptomCheck({ symptoms: query });
            let response = language === 'en' 
                ? `Based on your symptoms, here are some possible conditions:\n\n`
                : `Based on wetin you talk, dis na di sick wey fit be:\n\n`;

            result.conditions.forEach(condition => {
                response += `**${condition.name}**\n*${condition.description}*\n\n`;
            });
            response += `**${language === 'en' ? 'General Advice' : 'Advice for you'}:**\n${result.advice}\n\n*${language === 'en' ? 'Disclaimer: This is not a medical diagnosis. Please consult a healthcare professional.' : 'Note: Dis no be doctor talk. Abeg go see doctor.'}*`;
            return response;

        } else {
            const result = await healthQuery({ query });
            return result.answer;
        }
    } catch (error) {
        console.error('Error handling user query:', error);
        return 'I am having trouble connecting to my knowledge base. Please try again later.';
    }
}

export type AnalyzeHealthTopicOutput = SymptomCheckOutput;

export async function analyzeHealthTopic(topic: string): Promise<AnalyzeHealthTopicOutput> {
  if (!topic) {
    return { conditions: [], advice: '' };
  }
  try {
    const result = await symptomCheck({ symptoms: topic });
    return result;
  } catch(e) {
    console.error(e);
    return { conditions: [], advice: 'Sorry, I am having trouble connecting. Please try again.' };
  }
}

export async function symptomCheckFlow(prevState: any, formData: FormData) {
  const symptoms = formData.get('symptoms') as string;
  return analyzeHealthTopic(symptoms);
}

export async function fetchHealthStatistics(): Promise<GetHealthStatisticsOutput> {
    try {
        return await getHealthStatistics();
    } catch (error) {
        console.error('Error fetching health statistics:', error);
        return {
            topDiseases: ['Error fetching data'],
            maternalHealth: ['Error fetching data'],
            childHealth: ['Error fetching data'],
        };
    }
}
