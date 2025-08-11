import { config } from 'dotenv';
config();

import '@/ai/flows/symptom-check.ts';
import '@/ai/flows/health-query.ts';
import '@/ai/flows/get-health-statistics.ts';
