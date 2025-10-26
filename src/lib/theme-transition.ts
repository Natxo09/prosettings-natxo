/**
 * Executes a theme change with a smooth transition animation
 * Uses View Transitions API when available, falls back to instant change
 */
export async function transitionTheme(updateTheme: () => void) {
  // Check if View Transitions API is supported
  if (!document.startViewTransition) {
    updateTheme();
    return;
  }

  // Start the view transition
  await document.startViewTransition(() => {
    updateTheme();
  }).ready;
}
