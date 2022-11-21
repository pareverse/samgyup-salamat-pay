import { EditIcon, DeleteIcon } from "components/icons";
import { useState, useContext } from "react";
import { Themes } from "components/themes";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Store } from "sources/stores";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";

const Papers = styled.div`
  display: grid;
  width: 100%;
  gap: 50px;

  div {
    span {
      font-size: 1.3rem;
    }
  }

  & > div {
    &:nth-child(1) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(4, auto);
      display: grid;
      gap: 15px;

      & > *:nth-child(1) {
        grid-column: 1;
      }

      & > *:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
      }

      & > *:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
      }

      & > *:nth-child(4) {
        grid-column: 1;
        grid-row: 3;
      }

      & > *:nth-child(5) {
        grid-column: 2;
        grid-row: 3;
      }

      & > *:nth-child(6) {
        grid-column: 1;
        grid-row: 4;
      }

      & > *:nth-child(7) {
        grid-column: 2;
        grid-row: 4;
      }
    }

    &:nth-child(2) {
      grid-template-columns: 1fr 1fr;
      display: grid;
      gap: 15px;

      & > *:nth-child(1) {
      }
    }

    &:nth-child(3) {
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
    display: flex;
    gap: 30px;

    button {
      background-color: ${Themes.Colors.Primary};
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
    padding: 30px;

    h5 {
      margin-bottom: 30px;
    }

    h3,
    h5 {
      display: none;
    }
  }

  @media print {
    &:nth-child(1),
    &:nth-child(2) {
      display: none;
    }

    &:nth-child(3) {
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

const View = () => {
  const router = useRouter();

  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data: employee, error: emplyee_error } = useSWR(
    "/api/employees",
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: position, error: position_error } = useSWR(
    "/api/positions",
    fetcher,
    { refreshInterval: 1000 }
  );
  const { data: deduction, error: deduction_error } = useSWR(
    "/api/deduction",
    fetcher,
    { refreshInterval: 1000 }
  );

  const { state, dispatch } = useContext(Store);
  const { session, payroll_view_id } = state;

  if (!payroll_view_id) {
    router.push("/payroll");
    return null;
  }

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

  let rate = 0;
  let hours = 0;
  let overtime = 0;
  let gross = 0;
  let deduc = 0;
  let netpay = 0;

  const HANDLE_RATE = (rates) => {
    rate = rates;
  };

  const HANDLE_HOURS = (set_hours) => {
    hours = set_hours;
  };

  const HANDLE_OVERTIME = (set_overtime) => {
    overtime = set_overtime;

    gross = rate * (hours + overtime);
  };

  const HANDLE_DEDUCTION = (ded) => {
    deduc = deduc + ded;

    netpay = rate * (hours + overtime) - deduc;
  };

  const HANDLE_BUTTON = () => {
    window.print();
  };

  const HANDLE_PAY = async (
    datestart,
    datenow,
    id,
    username,
    firstname,
    lastname,
    position,
    rate,
    hours,
    overtime,
    gross,
    deducs,
    netpay
  ) => {
    let date = datestart + " - " + datenow;
    let fullname = firstname + " " + lastname;

    await axios
      .post("/api/payroll/pay", {
        date,
        id,
        username,
        fullname,
        position,
        rate,
        hours,
        overtime,
        gross,
        deducs,
        netpay,
      })
      .then((response) => {
        router.push("/payroll");
        dispatch({ type: "PAYROLL_VIEW_ID", payload: "" });
      });
  };

  return (
    <Container>
      <Wrapper>
        <Items>
          <span>SCHEDULE</span>
        </Items>

        <Items>
          <button onClick={HANDLE_BUTTON}>PRINT</button>
          <button
            onClick={() => dispatch({ type: "PAYROLL_VIEW_ID", payload: "" })}
          >
            BACK
          </button>
        </Items>

        <Items>
          {employee &&
            employee.map(
              (emp) =>
                payroll_view_id &&
                payroll_view_id === emp._id && (
                  <Papers key={emp._id}>
                    <div>
                      <span style={{ fontWeight: "600" }}>
                        {emp.datestart} - {date_now}
                      </span>
                      <span style={{ fontWeight: "600" }}>Employee ID</span>
                      <span>{emp.id}</span>
                      <span style={{ fontWeight: "600" }}>Fullname</span>
                      <span>
                        {emp.firstname.toUpperCase() +
                          " " +
                          emp.lastname.toUpperCase()}
                      </span>
                      <span style={{ fontWeight: "600" }}>Position</span>
                      <span>{emp.position.toUpperCase()}</span>
                    </div>

                    <div>
                      <span style={{ fontWeight: "600" }}>RATE PER HOUR</span>
                      <span>
                        {position &&
                          position.map(
                            (pos) =>
                              emp.position === pos.position &&
                              HANDLE_RATE(pos.rate)
                          )}

                        {rate}
                      </span>
                      <span style={{ fontWeight: "600" }}>HOURS WORK</span>
                      <span>
                        {HANDLE_HOURS(emp.total_hours)}

                        {hours}
                      </span>

                      <span style={{ fontWeight: "600" }}>OVERTIME</span>
                      <span>
                        {HANDLE_OVERTIME(emp.total_overtime)}

                        {overtime}
                      </span>

                      <span style={{ fontWeight: "600" }}>GROSS</span>
                      <span>{gross}</span>

                      <span style={{ fontWeight: "600" }}>DEDUCTION</span>
                      <span>
                        {deduction &&
                          deduction.map((ded) => HANDLE_DEDUCTION(ded.amount))}
                        - {deduc}
                      </span>
                      <span style={{ fontWeight: "600" }}>NET PAY</span>
                      <span>{netpay}</span>
                    </div>

                    {session && session.isAdmin && (
                      <div>
                        <button
                          onClick={() =>
                            HANDLE_PAY(
                              emp.datestart,
                              date_now,
                              emp.id,
                              emp.username,
                              emp.firstname,
                              emp.lastname,
                              emp.position,
                              rate,
                              hours,
                              overtime,
                              gross,
                              deduc,
                              netpay
                            )
                          }
                        >
                          PAY
                        </button>
                      </div>
                    )}
                  </Papers>
                )
            )}
        </Items>
      </Wrapper>
    </Container>
  );
};

export default View;
