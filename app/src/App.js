import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'

import Home from './components/pages/Home'
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import Balances from './components/pages/Balances/Balances'
import AddBalance from './components/pages/Balances/AddBalance'
import EditBalance from './components/pages/Balances/EditBalance'
import Payments from './components/pages/Payments/Payments'
import AddPayment from './components/pages/Payments/AddPayment'
import EditPayment from './components/pages/Payments/EditPayment'

import { UserProvider } from './context/UserContext'

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/balance' element={<Balances />} />
            <Route path='/balance/add' element={<AddBalance />} />
            <Route path='/balance/edit/:id' element={<EditBalance />} />
            <Route path='/payment' element={<Payments />} />
            <Route path='/payment/add' element={<AddPayment />} />
            <Route path='/payment/edit/:id' element={<EditPayment />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
