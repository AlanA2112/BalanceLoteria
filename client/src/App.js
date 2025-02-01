import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { AppProvider } from './AppContext';

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
                </Routes>
            </AppProvider>
        </div>
    );
}

export default App;
