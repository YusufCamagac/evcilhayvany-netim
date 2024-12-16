import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import PetRegistration from '../components/PetRegistration';
import AppointmentScheduling from '../components/AppointmentScheduling';
import MedicalRecords from '../components/MedicalRecords';
import Reminders from '../components/Reminders';
import UserManagement from '../components/UserManagement';
import AdminManagement from '../components/AdminManagement';
import PetsManagement from '../components/PetsManagement';
import AppointmentsManagement from '../components/AppointmentsManagement';
import MedicalRecordsManagement from '../components/MedicalRecordsManagement';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="pet-registration" element={<PetRegistration />} />
          <Route
            path="appointment-scheduling"
            element={<AppointmentScheduling />}
          />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="pets" element={<PetsManagement />} />
          <Route path="appointments" element={<AppointmentsManagement />} />
          <Route
            path="medical-records"
            element={<MedicalRecordsManagement />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;