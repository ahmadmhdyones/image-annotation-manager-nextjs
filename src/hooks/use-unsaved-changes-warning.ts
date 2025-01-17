import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export default function useUnsavedChangesWarning(
  defaultEnabled = true,
  message = 'null',
  handleTabClosing = async () => {}
) {
  if (message === 'null') {
    message = 'You have unsaved changes. Are you sure you want to leave?';
  }

  const router = useRouter();
  const [msg, setMsg] = useState<string>(message);
  const [enabled, setEnabled] = useState<boolean>(defaultEnabled);

  useEffect(() => {
    // Handle browser/tab closing
    function beforeunloadListener(e: BeforeUnloadEvent) {
      if (enabled) {
        e.preventDefault();
        e.returnValue = msg;
      }
      return msg;
    }

    // Handle Next.js route changes
    function handleRouteChangeStart(url: string) {
      if (enabled && !window.confirm(msg)) {
        // Prevent navigation by doing nothing
        throw 'Route change aborted';
      }
    }

    window.addEventListener('beforeunload', beforeunloadListener);
    window.addEventListener('unload', handleTabClosing);

    // Use the new navigation intercepting API
    if (enabled) {
      router.beforePopState(() => {
        return window.confirm(msg);
      });
    }

    return () => {
      window.removeEventListener('beforeunload', beforeunloadListener);
      window.removeEventListener('unload', handleTabClosing);
      router.beforePopState(() => true);
    };
  }, [msg, enabled, handleTabClosing, router]);

  return {
    disable(): void {
      setEnabled(false);
    },
    enable(): void {
      setEnabled(true);
    },
    getEnabled(): boolean {
      return enabled;
    },
    getMessage(): string {
      return msg;
    },
    setEnabled(status: boolean): void {
      setEnabled(status);
    },
    setMessage(newMessage: string): void {
      setMsg(newMessage);
    },
  };
}

// ----------------------------------------------------------------------
