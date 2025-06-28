import React, { useState } from 'react';

const DEFAULT_URL = 'yahoo.com';

const InternetExplorer: React.FC = () => {
  const [address, setAddress] = useState<string>(DEFAULT_URL);

  // Only show the address bar and the image for now
  return (
    <div style={{ padding: '5px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          backgroundColor: 'var(--win95-window-bg)',
          padding: '5px',
          marginBottom: '5px',
          border: '1px solid var(--win95-border-inner-dark)',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <button className="win95-button" style={{ marginRight: 6 }} disabled title="Home">🏠</button>
        <span style={{ marginRight: '5px' }}>Address:</span>
        <input
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{
            flex: 1,
            backgroundColor: 'white',
            border: '1px solid var(--win95-border-outer-dark)',
            boxShadow: '1px 1px 0 0 var(--win95-border-inner-light) inset',
            padding: '2px 5px',
            fontFamily: 'inherit',
            fontSize: 14,
          }}
          spellCheck={false}
          disabled
        />
        <button className="win95-button" style={{ marginLeft: '5px' }} disabled title="Go">Go</button>
      </div>
      <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <img src="/yahoo.png" alt="Yahoo!" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>
    </div>
  );
};

export default InternetExplorer;