import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { FormCreateTransaction } from './pages/FormCreateTransaction';
import { Landing } from './pages/Landing';

export default function RoutesPages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/transactions/create" element={<FormCreateTransaction/>} />
      </Routes>
    </BrowserRouter>
  );
}