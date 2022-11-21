import { Menu2Icon } from "components/icons";
import styled from "styled-components";

const Icons = styled.div`
  place-items: center;
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
  display: grid;
  height: 40px;
  width: 40px;

  svg {
    fill: hsl(230, 100%, 80%);
    height: 24px;
  }

  img {
    border: 3px solid hsl(230, 100%, 98%);
    border-radius: 50%;
    object-fit: cover;
    height: 40px;
    width: 40px;
  }

  &:hover {
    background-color: hsl(230, 100%, 99%);
  }
`;

const Container = styled.div`
  background-color: hsl(0, 0%, 100%);
  justify-content: space-between;
  align-items: center;
  position: sticky;
  padding: 0 30px;
  display: flex;
  width: 100%;
  z-index: 9;
  top: 0;

  @media print {
    display: none !important;
  }
`;

const Headers = ({ HANDLE_SIDEBAR }) => {
  return (
    <Container>
      <Icons onClick={HANDLE_SIDEBAR}>
        <Menu2Icon />
      </Icons>

      <h2>Samgyup Salamat Pay</h2>
    </Container>
  );
};

export default Headers;
