import { Button, Input, Loading, Spacer } from '@nextui-org/react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AppFeature from '../../components/AppFeatureCard';
import HomeLogo from '../../components/HomeLogo';
import ShowMessage from '../../components/ShowMessage';
import { onRegister } from '../../redux/actionCreators/authActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { nameChange, emailChange, passwordChange } from '../../redux/reducers/authReducers';
import { RootState } from '../../redux/store';


import styles from "../../styles/auth.module.css";

const Register: NextPage = () => {

  const { name, email, password, _id, msg, statusCode, loading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState({ emailMessage: "", nameMessage: "", passwordMessage: "" });
  const [validInput, setValidInput] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setValidInput(validateInput());
    if (_id && window.localStorage.getItem("userAuthToken")) {
      router.push("/todos");
    }
  }, [name, email, password])

  const validateInput = () => {
    const namePattern = /\w{3,} \w{3,}/;
    const emailPattern = /\w+\@\w+\.\w+/;
    const passwordPattern = /\w{6,}/;
    const newMessage = { ...message };

    let flag = true;


    if (flag) {
      if (!namePattern.test(name + "")) {
        newMessage.nameMessage = "Name Must include three Character in First and Last Name";
        flag = false;
      } else {
        newMessage.nameMessage = "";
      }
      if (!emailPattern.test(email + "")) {
        newMessage.emailMessage = "Email should be correctly formated";
        flag = false;
      } else {
        newMessage.emailMessage = "";
      }
      if (!passwordPattern.test(password + "")) {
        newMessage.passwordMessage = "Password should be of 6 characters";
        flag = false;
      } else {
        newMessage.passwordMessage = "";
      }

    }
    // console.log("valid", flag, message)
    setMessage(newMessage);

    return flag;


  }

  const onClickCreateAccount = async () => {

    if (validInput) {
      await dispatch(onRegister());
    }


  }


  return (
    <form action="" className={styles.auth}>
      <HomeLogo />
      <h1>Create Account</h1>
      <Input
        onChange={(event) => dispatch(nameChange(event.target.value))}
        status="warning" label='Full Name'
        style={{ width: 300 }}
        required
        placeholder={"Radhey Krishna"}
        helperText={message.nameMessage}
        value={name + ""}
        helperColor={"primary"}
      />
      <Spacer y={0.9} />
      <Input
        status="warning"
        label='E-mail'
        style={{ width: 300 }}
        required
        placeholder={"radheykrishna@brindavan.in"}
        helperText={message.emailMessage}
        helperColor={"primary"}
        value={email + ""}
        onChange={(event) => dispatch(emailChange(event.target.value))}
      />
      <Spacer y={0.9} />
      <Input
        status="warning"
        label='Password'
        style={{ width: 300 }}
        required
        placeholder={"******"}
        helperText={message.passwordMessage}
        type={"password"}
        value={password + ""}
        helperColor={"primary"}
        onChange={(event) => dispatch(passwordChange(event.target.value))}
      />
      <Spacer y={0.9} />
      <br />
      {loading ? <Loading type="points">Please wait</Loading> : <Button onPress={() => onClickCreateAccount()} disabled={!validInput} >Create Account</Button>}
      <div style={{ textAlign: "center", color: "grey" }}>
        <p>Already have a account? </p>
      </div>
      <Link href={"/auth/Login"}><Button>Sign In</Button></Link>
      <Spacer y={0.9} />
      {((msg !== "" && msg !== null)) && <div>
        <ShowMessage statusCode={statusCode || 400} message={msg} />
      </div>}

      <div style={{ textAlign: "center", color: "grey" }}>
        <p>By Creating Account you are agreed to Privacy and Policy</p>
      </div>
      <AppFeature />
    </form>
  )
}

export default Register;
