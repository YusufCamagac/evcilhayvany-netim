import React, { useState, useEffect } from 'react';
import { getReminders, createReminder, getPets } from '../api'; // varsayımsal api metotları

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    petId: '',
    type: '',
    date: '',
    notes: '',
  });
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        //const response = await getReminders(); // api.js içinde bu metodu implemente etmelisin
        //setReminders(response.data);
      } catch (error) {
        console.error('Hatırlatıcılar alınamadı:', error);
      }
    };

    const fetchPets = async () => {
      try {
        const response = await getPets();
        setPets(response.data);
      } catch (error) {
        console.error('Evcil hayvanlar alınamadı:', error);
      }
    };

    fetchReminders();
    fetchPets();
  }, []);

  const handleNewReminderChange = (e) => {
    setNewReminder({ ...newReminder, [e.target.name]: e.target.value });
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      //const response = await createReminder(newReminder); // api.js içinde bu metodu implemente etmelisin
      //setReminders([...reminders, response.data]);
      setNewReminder({
        petId: '',
        type: '',
        date: '',
        notes: '',
      });
      setMessage('Hatırlatıcı başarıyla eklendi!');
    } catch (error) {
      console.error('Hatırlatıcı eklenemedi:', error);
      setMessage('Hatırlatıcı eklenemedi.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hatırlatıcılar</h2>
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700">{message}</div>}
      <form onSubmit={handleAddReminder} className="mb-8 space-y-4">
        <h3 className="text-xl font-semibold">Yeni Hatırlatıcı Ekle</h3>
        <div>
          <label htmlFor="newPetId" className="block mb-2">Evcil Hayvan</label>
          <select
            id="newPetId"
            name="petId"
            value={newReminder.petId}
            onChange={handleNewReminderChange}
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
          <label htmlFor="newType" className="block mb-2">Tür</label>
          <select
            id="newType"
            name="type"
            value={newReminder.type}
            onChange={handleNewReminderChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Seçiniz</option>
            <option value="İlaç">İlaç</option>
            <option value="Aşı">Aşı</option>
            <option value="Randevu">Randevu</option>
          </select>
        </div>
        <div>
          <label htmlFor="newDate" className="block mb-2">Tarih</label>
          <input
            type="date"
            id="newDate"
            name="date"
            value={newReminder.date}
            onChange={handleNewReminderChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="newNotes" className="block mb-2">Notlar</label>
          <textarea
            id="newNotes"
            name="notes"
            value={newReminder.notes}
            onChange={handleNewReminderChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Hatırlatıcı Ekle
        </button>
      </form>

      {/* Hatırlatıcıları listeleme kısmı - API'den veri alarak doldur */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">
              Evcil Hayvan: {pets.find((pet) => pet.id === reminder.petId)?.name || 'Bilinmiyor'}
            </p>
            <p>Tür: {reminder.type}</p>
            <p>Tarih: {new Date(reminder.date).toLocaleDateString()}</p>
            <p>Notlar: {reminder.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders;