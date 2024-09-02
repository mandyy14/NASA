import React, { useEffect, useState } from "react";
import axios from "axios";

// Interface para definir a estrutura dos dados que serão recebidos da API da NASA
interface NasaPhotoData {
  date: string; // Data em que a foto foi tirada ou publicada
  explanation: string; // Explicação sobre a foto
  hdurl: string; // URL da imagem em alta definição
  title: string; // Título
  url: string; // URL
}

const NasaPhoto: React.FC = () => {
  //armazenar os dados da foto da NASA
  const [photoData, setPhotoData] = useState<NasaPhotoData | null>(null);
  // Estado para armazenar mensagens de erro, caso ocorram
  const [error, setError] = useState<string | null>(null);

  const NASA_API_KEY = "VRM3JQfzRf8G4hDGhGdJJjU0TIg5YtcF9CHhXWzb";

  useEffect(() => {
    // Função assíncrona que busca os dados da foto da NASA usando a API
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
        );
        // Armazena os dados da foto no estado `photoData`
        setPhotoData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Erro ao carregar a imagem da NASA:", err);
        setError("Erro ao carregar a imagem da NASA.");
      }
    };
    // Chama a função para buscar a foto assim que o componente for montado
    fetchPhoto();
  }, []);

  if (error) return <div>{error}</div>;
  if (!photoData) return <div>Carregando...</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{photoData.title}</h1>
      <p>{photoData.date}</p>
      <img
        src={photoData.url}
        alt={photoData.title}
        style={{ maxWidth: "100%" }}
      />
      <p>{photoData.explanation}</p>
    </div>
  );
};

export default NasaPhoto;
