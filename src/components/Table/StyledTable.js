import styled from "styled-components";

export const StyledTable = styled.table`
  border-radius: 20px;
  border: 2px solid white;
  color: white;
  display: block;
  margin: auto;
  font-size: 13px;
  margin-top: 250px;
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
    padding: 20px;
    text-align: center;
  }
`;
