import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imgUrl, setImgUrl] = useState(null)

  function handleViewImage(imgUrl: string) {
    setImgUrl(imgUrl);
    onOpen();
  }

  // console.log("Cards: ", cards);

  return (
    <>
      <SimpleGrid columns={3} spacing="40px" mb="8">
        {cards.map(card => (
          <Card 
            key={card.id}
            data={card} 
            viewImage={handleViewImage}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage 
        imgUrl={imgUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
