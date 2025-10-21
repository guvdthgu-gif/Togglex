import React, { useCallback, useState, KeyboardEvent, ReactNode } from 'react';
import '../styles/toggle.css';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (val: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'auto';
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  id?: string;
  onIcon?: ReactNode;
  offIcon?: ReactNode;
}

const SIZE_DIMENSIONS: Record<'sm' | 'md' | 'lg', { w: number; h: number; knob: number }> = {
  sm: { w: 34, h: 18, knob: 14 },
  md: { w: 44, h: 24, knob: 20 },
  lg: { w: 56, h: 32, knob: 28 }
};

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  size = 'md',
  theme = 'auto',
  disabled = false,
  ariaLabel,
  className,
  id,
  onIcon,
  offIcon
}) => {
  const [inner, setInner] = useState(defaultChecked);
  const isControlled = typeof checked === 'boolean';
  const value = isControlled ? checked : inner;

  const commit = useCallback(
    (next: boolean) => {
      if (!isControlled) setInner(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    commit(!value);
  }, [disabled, value, commit]);

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle();
    }
  };

  const dims = SIZE_DIMENSIONS[size];

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={ariaLabel}
      disabled={disabled}
      data-size={size}
      data-theme={theme}
      data-state={value ? 'on' : 'off'}
      className={['tgl-root', className].filter(Boolean).join(' ')}
      onClick={toggle}
      onKeyDown={handleKey}
      style={
        {
          '--tgl-width': `${dims.w}px`,
          '--tgl-height': `${dims.h}px`,
          '--tgl-knob-size': `${dims.knob}px`
        } as React.CSSProperties
      }
    >
      <span className="tgl-track">
        <span className="tgl-knob">
          <span className="tgl-icon">
            {value ? onIcon : offIcon}
          </span>
        </span>
      </span>
    </button>
  );
};