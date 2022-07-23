import AuthBar from './AuthBar';
import AppFeatureCard from './AppFeatureCard';
import HomeLogo from './HomeLogo';



import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import ShowMessage from './ShowMessage';
import { setLoading, setMsg, setStatusCode } from '../redux/reducers/authReducers';
import { useEffect } from 'react';
import { Image, Text } from '@nextui-org/react';

const DynamicClock = dynamic(() => import('./Clock'), {
  ssr: false,
})

const HomeView = () => {

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
    </div>

  )
}



export default HomeView;