import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Exchange from './pages/Exchange';
import Earn from './pages/Earn';
import Wallet from './pages/Wallet';
import AllCoins from './pages/AllCoins';
import ChoosePayment from './pages/ChoosePayment';
import Recharge from './pages/Recharge';
import ChooseBank from './pages/ChooseBank';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/exchange" element={
              <ProtectedRoute>
                <Layout>
                  <Exchange />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/earn" element={
              <ProtectedRoute>
                <Layout>
                  <Earn />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute>
                <Layout>
                  <Wallet />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/coins" element={
              <ProtectedRoute>
                <Layout>
                  <AllCoins />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/choose-payment" element={
              <ProtectedRoute>
                <Layout>
                  <ChoosePayment />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/recharge" element={
              <ProtectedRoute>
                <Layout>
                  <Recharge />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/choose-bank" element={
              <ProtectedRoute>
                <Layout>
                  <ChooseBank />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 