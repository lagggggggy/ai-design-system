import React from 'react';

export const AlertPreview: React.FC = () => {
  
  // Base styles to simulate component appearance if native elements are not yet registered
  const getAlertStyle = (variant: string): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: 'calc(var(--ds-geometry-spacing-base) * 3)',
      borderRadius: 'var(--ds-geometry-radius-md)',
      border: '1px solid transparent',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--ds-geometry-spacing-base)',
      fontFamily: 'var(--ds-typography-family-base)',
      width: '100%',
    };

    if (variant === 'info') {
      return { ...base, backgroundColor: 'color-mix(in srgb, var(--ds-color-info) 10%, var(--ds-color-surface))', borderColor: 'color-mix(in srgb, var(--ds-color-info) 30%, transparent)', color: 'var(--ds-color-text)' };
    }
    if (variant === 'success') {
      return { ...base, backgroundColor: 'color-mix(in srgb, var(--ds-color-success) 10%, var(--ds-color-surface))', borderColor: 'color-mix(in srgb, var(--ds-color-success) 30%, transparent)', color: 'var(--ds-color-text)' };
    }
    if (variant === 'warning') {
      return { ...base, backgroundColor: 'color-mix(in srgb, var(--ds-color-warning) 10%, var(--ds-color-surface))', borderColor: 'color-mix(in srgb, var(--ds-color-warning) 30%, transparent)', color: 'var(--ds-color-text)' };
    }
    if (variant === 'error') {
      return { ...base, backgroundColor: 'color-mix(in srgb, var(--ds-color-error) 10%, var(--ds-color-surface))', borderColor: 'color-mix(in srgb, var(--ds-color-error) 30%, transparent)', color: 'var(--ds-color-text)' };
    }
    return base;
  };

  const getTitleStyle = (variant: string): React.CSSProperties => {
    const base: React.CSSProperties = { fontWeight: 'var(--ds-typography-weight-bold)', fontSize: 'var(--ds-typography-size-md)', lineHeight: 1.4 };
    if (variant === 'info') return { ...base, color: 'var(--ds-color-info)' };
    if (variant === 'success') return { ...base, color: 'var(--ds-color-success)' };
    if (variant === 'warning') return { ...base, color: 'var(--ds-color-warning)' };
    if (variant === 'error') return { ...base, color: 'var(--ds-color-error)' };
    return base;
  };

  const contentStyle: React.CSSProperties = { fontSize: 'var(--ds-typography-size-sm)', lineHeight: 1.5 };

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      
      {/* Info */}
      <div style={getAlertStyle('info')}>
        <div style={getTitleStyle('info')}>Update Available</div>
        <div style={contentStyle}>A new software version is available for download.</div>
      </div>

      {/* Success */}
      <div style={getAlertStyle('success')}>
        <div style={getTitleStyle('success')}>Payment Successful</div>
        <div style={contentStyle}>Your transaction has been processed successfully.</div>
      </div>

      {/* Warning */}
      <div style={getAlertStyle('warning')}>
        <div style={getTitleStyle('warning')}>Storage Low</div>
        <div style={contentStyle}>You are running out of storage space on your drive.</div>
      </div>

      {/* Error */}
      <div style={getAlertStyle('error')}>
        <div style={getTitleStyle('error')}>Connection Failed</div>
        <div style={contentStyle}>Unable to connect to the server. Please check your internet connection.</div>
      </div>

    </div>
  );
};