import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import logoImg from './assets/logo.svg';

import { GameCard } from './components/GameCard'
import { CreateAdBanner } from './components/CreateAdBanner'
import { NewAdModal } from './components/NewAdModal'

import './styles/main.css';

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: { 
    ads: number 
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  const renderGameCards = () => {
    return games?.map((game) => {
        return (
            <GameCard
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
                key={game.id}
            ></GameCard>
        )
    })
  }

 return (
  <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20 mt-1">
    <img src={logoImg} alt='' />

    <h1 className='text-6xl text-white font-black mt-20'>
      Seu <span className=' text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
    </h1>

    <div className="grid grid-cols-6 gap-6 mt-16">
      {renderGameCards()}
    </div>

    <Dialog.Root>
      <CreateAdBanner />
      <NewAdModal games={games} />
    </Dialog.Root>
  </div>
 )
}

export default App
