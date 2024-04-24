
import { FormControl, FormLabel, Input, VStack, Button, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [confirmpassword,setConfirmPassword]= useState();
    const [pic,setPic]= useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();


    const postDetails=(pics)=>{
      setLoading(true);
      if(pics===undefined){
          toast({
            title: 'please select an image',
            description: "error",
            status: 'warning',
            duration: 9000,
            isClosable: true,
            position:'top',
          });
          return;
      }

      if(pics.type==="image/jpeg" || pics.type==="image/png"){
        const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset","chit-chat");
        data.append("cloud_name","dbjx234by");
        fetch("https://api.cloudinary.com/v1_1/dbjx234by/image/upload",{
          method:"post",
          body:data,
        })
          .then((res)=>res.json())
          .then((data)=>{
            setPic(data.url.toString());
            setLoading(false);
          })
          .catch((err)=>{
            console.log(err);
            setLoading(false);
          });
      }else{
        toast({
          title: 'please select an image',
          description: "error",
          status: 'warning',
          duration: 9000,
          isClosable: true,
          position:'top',
        });
        setLoading(false);
        return;
      }

    };
    

    const submitHandler = async() =>{
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
          toast({
            title:"please fill all fields",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top"
          });
          setLoading(false);
          return;
        }
        if(password !== confirmpassword){
          toast({
            title:"wrong password",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"top"
          });
          return;
        }
        try{
           const config = {
            headers:{
              "Content-type":"application/json",
            }
           }

           const {data} = await axios.post("/api/user",{name,email,password,pic}, config);
           toast({
            title:"registration succesfull",
            status:"succes",
            isClosable:true,
            duration:5000,
            position:"top",
           });

           localStorage.setItem('userInfo', JSON.stringify(data));
           setLoading(false);
           history.push('/')

        }catch(error)
          {
              toast({
                title:"error",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"top",
                description: error.response.data.message,
              });
              setLoading(false);
          }
    };

    return (
      <VStack spacing={'5px'}>
        <FormControl id='first-name' >
            <FormLabel>Name<Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)}/></FormLabel>
            <FormLabel>Email<Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)}/></FormLabel>
            <FormLabel>Password<Input type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/></FormLabel>
            <FormLabel>Confirm Password<Input type='password' placeholder='Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}/></FormLabel>
            <FormLabel>Upload Your Picture<Input type='file' placeholder='Upload file' accept='image' onChange={(e)=>postDetails(e.target.files[0])}/></FormLabel>    
        </FormControl>
        <Button colorScheme='green' 
                borderColor='green.500' 
                width="100%" 
                onClick={submitHandler}
                isLoading={loading}>Signup 
        </Button>
      </VStack>
    )
}

export default Signup