import React, { useState } from 'react';
import axios from 'axios';
import backendUrl from '../Data/EnvData/EnvVariablesProvider';

const FormulaireTest = () => {
  // Définir les états pour chaque champ du formulaire
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [stock, setStock] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer les données au backend
      const response = await axios.post(backendUrl+"/AddBook", {
        title,
        author,
        isbn: parseInt(isbn),
        price: parseFloat(price),
        description,
        publicationDate: new Date(publicationDate).toISOString(),
        stock: parseInt(stock)
      });

      console.log('Réponse du serveur:', response);
      // Réinitialiser le formulaire après l'envoi des données
      setTitle('');
      setAuthor('');
      setISBN('');
      setPrice('');
      setDescription('');
      setPublicationDate('');
      setStock('');
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Auteur:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        ISBN:
        <input type="number" value={isbn} onChange={(e) => setISBN(e.target.value)} />
      </label>
      <label>
        Prix:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Date de publication:
        <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
      </label>
      <label>
        Stock:
        <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default FormulaireTest;
