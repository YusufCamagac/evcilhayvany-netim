import React, { useState, useEffect } from 'react';
import { createAppointment, getPets } from '../api';

const AppointmentScheduling = () => {
  const [appointment, setAppointment] = useState({
    petId: '',
    date: '',
    time: '',
    provider: '',
    reason: '',
  });
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

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
  }, []);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAppointment(appointment);
      setMessage('Randevu başarıyla oluşturuldu!');
      setAppointment({
        petId: '',
        date: '',
        time: '',
        provider: '',
        reason: '',
      });
      console.log(response.data)

    } catch (error) {
      setMessage('Randevu oluşturulamadı.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Randevu Zamanlama</h2>
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="petId" className="block mb-2">Evcil Hayvan</label>
          <select
            id="petId"
            name="petId"
            value={appointment.petId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
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
        <div>
          <label htmlFor="date" className="block mb-2">Tarih</label>
          <input
            type="date"
            id="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block mb-2">Saat</label>
          <input
            type="time"
            id="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="provider" className="block mb-2">Sağlayıcı</label>
          <input
            type="text"
            id="provider"
            name="provider"
            value={appointment.provider}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="reason" className="block mb-2">Randevu Nedeni</label>
          <textarea
            id="reason"
            name="reason"
            value={appointment.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Randevu Oluştur
        </button>
      </form>
    </div>
  );
};

export default AppointmentScheduling;