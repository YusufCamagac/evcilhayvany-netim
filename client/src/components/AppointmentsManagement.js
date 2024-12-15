import React, { useState, useEffect } from 'react';
import { getAppointments, updateAppointment, deleteAppointment, getPets } from '../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    petId: '',
    date: new Date(),
    time: '',
    provider: '',
    reason: '',
  });
  const [message, setMessage] = useState('');
  const [pets, setPets] = useState([]); 

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        setPets(response.data);
      } catch (error) {
        console.error('Evcil hayvanlar alınamadı:', error);
      }
    };
    fetchPets();
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
      date: new Date(appointment.date), // Tarih objesine çevir
      time: appointment.time ? new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '',
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

        // Mesajı temizle:
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Randevu silinemedi:', error);
        setMessage('Randevu silinemedi.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      // Güncelleme
      try {
        // Saat bilgisini date nesnesine ekle
        const selectedDateTime = new Date(formData.date);
        const [hours, minutes] = formData.time.split(':');
        selectedDateTime.setHours(parseInt(hours, 10));
        selectedDateTime.setMinutes(parseInt(minutes, 10));

        const updatedAppointmentData = {
          ...formData,
          date: selectedDateTime.toISOString(), // Tarih ve saati ISO formatına çevir
        };

        const response = await updateAppointment(selectedAppointment.id, updatedAppointmentData);
        setAppointments(
          appointments.map((appointment) => (appointment.id === selectedAppointment.id ? response.data : appointment))
        );
        setSelectedAppointment(null);
        setEditMode(false);
        setMessage('Randevu başarıyla güncellendi.');

        // Mesajı temizle:
        setTimeout(() => setMessage(''), 3000);
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
      date: new Date(),
      time: '',
      provider: '',
      reason: '',
    });
    setMessage('');
  };

  return (
    <div className="bg-secondary-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary-500">
          Randevuları Yönet
        </h2>

        {message && (
          <div className="mb-4 p-2 bg-red-100 text-red-700">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => {
            const pet = pets.find((p) => p.id === appointment.petId);
            return (
            <div key={appointment.id} className="p-4 border rounded-lg shadow-md bg-secondary-800">
              <p className="font-semibold text-secondary-300">
                Evcil Hayvan: {pet ? pet.name : 'Bilinmiyor'}
              </p>
              <p className="text-secondary-300">
                Tarih: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-secondary-300">Saat: {appointment.time}</p>
              <p className="text-secondary-300">Sağlayıcı: {appointment.provider}</p>
              <p className="text-secondary-300">Sebep: {appointment.reason}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Sil
                </button>
              </div>
            </div>
          );
        })}
        </div>

        {editMode && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-secondary-300">
              Randevu Düzenle
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4">
                  <div>
                    <label
                      htmlFor="petId"
                      className="block mb-2 text-secondary-300"
                    >
                      Evcil Hayvan
                    </label>
                    <select
                      id="petId"
                      name="petId"
                      value={formData.petId}
                      onChange={handleChange}
                      className="
                        w-full
                        px-3
                        py-2
                        border
                        rounded-md
                        bg-secondary-800
                        text-secondary-300
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary-500
                      "
                      required
                    >
                      <option value="">Seçiniz</option>
                      {pets.map((pet) => (
                        <option key={pet.id} value={pet.id}>
                          {pet.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <div>
                    <label
                      htmlFor="provider"
                      className="block mb-2 text-secondary-300"
                    >
                      Sağlayıcı
                    </label>
                    <input
                      type="text"
                      id="provider"
                      name="provider"
                      value={formData.provider}
                      onChange={handleChange}
                      className="
                        w-full
                        px-3
                        py-2
                        border
                        rounded-md
                        bg-secondary-800
                        text-secondary-300
                        placeholder-secondary-400
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary-500
                      "
                      required
                      placeholder="Veteriner adı"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block mb-2 text-secondary-300"
                    >
                      Tarih
                    </label>
                    <DatePicker
                      selected={formData.date}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      className="
                        w-full
                        px-3
                        py-2
                        border
                        rounded-md
                        bg-secondary-800
                        text-secondary-300
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary-500
                      "
                      required
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <div>
                    <label
                      htmlFor="time"
                      className="block mb-2 text-secondary-300"
                    >
                      Saat
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="
                        w-full
                        px-3
                        py-2
                        border
                        rounded-md
                        bg-secondary-800
                        text-secondary-300
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary-500
                      "
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="reason"
                  className="block mb-2 text-secondary-300"
                >
                  Randevu Nedeni
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="
                    w-full
                    px-3
                    py-2
                    border
                    rounded-md
                    bg-secondary-800
                    text-secondary-300
                    placeholder-secondary-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary-500
                  "
                  placeholder="Randevu nedeninizi kısaca açıklayınız"
                />
              </div>
              <div className="flex items-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsManagement;