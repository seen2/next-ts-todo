import AuthBar from './AuthBar';
import AppFeatureCard from './AppFeatureCard';
import HomeLogo from './HomeLogo';



import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import ShowMessage from './ShowMessage';
import { useEffect, useState } from 'react';
import { Image, Text } from '@nextui-org/react';

import styles from "../styles/components.module.css";

const DynamicClock = dynamic(() => import('./Clock'), {
  ssr: false,
})



const HomeView = () => {

  const [users,setUsers]=useState([]);

  useEffect(()=>{
    const fetchUser=async ()=>{
      const result=await fetch("/api/users");
      const {names}=await result.json() ||{names:[]};
      setUsers(names.sort());
    }
    
    fetchUser();
    return ()=>{
    }
  },[])

  const { statusCode, msg } = useAppSelector((state: RootState) => state.auth);

  return (
    <div >
      <HomeLogo />
      {statusCode !== 200 && <ShowMessage message={"Success"} statusCode={statusCode || 200} />}
      <AuthBar />
      <AppFeatureCard />
      <DynamicClock />
      <div style={{display:"flex",justifyContent:"center",color:"white",alignItems:"center"}} >
      <a href="https://github.com/seen2/next-ts-todo">
        Find Source Code at: <Text size={"xl"} color="success" >{"<Code></Code>"}</Text>
        <Image src='https://img.icons8.com/ios-glyphs/452/github.png' alt='source code' height={"50px"} width={"50px"} /> 
      </a>
      
      </div>
      <div 
      className={
        styles.card
      }
        >
        {users.map((user,i)=><Text color='white' size={"30px"} key={i} >{i+1}. {user}, Thank You for Using.</Text>)}
      </div>
    </div>

  )
}



export default HomeView;