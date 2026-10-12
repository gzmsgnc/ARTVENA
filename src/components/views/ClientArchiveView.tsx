import React, { useState } from 'react';
import { CompleteClientRecord } from '../../types';
import { Search, Download, Upload, Trash2, FolderOpen, User, Calendar, Compass, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { exportClientToJson, importClientFromJson } from '../../services/storageService';

interface ClientArchiveViewProps {
  clients: CompleteClientRecord[];
  onSelectClient: (client: CompleteClientRecord) => void;
  onDeleteClient: (id: string) => void;
  onClientImported: (client: CompleteClientRecord) => void;
}

export const ClientArchiveView: React.FC<ClientArchiveViewProps> = ({
  clients,
  onSelectClient,
  onDeleteClient,
  onClientImported
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const filteredClients = clients.filter(c => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const fullName = `${c.client.firstName} ${c.client.lastName}`.toLowerCase();
    const phone = (c.client.phone || '').toLowerCase();
    const email = (c.client.email || '').toLowerCase();
    const date = (c.client.birthDate || '').toLowerCase();
    return fullName.includes(q) || phone.includes(q) || email.includes(q) || date.includes(q);
  });

  const handleExport = (clientRecord: CompleteClientRecord) => {
    const jsonStr = exportClientToJson(clientRecord);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dovme_danisan_${clientRecord.client.firstName}_${clientRecord.client.lastName}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const res = importClientFromJson(content);
      if (res.success && res.record) {
        setImportStatus({ success: true, message: `${res.record.client.firstName} ${res.record.client.lastName} başarıyla içe aktarıldı.` });
        onClientImported(res.record);
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus({ success: false, message: res.error || 'İçe aktarma başarısız.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Danışan & Tasarım Arşivi</h2>
          <p className="text-xs text-slate-400">
            Kayıtlı danışan profilleri, analiz sonuçları, reçeteler ve prompt versiyonları
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900 rounded cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>JSON Danışan İçe Aktar</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className={`p-3 rounded text-xs flex items-center gap-2 ${
          importStatus.success
            ? 'bg-emerald-950/40 border border-emerald-900/60 text-emerald-300'
            : 'bg-rose-950/40 border border-rose-900/60 text-rose-300'
        }`}>
          {importStatus.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="İsim, telefon, e-posta veya kayıt tarihi ile ara..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
          />
        </div>
      </div>

      {/* Client List */}
      {filteredClients.length === 0 ? (
        <div className="p-12 text-center bg-[#12161c] border border-slate-800 rounded-lg text-slate-400 space-y-2">
          <User className="w-8 h-8 mx-auto text-slate-600 mb-2" />
          <p className="text-sm">Arşivde henüz danışan kaydı bulunmuyor.</p>
          <p className="text-xs text-slate-500">"Yeni Danışan" butonuna tıklayarak ilk analizi başlatabilirsiniz.</p>
        </div>
      ) : (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Danışan Adı</th>
                <th className="py-3 px-4">Totem & Yaşam Yolu</th>
                <th className="py-3 px-4">Enneagram</th>
                <th className="py-3 px-4">Tasarım Versiyonları</th>
                <th className="py-3 px-4">Kayıt Tarihi</th>
                <th className="py-3 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredClients.map(c => {
                const fullName = `${c.client.firstName} ${c.client.lastName}`;
                const versionCount = c.designVersions?.length || 1;
                const activeVer = c.designVersions?.find(v => v.id === c.activeVersionId) || c.designVersions?.[0];

                return (
                  <tr key={c.client.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-100">
                      <div>{fullName}</div>
                      <div className="text-[11px] text-slate-500">{c.client.email || c.client.phone || 'İletişim yok'}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>{c.totem?.result?.primaryTotem?.name || 'Hesaplanmadı'}</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Yaşam Yolu: {c.numerology?.lifePathNumber}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-slate-200">
                        {c.enneagram?.result?.wingName || `Tip ${c.enneagram?.result?.coreType}`}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-[11px] font-mono text-slate-400">
                        {versionCount} Versiyon ({activeVer?.canonicalDesign?.selectedStyle.replace('style_', '') || 'Varsayılan'})
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString('tr-TR')}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectClient(c)}
                          className="px-2.5 py-1 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded flex items-center gap-1 transition-colors"
                          title="Danışanı aç ve çalışma alanına yükle"
                        >
                          <FolderOpen className="w-3 h-3" />
                          <span>Aç</span>
                        </button>

                        <button
                          onClick={() => handleExport(c)}
                          className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          title="JSON formatında indir"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`${fullName} kaydını silmek istediğinize emin misiniz?`)) {
                              onDeleteClient(c.client.id);
                            }
                          }}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded hover:bg-slate-800"
                          title="Kaydı sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
