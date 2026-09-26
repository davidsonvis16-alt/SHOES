import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct } from '../data/products.js';

const BagContext = createContext(null);
const KEY = 'maison-kiatu-bag-v1';
const SAVED_KEY = 'maison-kiatu-saved-v1';

function load(key) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function save(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — bag still works for this visit */
  }
}

export function BagProvider({ children }) {
  const [ids, setIds] = useState(() => load(KEY).filter((id) => getProduct(id) && !getProduct(id).sold));
  const [saved, setSaved] = useState(() => load(SAVED_KEY).filter((id) => getProduct(id)));
  const [toast, setToast] = useState(null);

  useEffect(() => save(KEY, ids), [ids]);
  useEffect(() => save(SAVED_KEY, saved), [saved]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const value = useMemo(() => {
    const items = ids.map(getProduct).filter(Boolean);
    return {
      items,
      count: items.length,
      subtotal: items.reduce((sum, p) => sum + p.price, 0),
      inBag: (id) => ids.includes(id),
      add: (id) => {
        const p = getProduct(id);
        if (!p || p.sold) return;
        setIds((cur) => (cur.includes(id) ? cur : [...cur, id]));
        setToast(`${p.name} added to your bag`);
      },
      remove: (id) => setIds((cur) => cur.filter((x) => x !== id)),
      clear: () => setIds([]),
      isSaved: (id) => saved.includes(id),
      toggleSaved: (id) =>
        setSaved((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
      toast,
    };
  }, [ids, saved, toast]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside <BagProvider>');
  return ctx;
}
