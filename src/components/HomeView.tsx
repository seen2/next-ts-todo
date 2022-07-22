import AuthBar from './AuthBar';
import AppFeatureCard from './AppFeatureCard';
import HomeLogo from './HomeLogo';



import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import ShowMessage from './ShowMessage';
import { setLoading, setMsg, setStatusCode } from '../redux/reducers/authReducers';
import { useEffect } from 'react';

const DynamicClock = dynamic(() => import('./Clock'), {
  ssr: false,
})

const HomeView = () => {

  const { statusCode, msg } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {


    return () => {
      setTimeout(() => {
        dispatch(setMsg(""));
        dispatch(setStatusCode(200))

      }, 3000);

    }
  }, [])


  return (
    <div >
      <HomeLogo />
      {statusCode !== 200 && <ShowMessage message={msg + ""} statusCode={statusCode || 200} />}
      <AuthBar />
      <AppFeatureCard />
      <DynamicClock />
    </div>

  )
}



export default HomeView;