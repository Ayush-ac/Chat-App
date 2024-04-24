import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const ProfileModel = ({user, children}) => {

    const{isOpen, onOpen, onClose} = useDisclosure();

  return ( <>
  
    {children?(<span onClick={onOpen}>{children}</span>)
    :
    (<IconButton
         d={{base:"flex"}}
         icon={<ViewIcon/>}
         onClick={onOpen}
    />
    )}
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered> 
        <ModalOverlay />
        <ModalContent height={"52%"}> 
          <ModalHeader textAlign={"center"}> {user.name} </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          >
            <Image 
            borderRadius={"full"}
            boxSize={"150px"}
            src= {user.pic}
            alt= {user.name}
            />

            <Text fontSize='20px' fontFamily={'sans-serif'}>Email:{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </>)
};

export default ProfileModel;