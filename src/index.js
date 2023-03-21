import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './jsx/App.jsx';

const container = document.getElementById('app-root-2023-global_trade_trends');
const root = createRoot(container);
root.render(<App />);