import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import App from './App'; // импорт компонента после добавления index файла
import "@styles/styles.scss"

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDom.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
