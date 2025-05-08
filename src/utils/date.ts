// utils/dateUtils.ts
import { differenceInSeconds, parseISO } from "date-fns";

// Data alvo configurável - 26 de maio de 2026
export const TARGET_DATE: string = "2026-05-26T00:00:00.000Z"; // Formato UTC ISO

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
  // Garantir que estamos trabalhando com datas UTC
  const start: Date = parseISO(startDate);
  const target: Date = parseISO(targetDate);
  const now: Date = new Date();

  // Converter para UTC
  const nowUTC: Date = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );

  // Calcular segundos totais entre início e alvo
  const totalSeconds: number = differenceInSeconds(target, start);

  // Calcular segundos passados até agora
  const elapsedSeconds: number = differenceInSeconds(nowUTC, start);

  // Calcular porcentagem (limitada entre 0 e 100)
  const percentage: number = Math.max(
    0,
    Math.min(100, (elapsedSeconds / totalSeconds) * 100)
  );

  return percentage;
}
