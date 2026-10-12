/**
 * Admin Security & Authentication Service
 * Manages studio manager login session, password validation, and secure recovery.
 */

const SESSION_KEY = 'TATTOO_ASSISTANT_ADMIN_AUTH';
const PASS_HASH_KEY = 'TATTOO_STUDIO_ADMIN_PASS';
const DEFAULT_PASS = 'studio2026';
const RECOVERY_KEY = 'ARTIST-RECOVERY-KEY-99';

export function isStudioAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function loginStudioAdmin(password: string): { success: boolean; error?: string } {
  const currentPass = localStorage.getItem(PASS_HASH_KEY) || DEFAULT_PASS;
  if (password === currentPass) {
    sessionStorage.setItem(SESSION_KEY, 'authenticated');
    return { success: true };
  }
  return { success: false, error: 'Hatalı yönetici şifresi. Lütfen tekrar deneyin.' };
}

export function logoutStudioAdmin(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (err) {
    console.error('Logout error:', err);
  }
}

export function resetAdminPassword(recoveryToken: string, newPassword: string): { success: boolean; error?: string } {
  if (recoveryToken.trim() !== RECOVERY_KEY) {
    return { success: false, error: 'Kurtarma anahtarı geçersiz.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Yeni şifre en az 6 karakter olmalıdır.' };
  }
  localStorage.setItem(PASS_HASH_KEY, newPassword);
  sessionStorage.setItem(SESSION_KEY, 'authenticated');
  return { success: true };
}
