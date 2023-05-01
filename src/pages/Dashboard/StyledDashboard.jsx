import styled from "styled-components";

export const DashDivs = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  margin-top: -400px;

  .info__container {
    display: flex;
    align-items: center;
    border: 2px solid #5a14a1;
    border-radius: 10px;
    color: white;
    justify-content: space-around;
    width: 20%;
    padding: 0px 0px 20px 10px;
    align-items: center;

    .icon {
      border: 3px solid #5a14a1;
      background-color: #9966cc;
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
