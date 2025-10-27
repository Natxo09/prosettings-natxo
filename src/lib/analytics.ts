// Type definitions for Rybbit analytics
declare global {
  interface Window {
    rybbit?: {
      event: (eventName: string, properties?: Record<string, string | number>) => void;
      pageview: () => void;
      identify: (userId: string) => void;
      clearUserId: () => void;
      getUserId: () => string | null;
    };
  }
}

/**
 * Track a custom event with optional properties
 * @param eventName - Name of the event (max 255 characters)
 * @param properties - Optional properties object with string/number values (max 2KB)
 *
 * @example
 * trackEvent("Crosshair Copied");
 * trackEvent("Button Clicked", { button: "copy", section: "crosshair" });
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number>
): void {
  if (typeof window === 'undefined' || !window.rybbit) {
    // Silently fail in SSR or if Rybbit is not loaded
    return;
  }

  try {
    window.rybbit.event(eventName, properties);
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Manually trigger a pageview (useful when data-track-spa is disabled)
 */
export function trackPageview(): void {
  if (typeof window === 'undefined' || !window.rybbit) {
    return;
  }

  try {
    window.rybbit.pageview();
  } catch (error) {
    console.error('Failed to track pageview:', error);
  }
}

/**
 * Associate events with a specific user
 * @param userId - Unique user identifier
 */
export function identifyUser(userId: string): void {
  if (typeof window === 'undefined' || !window.rybbit) {
    return;
  }

  try {
    window.rybbit.identify(userId);
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
}

/**
 * Clear the stored user ID (call on logout)
 */
export function clearUser(): void {
  if (typeof window === 'undefined' || !window.rybbit) {
    return;
  }

  try {
    window.rybbit.clearUserId();
  } catch (error) {
    console.error('Failed to clear user:', error);
  }
}

/**
 * Get the current user ID
 * @returns The user ID or null if not set
 */
export function getUserId(): string | null {
  if (typeof window === 'undefined' || !window.rybbit) {
    return null;
  }

  try {
    return window.rybbit.getUserId();
  } catch (error) {
    console.error('Failed to get user ID:', error);
    return null;
  }
}
