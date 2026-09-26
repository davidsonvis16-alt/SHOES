import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

/**
 * Real-photo slot. Shows the image when the file exists in /public,
 * otherwise a clean placeholder that names the file to add.
 */
export default function Img({ src, alt, className = '', fit = 'contain', eager = false, hint }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!src || broken) {
    return (
      <div className={`img-ph ${className}`} role="img" aria-label={alt}>
        <Icon name="camera" size={22} stroke={1.5} />
        <span>{hint || 'Add photo'}</span>
        <code>{src ? src.replace(/^\//, 'public/') : ''}</code>
      </div>
    );
  }
  return (
    <img
      className={`img ${className}`}
      src={src}
      alt={alt}
      style={{ objectFit: fit }}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

/** Real brand logo slot — falls back to the brand name in text. */
export function Logo({ src, name, className = '' }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <span className={`logo-fallback ${className}`}>{name}</span>;
  return <img className={`logo-img ${className}`} src={src} alt={name} onError={() => setBroken(true)} />;
}
