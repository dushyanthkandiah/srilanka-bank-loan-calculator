'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  pId: string;
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdUnit = ({ pId, slotId, format = 'auto', responsive = true, style }: AdUnitProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error', e);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', ...style }}>
        Ad Unit Placeholder ({slotId})
      </div>
    );
  }

  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={pId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdUnit;
