import { createContext, useContext, useState, useEffect } from 'react';

const HandbagContext = createContext();

export const HandbagProvider = ({ children }) => {
  const [handbags, setHandbags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      {
        _id: '1',
        brand: 'Chanel',
        title: 'Classic Flap',
        price: 8500,
        color: 'Noir',
        description: 'Intemporel, cuir de mouton noir.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d121fa?auto=format&fit=crop&q=80&w=600'
      },
      {
        _id: '2',
        brand: 'Dior',
        title: 'Saddle',
        price: 4200,
        color: 'Beige',
        description: 'Forme en selle, cuir beige.',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a689373?auto=format&fit=crop&q=80&w=600'
      }
    ];
    setHandbags(dummyData);
    setLoading(false);
  }, []);

  const addHandbag = async (newHandbag) => {
    const id = Math.random().toString(36).substr(2, 9);
    const handbag = { ...newHandbag, _id: id };
    setHandbags([...handbags, handbag]);
    return handbag;
  };

  const updateHandbag = async (id, updatedData) => {
    setHandbags(handbags.map((bag) => (bag._id === id ? { ...bag, ...updatedData } : bag)));
  };

  const deleteHandbag = async (id) => {
    setHandbags(handbags.filter((bag) => bag._id !== id));
  };

  return (
    <HandbagContext.Provider value={{ handbags, loading, addHandbag, updateHandbag, deleteHandbag }}>
      {children}
    </HandbagContext.Provider>
  );
};

export const useHandbags = () => useContext(HandbagContext);