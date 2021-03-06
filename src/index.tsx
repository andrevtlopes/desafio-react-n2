import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tabs, { MeasureTab } from './types/tabs';
import TabPanel from './components/TabPanel';
import NoMatch from './components/NoMatch';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/' element={<Navigate to='liter' replace />} />
                    {Object.entries(tabs).map(([key, value], idx) => (
                        <Route
                            key={idx}
                            path={key}
                            element={<TabPanel value={value as MeasureTab} />}
                        />
                    ))}
                    <Route path='*' element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
