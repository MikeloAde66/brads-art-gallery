'use client';

import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react';
import type { NavItem } from '@/lib/siteConfig';

interface NavPanelProps {
  value: NavItem[];
  onChange: (value: NavItem[]) => void;
}

const inputClasses =
  'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-neutral-600';
const labelClasses = 'text-[11px] uppercase tracking-widest text-neutral-500';

export default function NavPanel({ value, onChange }: NavPanelProps) {
  const updateItem = (index: number, patch: Partial<NavItem>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addItem = () => {
    onChange([...value, { label: 'New Item', href: '/', description: '' }]);
  };

  return (
    <div className="space-y-4 p-6">
      <h3 className="font-serif text-lg text-neutral-100">Products Menu</h3>

      <div className="space-y-4">
        {value.map((item, index) => (
          <div key={index} className="space-y-2 rounded-lg border border-neutral-800 p-3">
            <div className="flex items-center justify-between">
              <span className={labelClasses}>Item {index + 1}</span>
              <div className="flex items-center gap-2 text-neutral-500">
                <button type="button" onClick={() => moveItem(index, -1)} aria-label="Move up">
                  <ArrowUp className="h-3.5 w-3.5 hover:text-neutral-200" />
                </button>
                <button type="button" onClick={() => moveItem(index, 1)} aria-label="Move down">
                  <ArrowDown className="h-3.5 w-3.5 hover:text-neutral-200" />
                </button>
                <button type="button" onClick={() => removeItem(index)} aria-label="Remove">
                  <Trash2 className="h-3.5 w-3.5 hover:text-red-400" />
                </button>
              </div>
            </div>
            <input
              type="text"
              value={item.label}
              onChange={(e) => updateItem(index, { label: e.target.value })}
              placeholder="Label"
              className={inputClasses}
            />
            <input
              type="text"
              value={item.href}
              onChange={(e) => updateItem(index, { href: e.target.value })}
              placeholder="/href"
              className={inputClasses}
            />
            <input
              type="text"
              value={item.description}
              onChange={(e) => updateItem(index, { description: e.target.value })}
              placeholder="Description"
              className={inputClasses}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="w-full rounded-lg border border-dashed border-neutral-700 py-2 text-xs uppercase tracking-wide text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
      >
        Add Item
      </button>
    </div>
  );
}
