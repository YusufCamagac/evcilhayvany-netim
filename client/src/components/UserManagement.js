import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '', // Yeni kullanıcı eklerken gerekli
    role: 'user', // Varsayılan rol
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Kullanıcılar alınamadı:', error);
      setMessage('Kullanıcılar alınamadı.');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      password: '', // Şifreyi düzenlerken boş bırak
    });
    setEditMode(true);
    setAddMode(false);
    setMessage('');
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Kullanıcıyı silmek istediğinize emin misiniz?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
        setSelectedUser(null);
        setEditMode(false);
        setAddMode(false);
        setMessage('Kullanıcı başarıyla silindi.');
      } catch (error) {
        console.error('Kullanıcı silinemedi:', error);
        setMessage('Kullanıcı silinemedi.');
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
        const response = await updateUser(selectedUser.id, formData);
        setUsers(
          users.map((user) => (user.id === selectedUser.id ? response.data : user))
        );
        setSelectedUser(null);
        setEditMode(false);
        setMessage('Kullanıcı başarıyla güncellendi.');
      } catch (error) {
        console.error('Kullanıcı güncellenemedi:', error);
        setMessage('Kullanıcı güncellenemedi.');
      }
    } else if (addMode) {
      // Ekleme
      try {
        const response = await createUser(formData);
        setUsers([...users, response.data]);
        setAddMode(false);
        setFormData({
          username: '',
          email: '',
          password: '',
          role: 'user',
        });
        setMessage('Kullanıcı başarıyla eklendi.');
      } catch (error) {
        console.error('Kullanıcı eklenemedi:', error);
        setMessage('Kullanıcı eklenemedi.');
      }
    }
  };

  const handleAdd = () => {
    setAddMode(true);
    setEditMode(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'user',
    });
    setMessage('');
  };

  const handleCancel = () => {
    setAddMode(false);
    setEditMode(false);
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'user',
    });
    setMessage('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Kullanıcı Yönetimi</h2>

      {message && (
        <div
          className={`mb-4 p-2 ${
            message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Yeni Kullanıcı Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg shadow-md">
            <p className="font-semibold">Kullanıcı Adı: {user.username}</p>
            <p>E-posta: {user.email}</p>
            <p>Rol: {user.role}</p>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {(editMode || addMode) && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold">
            {editMode ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Ekle'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block mb-2">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            {addMode && (
              <div>
                <label htmlFor="password" className="block mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="role" className="block mb-2">
                Rol
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="user">Kullanıcı</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className={`bg-${
                  editMode ? 'blue' : 'green'
                }-500 text-white px-4 py-2 rounded-md hover:bg-${
                  editMode ? 'blue' : 'green'
                }-600 mr-2`}
              >
                {editMode ? 'Kaydet' : 'Ekle'}
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

export default UserManagement;