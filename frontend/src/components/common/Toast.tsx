import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-[min(380px,calc(100vw-32px))] flex-col gap-3" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 rounded-[var(--sb-radius-lg)] border bg-white p-4 text-sm font-medium shadow-[var(--sb-shadow-card)] ${
              toast.type === 'success'
                ? 'border-[rgba(47,117,104,.25)] text-[var(--sb-success)]'
                : toast.type === 'error'
                ? 'border-[rgba(166,74,74,.25)] text-[var(--sb-danger)]'
                : 'border-[rgba(33,95,125,.25)] text-[var(--sb-accent)]'
            }`}
          >
            <div className="flex items-start gap-3">
              {toast.type === 'success' && <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
              {toast.type === 'error' && <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
              {toast.type === 'info' && <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />}
              <span className="leading-5">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Đóng thông báo"
              className="shrink-0 text-[var(--sb-ink-3)] hover:text-[var(--sb-ink)]"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
