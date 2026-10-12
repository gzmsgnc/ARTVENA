/**
 * Storage & Archive Service
 * Safe persistence using schemaVersion: 1.
 * Supports multi-version designs, JSON export/import, and robust search.
 */

import { CompleteClientRecord, SymbolItem } from '../types';

const STORAGE_KEY = 'TATTOO_ASSISTANT_CLIENTS_V2';
const CUSTOM_SYMBOLS_KEY = 'TATTOO_ASSISTANT_CUSTOM_SYMBOLS';

export function getAllClients(): CompleteClientRecord[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(item => item && item.client && item.client.id);
    }
    return [];
  } catch (err) {
    console.error('Error reading clients from storage:', err);
    return [];
  }
}

export function saveClientRecord(record: CompleteClientRecord): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const clients = getAllClients();
    const existingIndex = clients.findIndex(c => c.client.id === record.client.id);

    record.updatedAt = new Date().toISOString();

    if (existingIndex >= 0) {
      clients[existingIndex] = record;
    } else {
      clients.unshift(record);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (err) {
    console.error('Error saving client record:', err);
  }
}

export function getClientById(id: string): CompleteClientRecord | null {
  const clients = getAllClients();
  return clients.find(c => c.client.id === id) || null;
}

export function deleteClientRecord(id: string): boolean {
  try {
    const clients = getAllClients().filter(c => c.client.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
    return true;
  } catch (err) {
    console.error('Error deleting client record:', err);
    return false;
  }
}

export function exportClientToJson(record: CompleteClientRecord): string {
  return JSON.stringify(record, null, 2);
}

export function importClientFromJson(jsonString: string): { success: boolean; record?: CompleteClientRecord; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || !parsed.client || !parsed.client.firstName || !parsed.client.id) {
      return { success: false, error: 'Geçersiz danışan JSON dosyası. Zorunlu alanlar bulunamadı.' };
    }

    // Ensure schema version
    parsed.schemaVersion = 1;
    saveClientRecord(parsed);

    return { success: true, record: parsed };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'JSON ayrıştırma hatası';
    return { success: false, error: `JSON dosyası okunamadı: ${message}` };
  }
}

export function getCustomSymbols(): SymbolItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SYMBOLS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomSymbol(sym: SymbolItem): void {
  try {
    const list = getCustomSymbols();
    const idx = list.findIndex(s => s.id === sym.id);
    if (idx >= 0) {
      list[idx] = sym;
    } else {
      list.push(sym);
    }
    localStorage.setItem(CUSTOM_SYMBOLS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error saving custom symbol:', err);
  }
}

export function deleteCustomSymbol(id: string): void {
  try {
    const list = getCustomSymbols().filter(s => s.id !== id);
    localStorage.setItem(CUSTOM_SYMBOLS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Error deleting custom symbol:', err);
  }
}
