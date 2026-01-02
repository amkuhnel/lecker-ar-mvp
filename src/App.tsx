import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddLocationScreen from './screens/AddLocationScreen';
import ManageLocationsScreen from './screens/ManageLocationsScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import ActivityScreen from './screens/ActivityScreen';
import ProfileScreen from './screens/ProfileScreen';
import CreateReviewFlow from './screens/CreateReviewFlow';
import VenueDetailsScreen from './screens/VenueDetailsScreen';
import MessagingScreen from './screens/MessagingScreen';
import PublicProfileScreen from './screens/PublicProfileScreen';
import ChatDetailScreen from './screens/ChatDetailScreen';
import UserListScreen from './screens/UserListScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen'; // New Import
import SettingsScreen from './screens/SettingsScreen';

const App: React.FC = () => {
  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen bg-black relative flex flex-col shadow-2xl overflow-x-hidden border-x border-white/5">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/add-location" element={<AddLocationScreen />} />
          <Route path="/manage-locations" element={<ManageLocationsScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/map" element={<MapScreen />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/create/*" element={<CreateReviewFlow />} />
          <Route path="/venue/:id" element={<VenueDetailsScreen />} />
          <Route path="/user/:id" element={<PublicProfileScreen />} />
          <Route path="/messaging" element={<MessagingScreen />} />
          <Route path="/chat/:id" element={<ChatDetailScreen />} />
          <Route path="/user/:id/list/:type" element={<UserListScreen />} />
          <Route path="/admin" element={<AdminDashboardScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
