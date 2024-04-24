import { FormControl, FormLabel, Input, VStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";

const Login = () => {
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [confirmpassword,setConfirmPassword]= useState();
    const [pic,setPic]= useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const submitHandler = async() =>{
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
          );
    
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
         
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };

return(

    <VStack spacing={'5px'}>
        <FormControl >
            <FormLabel>Email<Input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/></FormLabel>
            <FormLabel>Password<Input placeholder='Enter Your Password'value={password} onChange={(e)=>setPassword(e.target.value)}/></FormLabel>
        </FormControl>
        <Button colorScheme='green' borderColor='green.500' width="100%" onClick={submitHandler}>Login</Button>
        <Button colorScheme='red' borderColor='red.500' width="100%" onClick={()=>{
          setEmail("guest@example.com");
          setPassword("12345678");
        }}>Forget Password</Button>
      </VStack>
    )
}
export default Login;