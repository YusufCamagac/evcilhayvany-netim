import React, { useState, useEffect } from 'react';
import { getMedicalRecords, updateMedicalRecord, deleteMedicalRecord } from '../api';

const MedicalRecordsManagement = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    petId: '',
    recordDate: '',
    description: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      const response = await getMedicalRecords();
      setMedicalRecords(response.data);
    } catch (error) {
      console.error('Tıbbi kayıtlar alınamadı:', error);
      setMessage('Tıbbi kayıtlar alınamadı.');
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormData({
      petId: record.petId,
      recordDate: record.recordDate,
      description: record.description,
    });
    setEditMode(true);
    setMessage('');
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Tıbbi kaydı silmek istediğinize emin misiniz?')) {
      try {
        await deleteMedicalRecord(recordId);
        setMedicalRecords(medicalRecords.filter((record) => record.id !== recordId));
        setSelectedRecord(null);
        setEditMode(false);
        setMessage('Tıbbi kayıt başarıyla silindi.');
      } catch (error) {
        console.error('Tıbbi kayıt silinemedi:', error);
        setMessage('Tıbbi kayıt silinemedi.');
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
        const response = await updateMedicalRecord(selectedRecord.id, formData);
        setMedicalRecords(
          medicalRecords.map((record) => (record.id === selectedRecord.id ? response.data : record))
        );
        setSelectedRecord(null);
        setEditMode(false);
        setMessage('Tıbbi kayıt başarıyla güncellendi.');
      } catch (error) {
        console.error('Tıbbi kayıt güncellenemedi:', error);
        setMessage('Tıbbi kayıt güncellenemedi.');
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedRecord(null);
    setFormData({
      petId: '',
      recordDate: '',
      description: '',
    });
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tıbbi Kayıtları Yönet</h2>

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
        {medicalRecords.map((record) => (
          <div key={record.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">Pet ID: {record.petId}</p>
            <p>Kayıt Tarihi: {new Date(record.recordDate).toLocaleDateString()}</p>
            <p>Açıklama: {record.description}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(record)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(record.id)}
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
            Tıbbi Kaydı Düzenle
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
              <label htmlFor="recordDate" className="block mb-2">
                Kayıt Tarihi
              </label>
              <input
                type="date"
                id="recordDate"
                name="recordDate"
                value={formData.recordDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2">
                Açıklama
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
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

export default MedicalRecordsManagement;