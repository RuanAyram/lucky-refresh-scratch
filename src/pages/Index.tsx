import { useEffect, useState } from 'react';
import ScratchCard from '../components/ScratchCard';

const prizes = [
  "R$ 50,00",
  "R$ 100,00",
  "R$ 200,00",
  "R$ 500,00",
  "R$ 1000,00",
  "Tente Novamente"
];

const Index = () => {
  const [prize, setPrize] = useState("");

  useEffect(() => {
    // Generate random prize on page load
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setPrize(randomPrize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-scratch-primary to-scratch-secondary flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Raspadinha da Sorte
      </h1>
      <p className="text-white text-lg mb-8 text-center max-w-md">
        Arraste o dedo ou mouse sobre o cartão para revelar seu prêmio!
      </p>
      <div className="mb-8">
        <ScratchCard prize={prize} />
      </div>
      <p className="text-white text-sm opacity-75 text-center">
        Atualize a página para tentar novamente!
      </p>
    </div>
  );
};

export default Index;