import React, { useState, useEffect } from 'react';
import { getPets, updatePet, deletePet } from '../api';

const PetsManagement = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    medicalHistory: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await getPets();
      setPets(response.data);
    } catch (error) {
      console.error('Evcil hayvanlar alınamadı:', error);
      setMessage('Evcil hayvanlar alınamadı.');
    }
  };

  const handleEdit = (pet) => {
    setSelectedPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      medicalHistory: pet.medicalHistory,
    });
    setEditMode(true);
    setMessage('');
  };

  const handleDelete = async (petId) => {
    if (window.confirm('Evcil hayvani silmek istediğinize emin misiniz?')) {
      try {
        await deletePet(petId);
        setPets(pets.filter((pet) => pet.id !== petId));
        setSelectedPet(null);
        setEditMode(false);
        setMessage('Evcil hayvan başarıyla silindi.');
      } catch (error) {
        console.error('Evcil hayvan silinemedi:', error);
        setMessage('Evcil hayvan silinemedi.');
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
        const response = await updatePet(selectedPet.id, formData);
        setPets(
          pets.map((pet) => (pet.id === selectedPet.id ? response.data : pet))
        );
        setSelectedPet(null);
        setEditMode(false);
        setMessage('Evcil hayvan başarıyla güncellendi.');
      } catch (error) {
        console.error('Evcil hayvan güncellenemedi:', error);
        setMessage('Evcil hayvan güncellenemedi.');
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedPet(null);
    setFormData({
      name: '',
      species: '',
      breed: '',
      age: '',
      gender: '',
      medicalHistory: '',
    });
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Evcil Hayvanları Yönet</h2>

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
        {pets.map((pet) => (
          <div key={pet.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">İsim: {pet.name}</p>
            <p>Tür: {pet.species}</p>
            <p>Cins: {pet.breed}</p>
            <p>Yaş: {pet.age}</p>
            <p>Cinsiyet: {pet.gender}</p>
            <p>Tıbbi Geçmiş: {pet.medicalHistory}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(pet)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(pet.id)}
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
            Evcil Hayvan Düzenle
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                İsim
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
             <div>
                <label htmlFor="species" className="block mb-2">
                  Tür
                </label>
                <input
                  type="text"
                  id="species"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="breed" className="block mb-2">
                  Cins
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="age" className="block mb-2">
                  Yaş
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-2">
                  Cinsiyet
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Dişi">Dişi</option>
                </select>
              </div>
              <div>
                <label htmlFor="medicalHistory" className="block mb-2">
                  Tıbbi Geçmiş
                </label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
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

export default PetsManagement;