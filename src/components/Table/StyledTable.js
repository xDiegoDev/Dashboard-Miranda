import styled from "styled-components";

export const StyledTable = styled.table`
  border-radius: 20px;
  border: 2px solid white;
  color: white;
  display: block;
  margin: auto;
  font-size: 14px;
  margin-top: 100px;
  border-collapse: collapse;
  width: 95%;

  thead {
    tr {
      border-bottom: 0.5px solid #b189d9;
    }
  }

  tbody {
    tr:not(:last-child) {
      border-bottom: 0.5px solid #b189d9;
    }
  }

  th,
  td {
    padding: 10px;
    text-align: center;
  }
`;
