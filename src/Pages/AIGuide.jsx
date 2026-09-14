import React, { useEffect, useState } from 'react';
import '../Pages/aifrontend.html';

function AIGuide() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="/src/Pages/aifrontend.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '0',
        }}
        title="Heritage AI Guide"
      />
    </div>
  );
}

export default AIGuide;
