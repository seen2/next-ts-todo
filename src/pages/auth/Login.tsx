import { Button, Input, Loading } from '@nextui-org/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HomeLogo from '../../components/HomeLogo';
import ShowMessage from '../../components/ShowMessage';
import { onLogin } from '../../redux/actionCreators/authActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { emailChange, passwordChange } from '../../redux/reducers/authReducers';
import { RootState } from '../../redux/store';

import styles from "../../styles/auth.module.css";

const Login: NextPage = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { email, password, _id, statusCode, msg, loading } = useAppSelector((state: RootState) => state.auth);
  const [message, setmessage] = useState("");


  useEffect(() => {
    if (window.localStorage.getItem("userAuthToken") && _id) {
      router.push("/todos");
    }
  }, [statusCode, msg, message,_id,router])

  const onClickLogiin = async () => {
    if (email && password) {
      await dispatch(onLogin());

    } else {
      setmessage("Email* and Password* is required")
    }
  }


  return (

    <form className={styles.auth} action=""  >
      <HomeLogo />
      <h1>Login</h1>
      <Input
        value={email || ""}
        type={"email"}
        required
        onChange={(event) => { dispatch(emailChange(event.target.value)) }}
        status="warning"
        label='E-mail*'
        style={{ width: 300 }}
        placeholder={"radheykrishna@brindavan.in"}
      />
      <Input
        value={password || ""}
        required
        type={"password"}
        onChange={(event) => { dispatch(passwordChange(event.target.value)) }}
        status="warning"
        label='Password*'
        style={{ width: 300 }}
        placeholder={"******"}
      />
      <br />
      {loading ? <Loading type="points">Please wait</Loading> : <Button onPress={() => onClickLogiin()} >Login </Button>}
      {/* <Link href={"/todos"}></Link> */}
      <div style={{ textAlign: "center", color: "grey" }}>
        <p>Don{"'"}t have a account? </p>
      </div>
      <Link href={"/auth/Register"}><Button disabled={loading || Boolean(email)}  >Sign Up</Button></Link>
      <br />
      {((msg !== "" && msg !== null) || message !== "") && <div>
        <ShowMessage statusCode={statusCode || 400} message={msg || message} />
      </div>}

    </form>

  )
}

export default Login;
