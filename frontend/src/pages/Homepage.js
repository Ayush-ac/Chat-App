import { Box, Container, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { Tab, TabList,Tabs,TabPanel,TabPanels } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Homepage = () => {

  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user) history.push("/chats");
  },[history]);

  return (
    <Container maxW='xl' centerContent>

      <Box
      border={"0px solid red"}
      display="flex"
      justifyContent={"center"}
      p={3}
      bg={'white'}
      w="100%"
      m="40px 0 15px 0"
      borderRadius='10px'
      fontSize='x-large'
      fontFamily='sans-serif'
      >
        <Text fontSize='20px' fontFamily={'monospace'}>
        Chit-Chat
        </Text>
      </Box>

      <Box
      border={"0px solid red"}
      bg={'white'} 
      w='100%' 
      p='4' 
      borderRadius='10px'>

        <Tabs variant='soft-rounded'>
          <TabList mb={'1em'}>
            <Tab width={'50%'}>Log In</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        
      </Box>

    </Container>
  )
};

export default Homepage;