// Cores da nota: verde a partir de 75, dourado a partir de 60, vermelho abaixo
export function scoreClass(score: number) {
  if (score >= 75) return 'bg-success-bg text-success-ink';
  if (score >= 60) return 'bg-cream text-gold-dark';
  return 'bg-danger-bg text-danger-ink';
}
