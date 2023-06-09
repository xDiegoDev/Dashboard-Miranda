import styled from "styled-components";

export const DashDivs = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: space-around;
  margin: auto;
  margin-top: 130px;

  .info__container {
    display: flex;
    align-items: center;
    border: 2px solid #f0f0f0;
    border-radius: 10px;
    color: white;
    justify-content: space-around;
    width: 20%;
    padding: 0px 0px 20px 10px;
    align-items: center;

    .icon {
      border: 3px solid #414141;
      background-color: #010101;
      padding: 10px;
      border-radius: 10px;
      margin-top: 25px;
    }

    .contained__info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-right: 30px;
      line-height: 0px;

      h5 {
        font-size: 25px;
        font-weight: bold;
      }

      p {
        font-size: 12px;
        color: gray;
        margin-top: 0px;
      }
    }
  }
`;
