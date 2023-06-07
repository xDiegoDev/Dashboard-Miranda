import styled from "styled-components";

export const StyledTable = styled.table`
  border-radius: 20px;
  border: 2px solid white;
  color: white;
  display: block;
  margin: auto;
  font-size: 12px;
  margin-top: 200px;
  border-collapse: collapse;
  width: 70%;
  min-width: 1100px;
  letter-spacing: 1.5px;
  height: auto;

  thead {
    tr {
      border-bottom: 0.5px solid white;
      letter-spacing: 2px;
      font-weight: 900;
      font-size: 15px;
    }
  }

  tbody {
    tr:not(:last-child) {
      border-bottom: 0.5px solid white;
    }
  }

  th,
  td {
    padding: 20px;
    text-align: center;
  }

  .delete__button {
    padding: 5px 15px;
    border-radius: 10px;
    border: 1px solid white;
    background-color: #202020;
    color: white;
    /* letter-spacing: "2px"; */

    &:hover {
      border: 2px solid #202020;
      background-color: red;
      letter-spacing: "2px";
    }
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #202020;
  padding: 30px 40px;
  border-radius: 10px;
  color: white;
  border: 2px solid white;

  p {
    font-size: 15px;
  }

  .cancel__button {
    padding: 0px 10px;
    margin-top: 20px;
    background-color: #202020;
    color: white;
    border: 1px solid #414141;
    border-radius: 10px;
    &:hover {
      background-color: white;
      color: #212121;
      font-weight: bold;
    }
  }

  .confirm__delete {
    padding: 5px 10px;
    margin-top: 20px;
    background-color: #202020;
    color: white;
    border: 1px solid #414141;
    border-radius: 10px;
    &:hover {
      background-color: red;
      color: white;
      border: none;
      font-weight: bold;
    }
  }

  .pagination {
    margin-top: 50px;
  }
`;
