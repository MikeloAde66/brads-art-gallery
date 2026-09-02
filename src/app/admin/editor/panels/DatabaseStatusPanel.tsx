'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { DatabaseStatus } from '../actions';

interface DatabaseStatusPanelProps {
  checkStatus: () => Promise<DatabaseStatus>;
}

export default function DatabaseStatusPanel({ checkStatus }: DatabaseStatusPanelProps) {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheck = async () => {
    setIsChecking(true);
    setStatus(await checkStatus());
    setIsChecking(false);
  };

  return (
    <div className="space-y-3 border-b border-neutral-800 p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg text-neutral-100">Database</h3>
        <button
          type="button"
          onClick={handleCheck}
          disabled={isChecking}
          className="flex items-center gap-1 text-xs uppercase tracking-wide text-neutral-400 hover:text-neutral-200 disabled:opacity-40"
        >
          <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
          Check Connection
        </button>
      </div>

      <p className="text-[11px] text-neutral-600">
        Read-only status. Schema changes are made directly in Supabase, not from here.
      </p>

      {status && (
        <div className="rounded-lg border border-neutral-800 p-3 text-xs">
          <p className={status.connected ? 'text-emerald-400' : 'text-red-400'}>
            {status.connected ? 'Connected' : status.configured ? 'Not connected' : 'Not configured'}
          </p>
          {status.lastUpdated && (
            <p className="mt-1 text-neutral-500">Last published: {new Date(status.lastUpdated).toLocaleString()}</p>
          )}
          {status.error && <p className="mt-1 text-neutral-500">{status.error}</p>}
        </div>
      )}
    </div>
  );
}
