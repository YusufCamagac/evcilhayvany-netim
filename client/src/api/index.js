import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Arka uç API'sinin temel URL'si

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Evcil Hayvanlar
export const getPets = () => api.get('/pets');
export const getPetById = (id) => api.get(`/pets/${id}`);
export const createPet = (petData) => api.post('/pets', petData);
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData);
export const deletePet = (id) => api.delete(`/pets/${id}`);

// Randevular
export const getAppointments = () => api.get('/appointments');
export const getAppointmentById = (id) => api.get(`/appointments/${id}`);
export const createAppointment = (appointmentData) => api.post('/appointments', appointmentData);
export const updateAppointment = (id, appointmentData) => api.put(`/appointments/${id}`, appointmentData);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// Tıbbi Kayıtlar
export const getMedicalRecords = () => api.get('/medical-records');
export const getMedicalRecordById = (id) => api.get(`/medical-records/${id}`);
export const createMedicalRecord = (medicalRecordData) => api.post('/medical-records', medicalRecordData);
export const updateMedicalRecord = (id, medicalRecordData) => api.put(`/medical-records/${id}`, medicalRecordData);
export const deleteMedicalRecord = (id) => api.delete(`/medical-records/${id}`);

// Kullanıcılar (kimlik doğrulama eklendiğinde genişletilecek)
export const getUsers = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;