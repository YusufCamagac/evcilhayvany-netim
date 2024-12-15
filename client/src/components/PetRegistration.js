import React, { useState } from 'react';
import { createPet } from '../api';

const PetRegistration = () => {
  const [pet, setPet] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    medicalHistory: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPet(pet);
      setMessage('Evcil hayvan başarıyla kaydedildi!');
      setPet({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        medicalHistory: '',
      });
      console.log(response.data)
    } catch (error) {
      setMessage('Evcil hayvan kaydedilemedi.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Evcil Hayvan Kaydı</h2>
      {message && <div className="mb-4 p-2 bg-green-100 text-green-700">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2">Ad</label>
          <input
            type="text"
            id="name"
            name="name"
            value={pet.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="species" className="block mb-2">Tür</label>
          <input
            type="text"
            id="species"
            name="species"
            value={pet.species}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="breed" className="block mb-2">Irk</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={pet.breed}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="age" className="block mb-2">Yaş</label>
          <input
            type="number"
            id="age"
            name="age"
            value={pet.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-2">Cinsiyet</label>
          <select
            id="gender"
            name="gender"
            value={pet.gender}
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
          <label htmlFor="medicalHistory" className="block mb-2">Tıbbi Geçmiş</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={pet.medicalHistory}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default PetRegistration;