import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import ChatPage from './pages/ChatPage';
import Header from './components/Header';
import PublicRoute from './components/PublicRoutes';
import PrivateRoute from './components/PrivateRoutes';
import Profile from './pages/Profile';
import SingleChat from './components/SingleChat';

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            iconTheme: {
              primary: '#4aed88',
              secondary: '',
            },
          },
        }}
      ></Toaster>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute element={<>
              <Header />
              <HomePage />
            </>} />
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute element={<>
              <Header />
              <ChatPage />
            </>} />
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute element={<>
              <Header />
              <Profile />
            </>} />
          }
        />
        <Route
          path="/single-chat/:userId"
          element={
            <PrivateRoute element={<SingleChat />} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
