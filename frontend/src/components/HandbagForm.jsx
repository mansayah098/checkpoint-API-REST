import { useState, useEffect } from 'react';
import { useHandbags } from '../context/HandbagContext';

const HandbagForm = ({ editHandbag, onClose }) => {
  const { addHandbag, updateHandbag } = useHandbags();
  
  // État initial du formulaire
  const [formData, setFormData] = useState({
    title: '', 
    brand: '', 
    price: '', 
    color: 'Noir', 
    description: '', 
    image: ''
  });

  // Remplir le formulaire si on modifie
  useEffect(() => {
    if (editHandbag) {
      setFormData(editHandbag);
    }
  }, [editHandbag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, price: Number(formData.price) };
    
    if (editHandbag) {
      await updateHandbag(editHandbag._id, payload);
    } else {
      await addHandbag(payload);
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Couleurs disponibles pour le sélecteur
  const colors = ['Noir', 'Blanc', 'Beige', 'Rouge', 'Bleu', 'Vert', 'Rose'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fond sombre avec flou */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Carte du formulaire */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
          {editHandbag ? 'Modifier le sac' : 'Ajouter un nouveau sac'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
            <input
              name="brand"
              placeholder="Ex: Chanel, Dior..."
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre du modèle</label>
            <input
              name="title"
              placeholder="Ex: Classic Flap..."
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
              <input
                name="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition bg-white"
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Image</label>
            <input
              name="image"
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black-700 mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Détails du produit..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              {editHandbag ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HandbagForm;