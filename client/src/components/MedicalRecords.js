import React, { useState, useEffect } from 'react';
import { getMedicalRecords, createMedicalRecord, getPets } from '../api';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [newMedicalRecord, setNewMedicalRecord] = useState({
    petId: '',
    recordDate: '',
    description: '',
  });
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await getMedicalRecords();
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Tıbbi kayıtlar alınamadı:', error);
        setMessage('Tıbbi kayıtlar alınamadı.');
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

    fetchMedicalRecords();
    fetchPets();
  }, []);

  const handleNewRecordChange = (e) => {
    setNewMedicalRecord({
      ...newMedicalRecord,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMedicalRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await createMedicalRecord(newMedicalRecord);
      setMedicalRecords([...medicalRecords, response.data]);
      setNewMedicalRecord({
        petId: '',
        recordDate: '',
        description: '',
      });
      setMessage('Tıbbi kayıt başarıyla eklendi!');

      // Mesajı temizle:
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Tıbbi kayıt eklenemedi:', error);
      setMessage('Tıbbi kayıt eklenemedi.');
    }
  };

  return (
    <div className="bg-secondary-900">
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-primary-500">Tıbbi Kayıtlar</h2>
            <p className="text-secondary-300 mb-4">Evcil hayvanlarınızın tıbbi kayıtlarını buradan görüntüleyebilir ve yönetebilirsiniz.</p>

            {message && (
              <div className="mb-4 p-2 bg-red-100 text-red-700">{message}</div>
            )}

            <form onSubmit={handleAddMedicalRecord} className="mb-8 space-y-4">
                <h3 className="text-xl font-semibold text-secondary-300">Yeni Kayıt Ekle</h3>
                <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4">
                    <div>
                        <label htmlFor="newPetId" className="block mb-2 text-secondary-300">Evcil Hayvan</label>
                        <select
                            id="newPetId"
                            name="petId"
                            value={newMedicalRecord.petId}
                            onChange={handleNewRecordChange}
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
                </div>
                <div className="w-full md:w-1/2 px-4">
                    <div>
                        <label htmlFor="newRecordDate" className="block mb-2 text-secondary-300">Tarih</label>
                        <input
                            type="date"
                            id="newRecordDate"
                            name="recordDate"
                            value={newMedicalRecord.recordDate}
                            onChange={handleNewRecordChange}
                            className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>
                </div>
                </div>
                <div>
                <label htmlFor="newDescription" className="block mb-2 text-secondary-300">Açıklama</label>
                <textarea
                    id="newDescription"
                    name="description"
                    value={newMedicalRecord.description}
                    onChange={handleNewRecordChange}
                    className="w-full px-3 py-2 border rounded-md bg-secondary-800 text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                    placeholder="Tıbbi kayıt açıklamasını buraya girin"
                />
                </div>
                <button type="submit" className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md">
                Kayıt Ekle
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {medicalRecords.map((record) => (
                <div key={record.id} className="p-4 border rounded-lg shadow-md bg-secondary-800">
                    <p className="font-semibold text-secondary-300">
                    Evcil Hayvan: {pets.find((pet) => pet.id === record.petId)?.name || 'Bilinmiyor'}
                    </p>
                    <p className="text-secondary-300">Tarih: {new Date(record.recordDate).toLocaleDateString()}</p>
                    <p className="text-secondary-300">Açıklama: {record.description}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default MedicalRecords;