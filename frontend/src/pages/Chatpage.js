import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MyChats from "../Components/miscellaneous/MyChats";
import ChatBox from "../Components/miscellaneous/ChatBox";

const Chatpage = () => {
const { user }= ChatState();
const [fetchAgain, setFetchAgain] = useState(false)

 return(
  <div style={{width:"100%"}}>
    {user && <SideDrawer/>}
    <Box display={"flex"}
    justifyContent={"space-between"}
    w={"100%"}
    h={"91.5vh"}
    p={"10px"}>
      {user && <MyChats fetchAgain = {fetchAgain}/>}
      {user && <ChatBox fetchAgain = {fetchAgain}/>}
    </Box>
  </div>
 )
};

export default Chatpage;
