import { UsersIcon } from "components/icons";
import { useState, useContext } from "react";
import { Themes } from "components/themes";
import { useRouter } from "next/router";
import { Store } from "sources/stores";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

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

const Edit = () => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { employee_edit_data } = state;

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
    id: employee_edit_data.id,
    username: employee_edit_data.username,
    firstname: employee_edit_data.firstname,
    lastname: employee_edit_data.lastname,
    address: employee_edit_data.address,
    contact: employee_edit_data.contact,
    birthdate: employee_edit_data.birthdate,
    gender: employee_edit_data.gender,
    position: employee_edit_data.position,
    timein: "",
    timeout: "",
    schedule: employee_edit_data.schedule,
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
  } = userData;

  const HANDLE_INPUTS = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const HANDLE_SUBMIT = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/employees/edit", {
        _id: employee_edit_data._id,
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
      })
      .then((response) => {
        router.push("/employees");
        dispatch({ type: "EMPLOYEE_EDIT_DATA", payload: {} });
      })
      .catch((error) => {});
  };

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>EDIT EMPLOYEE #{id}</span>
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
              value={id}
              onChange={HANDLE_INPUTS}
              disabled
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={firstname}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Lastname"
              name="lastname"
              value={lastname}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="text"
              placeholder="Contact"
              name="contact"
              value={contact}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="date"
              placeholder="Birthdate"
              name="birthdate"
              value={birthdate}
              onChange={HANDLE_INPUTS}
            />

            <select name="gender" value={gender} onChange={HANDLE_INPUTS}>
              <option value="0">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select name="position" value={position} onChange={HANDLE_INPUTS}>
              <option value="0">Position</option>

              {position_list &&
                position_list.map((data) => (
                  <option value={data.position} key={data._id}>
                    {data.position}
                  </option>
                ))}
            </select>

            <select name="schedule" value={schedule} onChange={HANDLE_INPUTS}>
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
          </form>
        </Items>
      </Wrapper>
    </Container>
  );
};

export default Edit;
