import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { AppProvider } from './AppContext';
import OCR from './Pages/OCR/OCR';

function App() {
    return (
        <div className="App">
            <AppProvider>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        exact
                        path="/ocr"
                        element={<OCR />}
                    />
                </Routes>
            </AppProvider>
        </div>
    );
}

export default App;
