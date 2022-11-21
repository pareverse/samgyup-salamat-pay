import {
  GridIcon,
  CalendarIcon,
  UsersIcon,
  FileRemoveIcon,
  BriefcaseIcon,
  FileTextIcon,
  ClockIcon,
  SettingsIcon,
  PowerOffIcon,
  LogoutIcon,
} from "components/icons";
import { Themes } from "components/themes";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useContext } from "react";
import { Store } from "sources/stores";
import Link from "next/link";
import Cookies from "js-cookie";

const Button = styled.div`
  background-color: ${({ pathname, href }) =>
    pathname === href ? "hsl(230, 100%, 99%)" : "transparent"};
  color: ${({ pathname, href }) =>
    pathname === href ? "#17C964" : "hsl(230, 100%, 80%)"};
  border-right: ${({ pathname, href }) =>
    pathname === href && "3px solid #17C964"};
  transition: 0.3s background-color color;
  align-items: center;
  padding: 0 30px;
  cursor: pointer;
  display: flex;
  height: 50px;
  width: 100%;
  gap: 15px;

  svg {
    fill: ${({ pathname, href }) =>
      pathname === href ? "#17C964" : "hsl(230, 100%, 80%)"};
    transition: 0.3s;
    height: 24px;
  }

  span {
    margin-left: ${({ pathname, href }) => pathname === href && "8px"};
    font-weight: ${({ pathname, href }) => pathname === href && "600"};
    font-size: 1.3rem;
    transition: 0.3s;
  }

  &:hover {
    background-color: hsl(230, 100%, 99%);
    color: #17c964;

    span {
      margin-left: 8px;
      font-weight: 600;
    }

    svg {
      fill: #17c964;
    }
  }
`;

const Items = styled.div`
  gap: 15px;
`;

const Container = styled.div`
  left: ${(props) => (props.useSide ? "0" : "-300px")};
  background-color: hsl(0, 0%, 100%);
  grid-template-rows: auto 1fr auto;
  transition: 0.5s;
  position: fixed;
  display: grid;
  height: 100%;
  width: 300px;
  z-index: 10;

  ${Items} {
    &:nth-child(1) {
      padding: 15px 30px;

      div {
        border-radius: 10px;
        height: 100px;
      }
    }

    &:nth-child(2) {
      overflow-y: scroll;
    }

    &:nth-child(3) {
    }
  }

  @media (${Themes.Device.Laptop}) {
    left: ${(props) => (props.useSide ? "0" : "-250px")};
    height: 100%;
    width: 250px;
    top: 0;

    ${Items} {
      &:nth-child(1) {
        div {
          height: 50px;
        }
      }
    }
  }

  @media print {
    display: none !important;
  }
`;

const Sidebar = ({ useSide }) => {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { session } = state;

  const HANDLE_SIGNOUT = () => {
    router.push("/accounts");
    Cookies.remove("SESSION");
    dispatch({ type: "SESSION", payload: null });
  };

  return (
    <Container useSide={useSide}>
      <Items>
        <div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="48" height="48" rx="24" fill="#00CC66" />
            <path
              d="M32.24 24.24C33.3658 23.1141 33.9983 21.5872 33.9983 19.995C33.9983 18.4028 33.3658 16.8758 32.24 15.75C31.1142 14.6241 29.5872 13.9916 27.995 13.9916C26.4028 13.9916 24.8758 14.6241 23.75 15.75L17 22.5V31H25.5L32.24 24.24Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M28 20L14 34"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.5 27H21"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </Items>

      {session && session.isAdmin ? (
        <Items>
          <Link href="/attendance" passHref>
            <Button pathname={router.pathname}>
              <CalendarIcon />

              <span>Attendance</span>
            </Button>
          </Link>

          <Link href="/employees" passHref>
            <Button pathname={router.pathname}>
              <UsersIcon />

              <span>Employees</span>
            </Button>
          </Link>

          <Link href="/positions" passHref>
            <Button pathname={router.pathname}>
              <BriefcaseIcon />

              <span>Positions</span>
            </Button>
          </Link>

          <Link href="/workhours" passHref>
            <Button pathname={router.pathname}>
              <ClockIcon />

              <span>Work Hours</span>
            </Button>
          </Link>

          <Link href="/payroll" passHref>
            <Button pathname={router.pathname}>
              <FileTextIcon />

              <span>Payroll</span>
            </Button>
          </Link>

          <Link href="/deduction" passHref>
            <Button pathname={router.pathname}>
              <FileRemoveIcon />

              <span>Deduction</span>
            </Button>
          </Link>

          <Link href="/schedule" passHref>
            <Button pathname={router.pathname}>
              <CalendarIcon />

              <span>Schedule</span>
            </Button>
          </Link>
        </Items>
      ) : (
        <Items>
          <Link href="/attendance" passHref>
            <Button pathname={router.pathname}>
              <CalendarIcon />

              <span>Attendance</span>
            </Button>
          </Link>

          <Link href="/payroll" passHref>
            <Button pathname={router.pathname}>
              <FileTextIcon />

              <span>Payroll</span>
            </Button>
          </Link>
        </Items>
      )}

      <Items>
        <Button pathname={router.pathname} onClick={HANDLE_SIGNOUT}>
          <LogoutIcon />

          <span>Sign Out</span>
        </Button>
      </Items>
    </Container>
  );
};

export default Sidebar;
