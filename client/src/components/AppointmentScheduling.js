import React, { useState, useEffect } from 'react';
import { createAppointment, getPets } from '../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentScheduling = () => {
  const [appointment, setAppointment] = useState({
    petId: '',
    date: new Date(),
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

  const handleDateChange = (date) => {
    setAppointment({ ...appointment, date });
  };

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Saat bilgisini date nesnesine ekle
      const selectedDateTime = new Date(appointment.date);
      const [hours, minutes] = appointment.time.split(':');
      selectedDateTime.setHours(parseInt(hours, 10));
      selectedDateTime.setMinutes(parseInt(minutes, 10));

      const appointmentData = {
        ...appointment,
        date: selectedDateTime.toISOString(), // Tarih ve saati ISO formatına çevir
      };

      const response = await createAppointment(appointmentData);
      setMessage('Randevu başarıyla oluşturuldu!');
      setAppointment({
        petId: '',
        date: new Date(),
        time: '',
        provider: '',
        reason: '',
      });
      console.log(response.data);
    } catch (error) {
      setMessage('Randevu oluşturulamadı.');
      console.error(error);
    }
  };

  return (
    <div className="bg-secondary-900">
        <div className='container mx-auto p-4'>
            <h2 className="text-2xl font-bold mb-4 text-primary-500">Randevu Alma</h2>
            {message && <div className="mb-4 p-2 bg-green-100 text-green-700">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="petId" className="block mb-2 text-secondary-300">Evcil Hayvan</label>
                    <select
                        id="petId"
                        name="petId"
                        value={appointment.petId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <div className='flex flex-wrap -mx-4'>
                    <div className="w-full md:w-1/2 px-4">
                        <div>
                            <label htmlFor="date" className="block mb-2 text-secondary-300">Tarih</label>
                            <DatePicker
                                selected={appointment.date}
                                onChange={handleDateChange}
                                dateFormat="yyyy-MM-dd"
                                className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <div>
                            <label htmlFor="time" className="block mb-2 text-secondary-300">Saat</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={appointment.time}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="provider" className="block mb-2 text-secondary-300">Sağlayıcı</label>
                    <input
                        type="text"
                        id="provider"
                        name="provider"
                        value={appointment.provider}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="reason" className="block mb-2 text-secondary-300">Randevu Nedeni</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={appointment.reason}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>
                <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md">
                    Randevu Oluştur
                </button>
            </form>
      </div>
    </div>
  );
};

export default AppointmentScheduling;