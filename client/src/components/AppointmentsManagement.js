import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointment, deleteAppointment } from '../api';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    petId: '',
    date: '',
    time: '',
    provider: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Randevular alınamadı:', error);
      setMessage('Randevular alınamadı.');
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      petId: appointment.petId,
      date: appointment.date,
      time: appointment.time,
      provider: appointment.provider,
      reason: appointment.reason,
    });
    setEditMode(true);
    setMessage('');
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Randevuyu silmek istediğinize emin misiniz?')) {
      try {
        await deleteAppointment(appointmentId);
        setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
        setSelectedAppointment(null);
        setEditMode(false);
        setMessage('Randevu başarıyla silindi.');
      } catch (error) {
        console.error('Randevu silinemedi:', error);
        setMessage('Randevu silinemedi.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      // Güncelleme
      try {
        const response = await updateAppointment(selectedAppointment.id, formData);
        setAppointments(
          appointments.map((appointment) => (appointment.id === selectedAppointment.id ? response.data : appointment))
        );
        setSelectedAppointment(null);
        setEditMode(false);
        setMessage('Randevu başarıyla güncellendi.');
      } catch (error) {
        console.error('Randevu güncellenemedi:', error);
        setMessage('Randevu güncellenemedi.');
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedAppointment(null);
    setFormData({
      petId: '',
      date: '',
      time: '',
      provider: '',
      reason: '',
    });
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Randevuları Yönet</h2>

      {message && (
        <div
          className={`mb-4 p-2 ${
            message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">Pet ID: {appointment.petId}</p>
            <p>Tarih: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Saat: {appointment.time}</p>
            <p>Sağlayıcı: {appointment.provider}</p>
            <p>Sebep: {appointment.reason}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(appointment)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(appointment.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {editMode && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">
            Randevu Düzenle
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="petId" className="block mb-2">
              Pet ID
            </label>
            <input
              type="text"
              id="petId"
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block mb-2">
              Tarih
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-2">
              Saat
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="provider" className="block mb-2">
              Sağlayıcı
            </label>
            <input
              type="text"
              id="provider"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block mb-2">
              Sebep
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
            <div className="flex items-center">
              <button
                type="submit"
                className= "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppointmentsManagement;