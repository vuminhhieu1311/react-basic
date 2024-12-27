import CustomerList from './components/customer/CustomerList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Setting from './components/setting/Setting';
import Login from './components/Auth/Login';
import Authentication from './components/Auth/Authentication';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<Authentication><CustomerList /></Authentication>} />
                    <Route path="/login" element={<Authentication><Login /></Authentication>} />
                    <Route path="/customers" element={<Authentication><CustomerList /></Authentication>} />
                    <Route path="/settings" element={<Authentication><Setting /></Authentication>} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
