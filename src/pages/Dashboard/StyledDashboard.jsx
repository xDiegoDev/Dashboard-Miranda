import styled from "styled-components";

export const DashDivs = styled.div`
  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: auto;
    margin-top: 130px;
    .info__container:hover {
      width: 150px;
    }

    .info__container {
      display: flex;
      align-items: center;
      /* border: 2px solid #f0f0f0; */
      border-radius: 10px;
      color: white;
      justify-content: space-around;
      width: 120px;
      padding: 0px 0px 20px 10px;
      align-items: center;
      transition: 0.2s;
      background-color: #222;

      .icon {
        border: 3px solid #414141;
        background-color: #171717;
        padding: 5px;
        margin-right: 20px;
        border-radius: 10px;
        margin-top: 25px;
        transition: 0.1s;
        margin-right: 10px;
      }

      .icon:hover {
        background-color: white;
        color: #010101;
        padding: 10px;
      }

      .contained__info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-right: 10px;
        line-height: 0px;

        h5 {
          font-size: 20px;
          font-weight: bold;
        }

        p {
          font-size: 10px;
          color: gray;
          margin-top: 0px;
        }
      }
    }
  }

  @media (min-width: 1000px) {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: auto;
    margin-top: 130px;
    .info__container:hover {
      width: 170px;
    }

    .info__container {
      display: flex;
      align-items: center;
      /* border: 2px solid #f0f0f0; */
      border-radius: 10px;
      color: white;
      justify-content: space-around;
      width: 150px;
      padding: 0px 0px 20px 10px;
      align-items: center;
      transition: 0.2s;

      .icon {
        border: 3px solid #414141;
        background-color: #171717;
        padding: 10px;
        border-radius: 10px;
        margin-top: 25px;
        transition: 0.1s;
      }

      .icon:hover {
        background-color: white;
        color: #010101;
        padding: 14px;
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
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
    width: 92%;
    justify-content: space-between;
    margin: auto;
    margin-top: 130px;
    .info__container:hover {
      width: 220px;
    }

    .info__container {
      display: flex;
      align-items: center;
      /* border: 2px solid #f0f0f0; */
      border-radius: 10px;
      color: white;
      justify-content: space-around;
      width: 190px;
      padding: 0px 0px 20px 10px;
      align-items: center;
      transition: 0.2s;

      .icon {
        border: 3px solid #414141;
        background-color: #171717;
        padding: 10px;
        border-radius: 10px;
        margin-top: 25px;
        transition: 0.1s;
      }

      .icon:hover {
        background-color: white;
        color: #010101;
        padding: 14px;
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
  }
  @media (min-width: 1600px) {
    display: flex;
    align-items: center;
    width: 92%;
    justify-content: space-between;
    margin: auto;
    margin-top: 130px;
    .info__container:hover {
      width: 280px;
    }

    .info__container {
      display: flex;
      align-items: center;
      /* border: 2px solid #f0f0f0; */
      border-radius: 10px;
      color: white;
      justify-content: space-around;
      width: 240px;
      padding: 0px 0px 20px 10px;
      align-items: center;
      transition: 0.2s;

      .icon {
        border: 3px solid #414141;
        background-color: #171717;
        padding: 10px;
        border-radius: 10px;
        margin-top: 25px;
        transition: 0.1s;
      }

      .icon:hover {
        background-color: white;
        color: #010101;
        padding: 18px;
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
  }
  @media (min-width: 2000px) {
    display: flex;
    align-items: center;
    width: 92%;
    justify-content: space-between;
    margin: auto;
    margin-top: 130px;
    .info__container:hover {
      width: 420px;
    }

    .info__container {
      display: flex;
      align-items: center;
      border: 2px solid #f0f0f0;
      border-radius: 10px;
      color: white;
      justify-content: space-around;
      width: 380px;
      padding: 0px 0px 20px 10px;
      align-items: center;
      transition: 0.2s;

      .icon {
        border: 3px solid #414141;
        background-color: #010101;
        padding: 10px;
        border-radius: 10px;
        margin-top: 25px;
        transition: 0.1s;
      }

      .icon:hover {
        background-color: white;
        color: #010101;
        padding: 20px;
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
  }
`;

export const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  width: 750px;
  align-items: center;
  margin-left: 50px;
  margin-top: 67px;
  .booking__more {
    margin-top: 30px;
    border: none;
    background-color: transparent;
    color: white;
    letter-spacing: 2px;
    font-size: 14px;
    text-decoration: none;
    p {
      color: white;
      text-decoration: none;
    }
  }

  .booking__container {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    img {
      width: 160px;
      height: 100px;
      border-radius: 10px;
      margin-left: 30px;
    }
    div {
      margin-left: 30px;
      h2 {
        color: white;
        letter-spacing: 3px;
        margin-left: 30px;
        margin-top: 0;
      }
      .booking__container__user {
        display: flex;
        color: gray;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          border-radius: 40px;
          margin-left: 0;
        }
        p {
          margin-left: 20px;
          letter-spacing: 1.5px;
        }
      }
    }
    .booking__dates {
      position: absolute;
      right: 10px;
      border: 2px solid #e23428;
      color: white;
      letter-spacing: 1.5px;
      text-align: center;
      border-radius: 10px;
      padding: 10px;
      background: #e2342826 0% 0% no-repeat padding-box;
    }
    .booking__dates__checkin {
      position: absolute;
      right: 10px;
      border: 2px solid #135846;
      color: white;
      letter-spacing: 1.5px;
      padding: 10px 15px;
      text-align: center;
      border-radius: 10px;
      background: #13584626 0% 0% no-repeat padding-box;
    }
    .booking__dates__progress {
      position: absolute;
      right: 10px;
      border: 2px solid #fb9f44;
      color: white;
      letter-spacing: 1.5px;
      padding: 10px;
      text-align: center;
      border-radius: 10px;
      background: #fb9f4426 0% 0% no-repeat padding-box;
    }
  }
`;
