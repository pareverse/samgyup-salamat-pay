import { UsersIcon } from "components/icons";
import { useState, useContext } from "react";
import { Themes } from "components/themes";
import { useRouter } from "next/router";
import { Store } from "sources/stores";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

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

const Items = styled.div`
  &:nth-child(1) {
    align-items: center;
    display: flex;

    span {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  &:nth-child(2) {
    button {
      background-color: #17c964;
      color: hsl(0, 0%, 100%);
      border-radius: 4px;
      font-size: 1.3rem;
      font-weight: 500;
      padding: 0 30px;
      height: 40px;
    }
  }

  &:nth-child(3) {
    outline: 1px solid hsl(230, 100%, 95%);
    grid-column: 1 / span 2;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    padding: 30px;
    display: grid;

    form {
      grid-template-columns: 1fr 1fr;
      max-width: auto;
      display: grid;
      width: 100%;
      gap: 30px;

      input,
      select {
        outline: 1px solid hsl(230, 100%, 95%);
        border-radius: 4px;
        padding: 0 15px;
        border: none;
        height: 50px;
      }

      input {
        &:first-child {
          font-weight: 600;
        }

        &[type="submit"] {
          background-color: #17c964;
          color: hsl(0, 0%, 100%);
          grid-column: 2;
          outline: none;
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.1) 0 0 15px;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  background-color: white;
  border-radius: 5px;
  max-width: 1166px;
  min-height: 100%;
  padding: 30px;
  display: grid;
  width: 100%;
  gap: 30px;
`;

const Container = styled.div`
  justify-content: center;
  min-height: 100%;
  display: flex;
  padding: 30px;
  width: 100%;
`;

const Add = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { employee_generate_id } = state;

  if (employee_generate_id === "") {
    router.push("/employees");
    return null;
  }

  const date = new Date();
  const name = [
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
    name[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data: position_list, error: position_list_error } = useSWR(
    "/api/positions",
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: workhours_list, error: workhours_list_error } = useSWR(
    "/api/workhours",
    fetcher,
    { refreshInterval: 1000 }
  );

  const [userData, setUserData] = useState({
    id: employee_generate_id,
    username: "",
    firstname: "",
    lastname: "",
    address: "",
    birthdate: "",
    contact: "",
    gender: "",
    position: "",
    timein: "",
    timeout: "",
    schedule: "",
    joined: date_now.toString(),
  });
  const {
    id,
    username,
    firstname,
    lastname,
    address,
    birthdate,
    contact,
    gender,
    position,
    timein,
    timeout,
    schedule,
    joined,
  } = userData;

  const [message, setMessage] = useState("");
  const [showUserErr, setShowUserErr] = useState(false);

  const HANDLE_INPUTS = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setShowUserErr(false);
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

    if (!username) {
      setShowUserErr(true), setMessage("Username is required.");
      return;
    }

    if (!firstname) {
      setShowUserErr(true), setMessage("Firstname is required.");
      return;
    }

    if (!lastname) {
      setShowUserErr(true), setMessage("Lastname is required.");
      return;
    }

    if (!address) {
      setShowUserErr(true), setMessage("Address is required.");
      return;
    }

    if (!contact) {
      setShowUserErr(true), setMessage("Contact is required.");
      return;
    }

    if (!birthdate) {
      setShowUserErr(true), setMessage("Birthdate is required.");
      return;
    }

    if (!gender) {
      setShowUserErr(true), setMessage("Gender is required.");
      return;
    }

    if (!position) {
      setShowUserErr(true), setMessage("Position is required.");
      return;
    }

    if (!schedule) {
      setShowUserErr(true), setMessage("Schedule is required.");
      return;
    }

    await axios
      .post("/api/employees/add", {
        id,
        username,
        firstname,
        lastname,
        address,
        contact,
        birthdate,
        gender,
        position,
        timein: schedule.slice(0, 5),
        timeout: schedule.slice(8, 13),
        schedule,
        joined,
      })
      .then((response) => {
        router.push("/employees");
        dispatch({ type: "EMPLOYEE_GENERATE_ID", payload: "" });
      })
      .catch((error) => {
        if (error.response.data.usernameError) {
          setShowUserErr(true), setMessage(error.response.data.usernameError);
          return;
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>ADD NEW EMPLOYEE</span>
        </Items>

        <Items>
          <Link href="/employees">
            <button>BACK</button>
          </Link>
        </Items>

        <Items>
          <form onSubmit={HANDLE_SUBMIT}>
            <input
              type="text"
              name="id"
              value={employee_generate_id}
              onChange={HANDLE_INPUTS}
              disabled
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Contact"
              name="contact"
              onChange={HANDLE_INPUTS}
            />
            <input
              type="date"
              placeholder="Birthdate"
              name="birthdate"
              onChange={HANDLE_INPUTS}
            />

            <select name="gender" onChange={HANDLE_INPUTS}>
              <option value="0">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select name="position" onChange={HANDLE_INPUTS}>
              <option value="0">Position</option>

              {position_list &&
                position_list.map((data) => (
                  <option value={data.position} key={data._id}>
                    {data.position}
                  </option>
                ))}
            </select>

            <select name="schedule" onChange={HANDLE_INPUTS}>
              <option value="0">Work Hours</option>

              {workhours_list &&
                workhours_list.map((data) => (
                  <option
                    value={data.timein + " - " + data.timeout}
                    key={data._id}
                  >
                    {data.timein + " - " + data.timeout}
                  </option>
                ))}
            </select>

            <input type="submit" value="SUBMIT" />

            {showUserErr && HANDLE_ERRORS()}
          </form>
        </Items>
      </Wrapper>
    </Container>
  );
};

export default Add;
