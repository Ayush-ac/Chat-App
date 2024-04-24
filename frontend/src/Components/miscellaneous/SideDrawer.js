import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
         Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useToast } from '@chakra-ui/react';

import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchrResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const toast = useToast();
    
    const { user, setSelectedChat, chats, setChats } = ChatState();

    const history = useHistory();

    const{isOpen, onOpen, onClose} = useDisclosure();

    const logoutHandler = () =>{
        localStorage.removeItem("userInfo");
        history.push('/');
    };

    const handleSearch = async() =>{
        if(!search){
            toast({
                title:"Please enter something",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top-left"
            });
        }

        try {
            setLoading(true)
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title:"Error occured",
                description:"Failed to load",
                status:"error",
                isClosable:true,
                duration:5000,
                position:"bottom-left",
            });
        }
    };

    const accessChat = async(userId) =>{
        try {
            setLoadingChat(true)

            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post("/api/chat",{ userId }, config);
            if(!chats.find((c)=>c._id === data._id)) setChats([data, ...chats]);
            

            setSelectedChat(data);
            setLoading(false);
            onClose();

        } catch (error) {
            toast({
                title: "Error while fetching the chat",
                description : error.message,
                duration: 5000,
                isClosable: true,
                position:"bottom-left",
            });
        }
    };

  return (
   <>
   <Box
   display={"flex"}
   alignItems={"center"}
   justifyContent={'space-between'}
   bg={"white"}
   width={"100%"}
   p={"10px 5px 10px 5px"}
   >
    <Tooltip
    label="Search user to chat"
    hasArrow
    placement="bottom-end">

        <Button variant={"ghost"} onClick={onOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
        <Text fontSize={{base:"0px", md:"20px"}}px = "4" fontFamily={'monospace'}>
            Search User
        </Text>
        </Button>

    </Tooltip>

    <Text fontSize='20px' fontFamily={'monospace'}>
        Chit-Chat
    </Text>

    <div>
        <Menu>
            <MenuButton p={1}>
               <BellIcon/>
            </MenuButton>

            {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size={'sm'} cursor={"pointer"} name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
                <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>
                 </ProfileModel>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Log out</MenuItem>
                
            </MenuList>
        </Menu>
    </div>
   </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>
            <DrawerBody>
                <Box display={"flex"} pb={"2px"}>
                    <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                    <Button
                     onClick={handleSearch}
                    >Go</Button>
                </Box>

                {loading?(
                    <ChatLoading/>
                ):  (
                        searchrResult?.map(user=>(
                            <UserListItem
                            key = {user._id}
                            user = {user}
                            handleFunction={()=>accessChat(user._id)}
                            />
                        ))
                    )
                }

                {loadingChat && <Spinner ml={"auto"} display={"flex"}/>}

            </DrawerBody>
        </DrawerContent>
       
    </Drawer>
    
   </>
  )
}

export default SideDrawer;