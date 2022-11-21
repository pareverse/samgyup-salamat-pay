import { useState, useEffect, useContext } from "react";
import { Themes } from "components/themes";
import styled from "styled-components";
import Spinner from "components/spinner";
import { useRouter } from "next/router";
import { Store } from "sources/stores";
import Link from "next/link";
import axios from "axios";

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
  margin-top: 30px;
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
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  background-color: white;
  border-radius: 5px;
  max-width: 400px;
  display: grid;
  padding: 30px;
  width: 100%;

  & > span {
    text-align: center;

    &:nth-child(1) {
      color: #17c964;
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

const Attendance = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { session } = state;

  if (!session) {
    router.push("/accounts");
    return null;
  }

  const [dateState, setDateState] = useState(new Date());

  const setdate = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const date_now =
    months[setdate.getMonth()] +
    " " +
    setdate.getDate() +
    ", " +
    setdate.getFullYear();
  let time_now = setdate.getHours() + ":" + setdate.getMinutes();
  let timein_hours = "";
  let timein_minutes = "";
  let time_check = "";

  if (setdate.getHours() <= 9) {
    timein_hours = "0" + setdate.getHours();
  } else {
    timein_hours = setdate.getHours();
  }

  if (setdate.getMinutes() <= 9) {
    timein_minutes = "0" + setdate.getMinutes();
  } else {
    timein_minutes = setdate.getMinutes();
  }

  time_check = timein_hours + ":" + timein_minutes;

  const [userData, setUserData] = useState({
    attendance: "timein",
    date: date_now,
    username: session && !session.isAdmin ? session.username : "",
    timein: time_check,
    timeout: time_check,
  });
  const { attendance, date, username, timein, timeout } = userData;
  const [message, setMessage] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSuc, setShowSuc] = useState(false);

  const [useSpinner, setUseSpinner] = useState(false);

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 10);
  }, []);

  const HANDLE_INPUTS = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setShowErr(false);
  };

  const HANDLE_ERRORS = () => {
    return (
      <Message>
        <span>{message}</span>
      </Message>
    );
  };

  const HANDLE_SUCCESS = () => {
    return (
      <Message style={{ backgroundColor: "limegreen" }}>
        <span>{message}</span>
      </Message>
    );
  };

  const HANDLE_SUBMIT = async (e) => {
    e.preventDefault();

    setUseSpinner(true);

    if (!username) {
      setShowErr(true);
      setMessage("Username is required.");
      return;
    }

    if (attendance === "timein") {
      console.log("time in here");

      await axios
        .post("/api/attendance/timein", {
          date,
          username,
          time: time_check,
        })
        .then((response) => {
          setUseSpinner(false);
          setShowSuc(true);
          setMessage("You are time in as " + username);
        })
        .catch((error) => {
          if (error.response.data.usernameError) {
            setUseSpinner(false),
              setShowSuc(false),
              setShowErr(true),
              setMessage(error.response.data.usernameError);
            return;
          }

          if (error.response.data.dateError) {
            setUseSpinner(false),
              setShowSuc(false),
              setShowErr(true),
              setMessage(error.response.data.dateError);
            return;
          }
        });
    } else {
      console.log("time out here");

      await axios
        .post("/api/attendance/timeout", {
          date,
          username,
          time: time_check,
        })
        .then((response) => {
          setUseSpinner(false);
          setShowSuc(true);
          setMessage("You are time out as " + username);
        })
        .catch((error) => {
          if (error.response.data.usernameError) {
            setUseSpinner(false);
            setShowSuc(false),
              setShowErr(true),
              setMessage(error.response.data.usernameError);
            return;
          }

          if (error.response.data.dateError) {
            setUseSpinner(false);
            setShowSuc(false),
              setShowErr(true),
              setMessage(error.response.data.dateError);
            return;
          }
        });
    }
  };

  return (
    <Container>
      {useSpinner && <Spinner />}

      <Wrapper>
        <span>
          {dateState.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <span>
          {dateState.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </span>

        <Form onSubmit={HANDLE_SUBMIT}>
          <InputField>
            <select name="attendance" onChange={HANDLE_INPUTS}>
              <option value="timein">Time In</option>
              <option value="timeout">Time Out</option>
            </select>

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
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </InputField>

          <InputField>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={HANDLE_INPUTS}
              defaultValue={session && !session.isAdmin ? session.username : ""}
              readOnly={session && session.isAdmin ? false : true}
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

          {showErr && HANDLE_ERRORS()}
          {showSuc && HANDLE_SUCCESS()}

          <ButtonArea>
            <Link href="/attendance">
              <input type="button" value="Back" />
            </Link>

            <input type="submit" value="Submit" />
          </ButtonArea>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Attendance;
