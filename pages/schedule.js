import { EditIcon, DeleteIcon } from "components/icons";
import { useState, useContext } from "react";
import { Themes } from "components/themes";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Store } from "sources/stores";
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
    border-radius: 5px;

    h5 {
      margin-bottom: 30px;
    }

    h3,
    h5 {
      display: none;
    }

    table {
      border-collapse: collapse;
      text-align: center;
      width: 100%;

      thead {
        box-shadow: rgba(149, 157, 165, 0.1) 0 0 15px;

        th {
          font-size: 1.3rem;
          font-weight: 600;
          height: 50px;
        }
      }

      tbody {
        tr {
          &:nth-child(even) {
            background-color: hsl(230, 100%, 99%);
          }
        }

        td {
          font-size: 1.15rem;
          height: 50px;

          &:last-child {
            button {
              border-radius: 4px;
              height: 30px;
              width: 30px;

              &:nth-child(1) {
                background-color: #17c964;
                margin-right: 5px;
              }

              &:nth-child(2) {
                background-color: ${Themes.Colors.Danger};
              }

              svg {
                fill: hsl(0, 0%, 100%);
                height: 16px;
              }
            }
          }

          input {
            border: none;

            &::-webkit-calendar-picker-indicator {
              display: none;
            }
          }
        }
      }
    }
  }

  @media print {
    &:nth-child(1),
    &:nth-child(2) {
      display: none;
    }

    &:nth-child(3) {
      text-align: center !important;
      border-radius: 0;
      outline: none;

      h3,
      h5 {
        display: block !important;
      }

      table {
        thead {
          box-shadow: rgba(0, 0, 0, 0) 0 0 0;
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

  @media print {
    box-shadow: rgba(0, 0, 0, 0) 0 0 0;
    background-color: transparent;
  }
`;

const Container = styled.div`
  justify-content: center;
  min-height: 100%;
  display: flex;
  padding: 30px;
  width: 100%;
`;

const Schedule = () => {
  const router = useRouter();

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR("/api/employees", fetcher, {
    refreshInterval: 1000,
  });

  const HANDLE_BUTTON = () => {
    window.print();
  };

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>SCHEDULE</span>
        </Items>

        <Items>
          <button onClick={HANDLE_BUTTON}>PRINT</button>
        </Items>

        <Items>
          <h5>EMPLOYEE SCHEDULE</h5>

          <table>
            <thead>
              <tr>
                <th>EMPLOYEE ID</th>
                <th>FULLNAME</th>
                <th>SCHEDULE</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((data) => (
                  <tr key={data._id}>
                    <td>{data.id}</td>
                    <td>
                      {data.firstname.toUpperCase() +
                        " " +
                        data.lastname.toUpperCase()}
                    </td>

                    <td>
                      <input type="time" value={data.timein} readOnly={true} />{" "}
                      -{" "}
                      <input type="time" value={data.timeout} readOnly={true} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Items>
      </Wrapper>
    </Container>
  );
};

export default Schedule;
