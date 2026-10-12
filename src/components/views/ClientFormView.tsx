import React, { useState } from 'react';
import { User, Calendar, Clock, MapPin, Heart, Phone, Mail, FileText, ArrowRight, ShieldCheck, AlertCircle, Search, Loader2, CheckCircle2 } from 'lucide-react';
import { resolveCityCoordinates, resolveOnlineCityCoordinates, ResolvedLocation } from '../../data/geoTimezoneData';
import { ClientData } from '../../types';

interface ClientFormViewProps {
  initialData?: ClientData | null;
  onSaveClient: (client: ClientData) => void;
  onNext: () => void;
}

export const ClientFormView: React.FC<ClientFormViewProps> = ({
  initialData,
  onSaveClient,
  onNext
}) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || '1995-06-15');
  const [birthTime, setBirthTime] = useState(initialData?.birthTime || '14:30');
  const [isBirthTimeUnknown, setIsBirthTimeUnknown] = useState<boolean>(initialData?.isBirthTimeUnknown || false);
  const [birthPlace, setBirthPlace] = useState(initialData?.birthPlace || 'İstanbul');
  const [motherName, setMotherName] = useState(initialData?.motherName || '');
  const preferredAstrologySystem = 'Tropikal Zodyak (Tropical)' as const;
  const [preferredHouseSystem, setPreferredHouseSystem] = useState<'Placidus' | 'Whole Sign' | 'Equal'>(
    initialData?.preferredHouseSystem || 'Placidus'
  );
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [resolvedLocation, setResolvedLocation] = useState<ResolvedLocation | null>(initialData?.resolvedLocation || null);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [locationFeedback, setLocationFeedback] = useState<{ type: 'success' | 'warning' | 'error' | 'idle'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSearchLocation = async (placeToSearch: string) => {
    if (!placeToSearch.trim()) {
      setResolvedLocation(null);
      setLocationFeedback({ type: 'warning', message: 'Lütfen bir şehir veya yerleşim yeri adı giriniz.' });
      return;
    }

    setIsSearchingLocation(true);
    setLocationFeedback({ type: 'idle', message: 'Konum ve saat dilimi taranıyor...' });

    try {
      // 1. Önce yerel yüksek doğruluklu veritabanında kontrol et
      const localRes = resolveCityCoordinates(placeToSearch);
      if (!localRes.isAmbiguous && localRes.confidence !== 'default_fallback') {
        setResolvedLocation(localRes);
        setLocationFeedback({
          type: 'success',
          message: `✓ Doğrulandı: ${localRes.cityName} (${localRes.latitude.toFixed(2)}°K, ${localRes.longitude.toFixed(2)}°D, ${localRes.timeZone})`
        });
        setIsSearchingLocation(false);
        return;
      }

      // 2. Yerelde bulunamazsa çevrim içi OpenStreetMap Nominatim servisini sorgula
      const onlineRes = await resolveOnlineCityCoordinates(placeToSearch, 3500);
      setResolvedLocation(onlineRes);
      if (!onlineRes.isAmbiguous && onlineRes.confidence !== 'default_fallback') {
        setLocationFeedback({
          type: 'success',
          message: `✓ Harici Ağ Üzerinden Doğrulandı: ${onlineRes.cityName} (${onlineRes.timeZone})`
        });
      } else {
        setLocationFeedback({
          type: 'warning',
          message: `⚠ Konum doğrulanamadı. Sahte koordinat atanmadı; kesin Yükselen Burç ve evler belirsiz olarak sunulacaktır.`
        });
      }
    } catch {
      const fallback = resolveCityCoordinates(placeToSearch);
      setResolvedLocation(fallback);
      setLocationFeedback({
        type: 'error',
        message: 'Ağ bağlantısı sağlanamadı. Güvenli çevrim dışı mod devrede; bilinmeyen konum için sahte değer uydurulmadı.'
      });
    } finally {
      setIsSearchingLocation(false);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!firstName.trim()) errs.firstName = 'Ad alanı zorunludur.';
    if (!lastName.trim()) errs.lastName = 'Soyad alanı zorunludur.';

    if (!birthDate) {
      errs.birthDate = 'Doğum tarihi zorunludur.';
    } else {
      const d = new Date(birthDate);
      if (isNaN(d.getTime())) errs.birthDate = 'Geçerli bir tarih giriniz.';
    }

    if (!isBirthTimeUnknown && birthTime && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(birthTime)) {
      errs.birthTime = 'Saat formatı SS:DD (örn: 14:30) olmalıdır.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Geçerli bir e-posta adresi giriniz.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const client: ClientData = {
      id: initialData?.id || `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate,
      birthTime: isBirthTimeUnknown ? '12:00' : birthTime,
      isBirthTimeUnknown,
      birthPlace: birthPlace.trim(),
      motherName: motherName.trim(),
      preferredAstrologySystem,
      preferredHouseSystem,
      resolvedLocation: resolvedLocation || resolveCityCoordinates(birthPlace),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveClient(client);
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-1">Danışan Bilgileri & Kayıt</h2>
        <p className="text-xs text-slate-400">
          Analiz motorlarının (Numeroloji, Astroloji, Ebced) deterministik hesaplamaları için danışan verilerini eksiksiz girin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        {/* Ad & Soyad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Danışan Adı *</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Örn: Ayşe"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Türkiye (81 il & ilçeler) ve dünya metropolleri desteklenir. Adaş şehirlerde ülke/bölge belirtiniz (Örn: Paris, Texas veya London, Ontario).
            </span>
            {errors.firstName && <p className="text-[11px] text-rose-400 mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Danışan Soyadı *</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Örn: Yılmaz"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
            />
            {errors.lastName && <p className="text-[11px] text-rose-400 mt-1">{errors.lastName}</p>}
          </div>
        </div>

        {/* Doğum Tarihi & Saati & Yeri */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Doğum Tarihi *</span>
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
            />
            {errors.birthDate && <p className="text-[11px] text-rose-400 mt-1">{errors.birthDate}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Doğum Saati (Yükselen için)</span>
              </label>
              <label className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-amber-300 cursor-pointer select-none transition-colors">
                <input
                  type="checkbox"
                  checked={isBirthTimeUnknown}
                  onChange={e => {
                    const checked = e.target.checked;
                    setIsBirthTimeUnknown(checked);
                    if (checked) {
                      setBirthTime('12:00');
                    } else if (birthTime === '12:00') {
                      setBirthTime('14:30');
                    }
                  }}
                  className="w-3.5 h-3.5 rounded border-slate-700 text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-950 bg-slate-900 cursor-pointer"
                />
                <span>Doğum saatimi bilmiyorum</span>
              </label>
            </div>
            <input
              type="time"
              value={isBirthTimeUnknown ? '12:00' : birthTime}
              disabled={isBirthTimeUnknown}
              onChange={e => setBirthTime(e.target.value)}
              className={`w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-slate-100 text-xs transition-colors ${
                isBirthTimeUnknown
                  ? 'opacity-60 cursor-not-allowed bg-slate-950 text-slate-400 border-dashed border-amber-900/40'
                  : 'focus:border-amber-500 focus:outline-none'
              }`}
            />
            {isBirthTimeUnknown ? (
              <p className="text-[11px] text-amber-400/90 mt-1 flex items-center gap-1">
                <span>ℹ Doğum saati bilinmediği için varsayılan 12.00 (öğlen) referans alınacaktır. Yükselen burç ve evler kesin sunulmayacak; gezegen konumları bundan etkilenmeyecektir.</span>
              </p>
            ) : errors.birthTime ? (
              <p className="text-[11px] text-rose-400 mt-1">{errors.birthTime}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Doğum Yeri / Şehir</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={birthPlace}
                onChange={e => {
                  setBirthPlace(e.target.value);
                  if (resolvedLocation) setResolvedLocation(null);
                  if (locationFeedback.type !== 'idle') setLocationFeedback({ type: 'idle', message: '' });
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchLocation(birthPlace);
                  }
                }}
                placeholder="Örn: İzmir, Türkiye veya London, UK, New York, Reykjavik..."
                className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
              />
              <button
                type="button"
                onClick={() => handleSearchLocation(birthPlace)}
                disabled={isSearchingLocation}
                className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                title="Konumu ve Tarihsel Saat Dilimini Doğrula"
              >
                {isSearchingLocation ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Aranıyor...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>Doğrula</span>
                  </>
                )}
              </button>
            </div>
            {locationFeedback.message && (
              <div className={`mt-1.5 p-2 rounded text-[11px] flex items-start gap-1.5 ${
                locationFeedback.type === 'success'
                  ? 'bg-emerald-950/40 border border-emerald-900/60 text-emerald-300'
                  : locationFeedback.type === 'warning'
                  ? 'bg-amber-950/40 border border-amber-900/60 text-amber-300'
                  : locationFeedback.type === 'error'
                  ? 'bg-rose-950/40 border border-rose-900/60 text-rose-300'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}>
                {locationFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <span>{locationFeedback.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Astroloji Sistemi & Ev Sistemi Tercihi */}
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Astroloji Hesaplama Sistemi & Ev Modeli</span>
            <span className="text-[11px] text-amber-400">Batı Tropikal Zodyak (0° Koç Ekinoksu)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Zodyak Sistemi</label>
              <div className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded text-slate-200 text-xs flex items-center justify-between">
                <span>Batı Astrolojisi (Tropikal Zodyak)</span>
                <span className="text-[10px] text-amber-400/80 font-mono">0° Koç</span>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Ev Sistemi</label>
              <select
                value={preferredHouseSystem}
                onChange={e => setPreferredHouseSystem(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
              >
                <option value="Placidus">Placidus (Yarı Yay Eşitsiz Evler - Standart)</option>
                <option value="Whole Sign">Whole Sign (Tüm Burç Evleri)</option>
                <option value="Equal">Eşit Ev (Equal Houses - 30° Eşit)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Anne Adı (Gizlilik & Ebced) */}
        <div className="p-4 bg-slate-900/70 border border-amber-950/40 rounded-lg space-y-2">
          <label className="block text-xs font-medium text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Anne Adı (Ebced / Mizan Denge Hesabı İçin)</span>
            </span>
            <span className="text-[11px] text-amber-400 font-normal flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Gizlilik Korumalı</span>
            </span>
          </label>
          <input
            type="text"
            value={motherName}
            onChange={e => setMotherName(e.target.value)}
            placeholder="Örn: Fatma (İsteğe bağlı)"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
          />
          <p className="text-[11px] text-slate-400 leading-relaxed">
            * <strong>Kesin Gizlilik Kuralı:</strong> Anne adı yalnızca geleneksel Ebced element dengesini hesaplamak için matematiksel bir girdi olarak kullanılır. Dövme tasarımında, görsel sembollerde veya üretim promptlarında <u>asla</u> yer almaz.
          </p>
        </div>

        {/* İletişim Bilgileri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>Telefon Numarası</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Örn: 0532 000 00 00"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>E-posta Adresi</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Örn: ayse@ornek.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
            />
            {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Danışan Notları */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Danışan Notları & Tasarım Tercihleri</span>
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Danışanın daha önceki dövmeleri, alerjileri, sevdiği temalar veya özel hikayesi..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800/80">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
          >
            <span>Kaydet & Testlere Geç</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
