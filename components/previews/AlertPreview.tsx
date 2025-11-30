
import React from 'react';

export const AlertPreview: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      
      {/* Info */}
      <ds-alert variant="info">
        <strong>Update Available</strong>
        <div>A new software version is available for download.</div>
      </ds-alert>

      {/* Success */}
      <ds-alert variant="success">
        <strong>Payment Successful</strong>
        <div>Your transaction has been processed successfully.</div>
      </ds-alert>

      {/* Warning */}
      <ds-alert variant="warning">
        <strong>Storage Low</strong>
        <div>You are running out of storage space on your drive.</div>
      </ds-alert>

      {/* Error */}
      <ds-alert variant="error">
        <strong>Connection Failed</strong>
        <div>Unable to connect to the server. Please check your internet connection.</div>
      </ds-alert>

    </div>
  );
};
