import { useState } from 'react';
import { useHandbags } from '../context/HandbagContext';
import HandbagForm from './HandbagForm';

const HandbagList = () => {
  const { handbags, loading, deleteHandbag } = useHandbags();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHandbag, setEditingHandbag] = useState(null);

  const handleEdit = (handbag) => {
    setEditingHandbag(handbag);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingHandbag(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold !text-green-800 tracking-tight">
              Boutique de <span className="text-green-600">Sacs</span>
            </h1>
            <p className="text-green-800 mt-2 text-sm md:text-base">Découvrez notre collection exclusive</p>
          </div>
          
          <button
            onClick={handleAdd}
            className="group bg-yellow-600 hover: text-green-800 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Nouveau Sac
          </button>
        </div>

        {/* Grille de produits */}
        {handbags.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-300">
            <p className="text-green-400 text-lg">Aucun sac disponible pour le moment.</p>
            <button onClick={handleAdd} className="mt-4 text-green-600 hover:underline">Ajouter le premier sac</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {handbags.map((bag) => (
              <div
                key={bag._id}
                className="group bg-gray-100 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-400">
                  <img
                    src={bag.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={bag.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm">
                    {bag.brand}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{bag.title}</h3>
                    <span className="text-lg font-bold text-green-600">{bag.price.toLocaleString()} €</span>
                  </div>
                  
                  <p className="text-sm text-green-600 mb-4 line-clamp-2 flex-1">
                    {bag.description || 'Aucune description disponible.'}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-green-700 mb-5">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: bag.color.toLowerCase() === 'noir' ? '#000' : bag.color === 'blanc' ? '#fff' : 'transparent' }}></span>
                      {bag.color}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(bag)}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => deleteHandbag(bag._id)}
                      className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal d'édition/ajout */}
        {isModalOpen && (
          <HandbagForm 
            editHandbag={editingHandbag} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default HandbagList;