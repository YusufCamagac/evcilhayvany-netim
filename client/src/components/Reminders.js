import React, { useState, useEffect } from 'react';
import { getReminders, createReminder, getPets } from '../api';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReminders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getReminders();
        setReminders(response.data);
      } catch (error) {
        console.error('Hatırlatıcılar alınamadı:', error);
        setError('Hatırlatıcılar alınamadı.');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPets = async () => {
      try {
        const response = await getPets();
        setPets(response.data);
      } catch (error) {
        console.error('Evcil hayvanlar alınamadı:', error);
        setError('Evcil hayvanlar alınamadı.');
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
    setIsLoading(true);
    setError(null);
    try {
      const response = await createReminder(newReminder);
      setReminders([...reminders, response.data]);
      setNewReminder({
        petId: '',
        type: '',
        date: '',
        notes: '',
      });
      setMessage('Hatırlatıcı başarıyla eklendi!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Hatırlatıcı eklenemedi:', error);
      setError('Hatırlatıcı eklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary-500">
          Hatırlatıcılar
        </h2>
        {isLoading && <div className="mb-4 p-2 text-secondary-300">Yükleniyor...</div>}
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700">{error}</div>}
        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-700">{message}</div>
        )}
        <form onSubmit={handleAddReminder} className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-secondary-300">
            Yeni Hatırlatıcı Ekle
          </h3>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4">
              <div>
                <label
                  htmlFor="newPetId"
                  className="block mb-2 text-secondary-300"
                >
                  Evcil Hayvan
                </label>
                <select
                  id="newPetId"
                  name="petId"
                  value={newReminder.petId}
                  onChange={handleNewReminderChange}
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
                  htmlFor="newType"
                  className="block mb-2 text-secondary-300"
                >
                  Tür
                </label>
                <select
                  id="newType"
                  name="type"
                  value={newReminder.type}
                  onChange={handleNewReminderChange}
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
                  <option value="İlaç">İlaç</option>
                  <option value="Aşı">Aşı</option>
                  <option value="Randevu">Randevu</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="newDate"
              className="block mb-2 text-secondary-300"
            >
              Tarih
            </label>
            <input
              type="date"
              id="newDate"
              name="date"
              value={newReminder.date}
              onChange={handleNewReminderChange}
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
            />
          </div>
          <div>
            <label
              htmlFor="newNotes"
              className="block mb-2 text-secondary-300"
            >
              Notlar
            </label>
            <textarea
              id="newNotes"
              name="notes"
              value={newReminder.notes}
              onChange={handleNewReminderChange}
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
              placeholder="Hatırlatıcı notları"
            />
          </div>
          <button
            type="submit"
            className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md"
          >
            Hatırlatıcı Ekle
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.length > 0 ? (
            reminders.map((reminder) => {
              const pet = pets.find((p) => p.id === reminder.petId);
              return (
                <div
                  key={reminder.id}
                  className="p-4 border rounded-lg shadow-md bg-secondary-800"
                >
                  <p className="font-semibold text-secondary-300">
                    Evcil Hayvan: {pet ? pet.name : 'Bilinmiyor'}
                  </p>
                  <p className="text-secondary-300">Tür: {reminder.type}</p>
                  <p className="text-secondary-300">
                    Tarih: {new Date(reminder.date).toLocaleDateString()}
                  </p>
                  <p className="text-secondary-300">Notlar: {reminder.notes}</p>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-secondary-300">
              <p>Henüz hatırlatıcı yok.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;