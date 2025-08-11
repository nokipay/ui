// Export centralisé de tous les assets
export * from './images';
export * from './styles';

// Fonction d'initialisation des assets
export function initializeAssets(): void {
  // Injecter les variables CSS au chargement
  if (typeof document !== 'undefined') {
    import('./styles').then(({ injectCSSVariables }) => {
      injectCSSVariables();
    });
  }
}