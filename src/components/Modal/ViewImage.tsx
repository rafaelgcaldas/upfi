import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Box,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (

    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Box 
            maxWidth="900px"
            maxheight="600px"
          >
            <Image 
              src={imgUrl} 
              alt="Imagem" 
            />
          </Box>
        </ModalBody>

        <ModalFooter bg="pGray.800" justifyContent="flex-start">
          <Link 
            href={imgUrl} 
            isExternal
            color="pGray.50"
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
