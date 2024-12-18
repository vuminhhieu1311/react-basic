import CustomerList from './components/customer/CustomerList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/book/BookList';
import CustomerEdit from './components/customer/CustomerEdit';
import CustomerCreate from './components/customer/CustomerCreate';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/:id/edit" element={<CustomerEdit />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
