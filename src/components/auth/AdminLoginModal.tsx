import React, { useState } from 'react';
import { Lock, Key, X, Check, AlertCircle, LogOut } from 'lucide-react';
import { loginStudioAdmin, logoutStudioAdmin, resetAdminPassword } from '../../services/authService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onAuthStateChange: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onAuthStateChange
}) => {
  const [password, setPassword] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryToken, setRecoveryToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = loginStudioAdmin(password);
    if (res.success) {
      setPassword('');
      onAuthStateChange();
      onClose();
    } else {
      setError(res.error || 'Giriş başarısız.');
    }
  };

  const handleLogout = () => {
    logoutStudioAdmin();
    onAuthStateChange();
    onClose();
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = resetAdminPassword(recoveryToken, newPassword);
    if (res.success) {
      setSuccessMsg('Şifreniz başarıyla sıfırlandı ve oturum açıldı.');
      setRecoveryMode(false);
      setRecoveryToken('');
      setNewPassword('');
      onAuthStateChange();
      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
      }, 1500);
    } else {
      setError(res.error || 'Kurtarma başarısız.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="max-w-md w-full bg-[#12161c] border border-slate-800 rounded-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100">Stüdyo Yönetici Paneli</h3>
            <p className="text-xs text-slate-400">Sembol kütüphanesi ve sistem ayarları için yetkilendirme</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-950/40 border border-rose-900/60 rounded text-rose-300 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-2 p-3 bg-emerald-950/40 border border-emerald-900/60 rounded text-emerald-300 text-xs mb-4">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {isAdmin ? (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 leading-relaxed">
              Yönetici oturumunuz şu anda <strong className="text-emerald-400">aktif</strong>. Sembol ekleme/düzenleme ve tam arşivi yönetebilirsiniz.
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium bg-rose-600/80 hover:bg-rose-500 text-white rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Oturumu Kapat</span>
            </button>
          </div>
        ) : !recoveryMode ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Yönetici Şifresi</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifrenizi girin..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
                autoFocus
              />
              <span className="block text-[11px] text-slate-500 mt-1">Varsayılan stüdyo şifresi: studio2026</span>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
            >
              Giriş Yap
            </button>

            <div className="pt-2 border-t border-slate-800/80 text-center">
              <button
                type="button"
                onClick={() => { setRecoveryMode(true); setError(null); }}
                className="text-[11px] text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
              >
                <Key className="w-3 h-3" />
                <span>Şifremi unuttum / Kurtarma anahtarı ile sıfırla</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Stüdyo Kurtarma Anahtarı</label>
              <input
                type="text"
                value={recoveryToken}
                onChange={e => setRecoveryToken(e.target.value)}
                placeholder="Örn: ARTIST-RECOVERY-KEY-99"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Yeni Şifre</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="En az 6 karakter..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setRecoveryMode(false); setError(null); }}
                className="flex-1 py-2 px-3 border border-slate-800 hover:bg-slate-900 text-slate-300 text-xs rounded transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
              >
                Şifreyi Güncelle
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
