import React from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {getSender, getSenderFull} from '../Config/Chatlogics';
import ProfileModel from './miscellaneous/ProfileModel';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';


const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const{user, selectedChat, setSelectedChat} = ChatState();

  return (
    
    selectedChat?(
        <>
        <Text
        pb={3}
        px={2}
        fontFamily={"Work sans"}
        fontSize={{base: "28px", md: "30px"}}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        >
            <IconButton
            display={{base:  "flex" , md: "none"}}
            icon={<ArrowBackIcon/>}
            onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat?(
                <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)}/>
                </>
            ):(
                
                <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                
                fetchAgain ={fetchAgain}
                setFetchAgain ={setFetchAgain}  />
                </>
            )}

        </Text>

                <Box
                pb={3}
                fontFamily={"Work sans"}
                fontSize={{base: "28px", md: "30px"}}
                display={"flex"}
                flexDir={"column"}
                h={"100%"}
                w={"100%"}
                justifyContent={"flex-end"}
                bg={"#E8E8E8"}
                borderRadius={"lg"}
                overflow={"hidden"}
                >

                </Box>

        </>
    ):(
        <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"100%"}
        >
            <Text pb={2}
            fontSize={"3xl"}
            fontFamily={"Work sans"}>
            Click on a user to start chatting.
            </Text>
        </Box>
    )
    
  )
};

export default SingleChat;