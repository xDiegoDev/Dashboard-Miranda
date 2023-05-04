import styled from "styled-components";

export const BookingComp = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 50px;
  max-width: 1400px;
  .details {
    border: 1px solid #3d3d3d;
    border-radius: 10px;
    .guest {
      display: flex;
      padding: 20px 40px;
      margin-left: 10px;
      margin-right: 10px;
      img {
        width: 200px;
        border-radius: 10px;
        border: 1px solid white;
      }
      div {
        margin-left: 40px;
        .inner__div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-left: 0px;
          margin-top: 40px;

          button {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            color: white;
            font-size: 16px;
            background-color: #222;
            border: 3px solid #414141;
            border-radius: 10px;
            margin-left: 20px;
            p {
              margin-left: 20px;
              color: white;
              margin: 0px 0px 0px 20px;
            }
          }
        }
      }
      h2 {
        color: white;
        letter-spacing: 1.5px;
        font-size: 29px;
      }

      p {
        font-size: 14px;
        color: #707070;
      }
    }
    .checks {
      display: flex;
      width: 75%;
      justify-content: space-around;
      color: #707070;
      strong {
        color: white;
      }
    }

    .line {
      div {
        display: block;
        margin: auto;
        width: 90%;
        height: 1px;
        background-color: gray;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
    .room_details {
      .info__price {
        display: flex;
        width: 75%;
        justify-content: space-around;
        margin-left: -5%;
        color: #707070;
        strong {
          font-size: 20px;
          color: white;
        }
      }
      .text {
        color: white;
        padding: 20px 35px;
      }
    }

    .facilities__div {
      p {
        margin-left: 40px;
        color: #707070;
        font-weight: bold;
        font-size: 18px;
      }
      .facilities {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 40px;

        div {
          border: 1px solid white;
          color: white;
          border-radius: 3px;
          padding: 10px;
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
`;

export const BookingSlider = styled.div`
  width: 50%;
`;

export const Ribbon = styled.div`
  position: absolute;
  top: 30px;
  right: -40px;
  padding: 5px 53px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color || "#333"};
  z-index: 100;
  transform: rotate(45deg);
`;
