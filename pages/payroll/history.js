import { EyeIcon } from "components/icons";
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
                fill: white;
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

  &:nth-child(4) {
    grid-column: 1 / span 2;

    span {
      background-color: ${Themes.Colors.Danger};
      grid-template-columns: 1fr auto auto;
      align-items: center;
      border-radius: 5px;
      padding: 0 15px;
      display: grid;
      height: 50px;
      gap: 15px;

      p {
        color: hsl(0, 0%, 100%);
        font-size: 1.3rem;
        font-weight: 500;
      }

      button {
        background-color: transparent;
        color: hsl(0, 0%, 100%);
        border-radius: 5px;
        font-size: 1.3rem;
        font-weight: 500;
        padding: 0 15px;
        height: 30px;

        &:nth-child(3) {
          border: 2px solid hsl(0, 0%, 100%);
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  box-shadow: rgba(149, 157, 165, 0.1) 0 0 15px;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  background-color: white;
  border-radius: 5px;
  max-width: 1366px;
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

const History = () => {
  const router = useRouter();

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error: employee_error } = useSWR("/api/payroll", fetcher, {
    refreshInterval: 1000,
  });

  const { state, dispatch } = useContext(Store);
  const { session } = state;

  if (!session) {
    router.push("/accounts");
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>HISTORY</span>
        </Items>

        <Items>
          <Link href="/payroll">
            <button>BACK</button>
          </Link>
        </Items>

        <Items>
          <table>
            <thead>
              <tr>
                <th>DATE</th>
                {session && session.isAdmin && <th>EMPLOYEE ID</th>}
                <th>FULLNAME</th>
                <th>POSITION</th>
                <th>RATE</th>
                <th>WORK HOURS</th>
                <th>OVERTIME</th>
                <th>GROSS</th>
                <th>DEDUCTION</th>
                <th>NETPAY</th>
              </tr>
            </thead>

            {session && session.isAdmin ? (
              <tbody>
                {data &&
                  data.map((data) => (
                    <tr key={data._id}>
                      <td style={{ fontSize: ".8rem" }}>{data.date}</td>
                      <td>{data.id}</td>
                      <td>{data.fullname.toUpperCase()}</td>
                      <td>{data.position.toUpperCase()}</td>
                      <td>{data.rate}</td>
                      <td>{data.hours}</td>
                      <td>{data.overtime}</td>
                      <td>{data.gross}</td>
                      <td>{data.deduction}</td>
                      <td>{data.netpay}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <tbody>
                {data &&
                  data.map(
                    (data) =>
                      session &&
                      session.username === data.username && (
                        <tr key={data._id}>
                          <td style={{ fontSize: ".8rem" }}>{data.date}</td>
                          <td>{data.fullname.toUpperCase()}</td>
                          <td>{data.position.toUpperCase()}</td>
                          <td>{data.rate}</td>
                          <td>{data.hours}</td>
                          <td>{data.overtime}</td>
                          <td>{data.gross}</td>
                          <td>{data.deduction}</td>
                          <td>{data.netpay}</td>
                        </tr>
                      )
                  )}
              </tbody>
            )}
          </table>
        </Items>
      </Wrapper>
    </Container>
  );
};

export default History;
