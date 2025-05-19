import {
  differenceInCalendarDays,
  differenceInSeconds,
  parseISO,
} from "date-fns";

export const START_DATE: string = "2025-02-05T00:00:00.000Z";
export const TARGET_DATE: string = "2026-05-26T00:00:00.000Z";

/**
 * Calcula a porcentagem de tempo passado desde o início até a data alvo
 * @param {string} startDate - Data de início em formato ISO (UTC)
 * @param {string} targetDate - Data alvo em formato ISO (UTC)
 * @returns {number} - Porcentagem de progresso (0-100)
 */
export function calculateTimePercentage(
  startDate: string,
  targetDate: string
): number {
  // Trabalhar com datas ISO em UTC
  const start: Date = parseISO(startDate);
  const target: Date = parseISO(targetDate);
  const now: Date = new Date();

  // Calcular segundos totais entre início e alvo
  const totalSeconds: number = differenceInSeconds(target, start);
  
  // Calcular segundos passados até agora
  const elapsedSeconds: number = differenceInSeconds(now, start);

  // Calcular porcentagem (limitada entre 0 e 100)
  const percentage: number = Math.max(
    0,
    Math.min(100, (elapsedSeconds / totalSeconds) * 100)
  );

  return percentage;
}

/**
 * Calcula os dias restantes até a data alvo a partir da data atual
 * @param {string} targetDate - Data alvo em formato ISO (UTC)
 * @returns {number} - Dias restantes (pode ser negativo se a data já passou)
 */
export function calculateRemainingDays(targetDate: string): number {
  const target: Date = parseISO(targetDate);
  const now: Date = new Date();
  
  return differenceInCalendarDays(target, now);
}

/**
 * Calcula o número total de dias entre a data de início e a data alvo
 * @param {string} startDate - Data de início em formato ISO (UTC)
 * @param {string} targetDate - Data alvo em formato ISO (UTC)
 * @returns {number} - Total de dias entre início e alvo
 */
export function calculateTotalDays(
  startDate: string,
  targetDate: string
): number {
  const start: Date = parseISO(startDate);
  const target: Date = parseISO(targetDate);
  
  return differenceInCalendarDays(target, start);
}

/**
 * Calcula os dias decorridos desde a data de início
 * @param {string} startDate - Data de início em formato ISO (UTC)
 * @returns {number} - Dias decorridos desde o início
 */
export function calculateElapsedDays(startDate: string): number {
  const start: Date = parseISO(startDate);
  const now: Date = new Date();
  
  return differenceInCalendarDays(now, start);
}

/**
 * Calcula informações completas sobre o progresso do tempo
 * @returns {Object} - Objeto com todas as informações de progresso
 */
export function getTimeProgress() {
  return {
    percentage: calculateTimePercentage(START_DATE, TARGET_DATE),
    totalDays: calculateTotalDays(START_DATE, TARGET_DATE),
    elapsedDays: calculateElapsedDays(START_DATE),
    remainingDays: calculateRemainingDays(TARGET_DATE),
    startDate: START_DATE,
    targetDate: TARGET_DATE
  };
}