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
      grid-template-columns: 1fr;
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
  const { workhours_edit_data } = state;

  const [userData, setUserData] = useState({
    timein: workhours_edit_data.timein,
    timeout: workhours_edit_data.timeout,
  });

  const { timein, timeout } = userData;

  const HANDLE_INPUTS = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const HANDLE_SUBMIT = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/workhours/edit", {
        _id: workhours_edit_data._id,
        timein,
        timeout,
      })
      .then((response) => {
        router.push("/workhours");
        dispatch({ type: "WORKHOURS_EDIT_DATA", payload: {} });
      })
      .catch((error) => {});
  };

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>EDIT WORK HOURS "{timein + " - " + timeout}"</span>
        </Items>

        <Items>
          <Link href="/workhours">
            <button>BACK</button>
          </Link>
        </Items>

        <Items>
          <form onSubmit={HANDLE_SUBMIT}>
            <input
              type="time"
              placeholder="Time-In"
              name="timein"
              value={timein}
              onChange={HANDLE_INPUTS}
            />
            <input
              type="time"
              placeholder="Time-Out"
              name="timeout"
              value={timeout}
              onChange={HANDLE_INPUTS}
            />
            <input type="submit" value="SUBMIT" />
          </form>
        </Items>
      </Wrapper>
    </Container>
  );
};

export default Edit;
