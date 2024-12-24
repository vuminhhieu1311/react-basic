import CustomerList from './components/customer/CustomerList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Setting from './components/setting/Setting';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<CustomerList />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/settings" element={<Setting />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
