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

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await getMedicalRecords();
        setMedicalRecords(response.data);
      } catch (error) {
        console.error('Tıbbi kayıtlar alınamadı:', error);
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
    setNewMedicalRecord({ ...newMedicalRecord, [e.target.name]: e.target.value });
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
    } catch (error) {
      console.error('Tıbbi kayıt eklenemedi:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tıbbi Kayıtlar</h2>

      <form onSubmit={handleAddMedicalRecord} className="mb-8 space-y-4">
        <h3 className="text-xl font-semibold">Yeni Kayıt Ekle</h3>
        <div>
          <label htmlFor="newPetId" className="block mb-2">Evcil Hayvan</label>
          <select
            id="newPetId"
            name="petId"
            value={newMedicalRecord.petId}
            onChange={handleNewRecordChange}
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
          <label htmlFor="newRecordDate" className="block mb-2">Tarih</label>
          <input
            type="date"
            id="newRecordDate"
            name="recordDate"
            value={newMedicalRecord.recordDate}
            onChange={handleNewRecordChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="newDescription" className="block mb-2">Açıklama</label>
          <textarea
            id="newDescription"
            name="description"
            value={newMedicalRecord.description}
            onChange={handleNewRecordChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Kayıt Ekle
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medicalRecords.map((record) => (
          <div key={record.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">
              Evcil Hayvan: {pets.find((pet) => pet.id === record.petId)?.name || 'Bilinmiyor'}
            </p>
            <p>Tarih: {new Date(record.recordDate).toLocaleDateString()}</p>
            <p>Açıklama: {record.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecords;