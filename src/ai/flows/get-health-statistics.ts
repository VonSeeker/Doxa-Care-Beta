'use server';
/**
 * @fileOverview A flow to get up-to-date health statistics for Sierra Leone.
 *
 * - getHealthStatistics - A function that returns current health stats.
 * - GetHealthStatisticsOutput - The return type for the getHealthStatistics function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetHealthStatisticsOutputSchema = z.object({
  topDiseases: z.array(z.string()).describe('A list of the top 5 most prevalent diseases in Sierra Leone, ordered by prevalence.'),
  maternalHealth: z.array(z.string()).describe('A list of 3 key maternal health statistics for Sierra Leone.'),
  childHealth: z.array(z.string()).describe('A list of 3 key child health statistics for Sierra Leone.'),
});
export type GetHealthStatisticsOutput = z.infer<typeof GetHealthStatisticsOutputSchema>;

export async function getHealthStatistics(): Promise<GetHealthStatisticsOutput> {
  return getHealthStatisticsFlow();
}

const getHealthStatisticsPrompt = ai.definePrompt({
  name: 'getHealthStatisticsPrompt',
  output: { schema: GetHealthStatisticsOutputSchema },
  prompt: `You are a public health data analyst. Provide the latest available health statistics for Sierra Leone.
  Provide the top 5 diseases, 3 maternal health stats, and 3 child health stats.
  Ensure the data is as recent as possible.`,
});

const getHealthStatisticsFlow = ai.defineFlow(
  {
    name: 'getHealthStatisticsFlow',
    outputSchema: GetHealthStatisticsOutputSchema,
  },
  async () => {
    const { output } = await getHealthStatisticsPrompt();
    return output!;
  }
);
