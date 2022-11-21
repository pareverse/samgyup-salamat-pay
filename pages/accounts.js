import { useState, useEffect, useContext } from "react";
import { Themes } from "components/themes";
import styled from "styled-components";
import Spinner from "components/spinner";
import { Store } from "sources/stores";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

const Message = styled.div`
  background-color: ${Themes.Colors.Danger};
  grid-column: 1 / span 2;
  align-items: center;
  border-radius: 5px;
  padding: 0 15px;
  display: flex;
  height: 50px;
  width: 100%;

  span {
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const ButtonArea = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-column: 1 / span 2;
  display: grid;
  gap: 30px;

  input {
    &[type="button"],
    &[type="submit"] {
      border-radius: 4px;
      font-size: 1.3rem;
      font-weight: 500;
      height: 50px;
    }

    &[type="button"] {
      background-color: hsl(230, 100%, 98%);
    }

    &[type="submit"] {
      background-color: #17c964;
      color: hsl(0, 0%, 100%);
    }
  }
`;

const InputField = styled.div`
  outline: 1px solid hsl(230, 100%, 95%);
  grid-column: 1 / span 2;
  border-radius: 5px;
  position: relative;
  height: 50px;
  width: 100%;

  span {
    border-left: 1px solid hsl(230, 100%, 95%);
    place-items: center;
    position: absolute;
    font-size: 0.5rem;
    display: grid;
    height: 50px;
    width: 50px;
    right: 0;
    top: 0;
  }

  select {
    -webkit-appearance: none;
    position: absolute;
    cursor: pointer;
    z-index: 1;
  }

  input,
  select {
    background-color: transparent;
    padding: 0 15px;
    border: none;
    height: 50px;
    width: 100%;
  }

  input {
    padding-right: 65px;
  }
`;

const Form = styled.form`
  display: grid;

  & > * {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Wrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.1) 0 0 15px;
  background-color: white;
  border-radius: 5px;
  max-width: 400px;
  display: grid;
  padding: 30px;
  width: 100%;

  & > span {
    text-align: center;

    &:nth-child(1) {
      color: hsl(260, 100%, 50%);
      margin-bottom: 10px;
      font-size: 2.5rem;
      font-weight: 900;
    }

    &:nth-child(2) {
      color: hsl(230, 30%, 25%);
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
`;

const Container = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100%;
`;

const Accounts = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { session } = state;

  if (session) {
    router.push("/attendance");
    return null;
  }

  const [userData, setUserData] = useState({ username: "", password: "" });
  const { username, password } = userData;
  const [message, setMessage] = useState("");
  const [showUserErr, setShowUserErr] = useState(false);
  const [showPassErr, setShowPassErr] = useState(false);
  const [useSpinner, setUseSpinner] = useState(false);

  const HANDLE_INPUTS = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setShowUserErr(false);
    setShowPassErr(false);
  };

  const HANDLE_ERRORS = () => {
    return (
      <Message>
        <span>{message}</span>
      </Message>
    );
  };

  const HANDLE_SUBMIT = async (e) => {
    e.preventDefault();

    setUseSpinner(true);

    if (!username) {
      setUseSpinner(false);
      setShowUserErr(true);
      setMessage("Username is required.");
      return;
    }

    if (!password) {
      setUseSpinner(false);
      setShowPassErr(true);
      setMessage("Password is required.");
      return;
    }

    await axios
      .post("/api/accounts/signin", {
        username,
        password,
      })
      .then((response) => {
        router.push("/attendance");
        const clone_data = JSON.stringify(response.data);
        Cookies.set("SESSION", clone_data);
        dispatch({ type: "SESSION", payload: response.data });
      })
      .catch((error) => {
        if (error.response.data.usernameError) {
          setUseSpinner(false),
            setShowUserErr(true),
            setMessage(error.response.data.usernameError);
          return;
        }

        if (error.response.data.passwordError) {
          setUseSpinner(false),
            setShowPassErr(true),
            setMessage(error.response.data.passwordError);
          return;
        }
      });
  };

  return (
    <Container>
      {useSpinner && <Spinner />}

      <Wrapper>
        <Form onSubmit={HANDLE_SUBMIT}>
          <InputField>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={HANDLE_INPUTS}
            />

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </span>
          </InputField>

          {showUserErr && HANDLE_ERRORS()}

          <InputField>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={HANDLE_INPUTS}
            />

            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </span>
          </InputField>

          {showPassErr && HANDLE_ERRORS()}

          <ButtonArea>
            <span></span>

            <input type="submit" value="Continue" />
          </ButtonArea>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Accounts;
