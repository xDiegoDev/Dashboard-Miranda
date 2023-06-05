import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../features/contactSlice";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Arrow = ({ direction, onClick }) => {
  const styles = {
    position: "absolute",
    zIndex: 2,
    top: direction === "left" ? "32%" : "35%",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    marginLeft: direction === "left" ? "-7%" : "102%",
  };

  const transform = direction === "left" ? "rotate(180deg)" : "rotate(0deg)";

  return (
    <div style={{ ...styles, transform }} onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const Card = styled.div`
  background-color: #212121;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 0px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 200px;
  color: white;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 20px;
`;

const Comment = styled.div`
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <Arrow direction="right" />,
  prevArrow: <Arrow direction="left" />,
};

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const CardWrapper = styled.div`
  margin-left: 0px;
`;

export const ContactSlider = () => {
  const contactsData = useSelector((state) => state.contacts.contacts);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/contacts/${id}`);
  };
  return (
    <div
      style={{
        margin: "auto",
        marginTop: "150px",
        borderRadius: "10px",
        width: "82%",
      }}
    >
      <h2 style={{ marginLeft: "0", marginBottom: "30px", color: "white" }}>
        Latest Reviews by Customers
      </h2>
      {Array.isArray(contactsData) && (
        <SliderContainer>
          <Slider {...SliderSettings} style={{}}>
            {contactsData.map((contact) => (
              <CardWrapper>
                <Card
                  key={contact["Order ID"]}
                  onClick={() => handleCardClick(contact["Order ID"])}
                  style={{ marginRight: "20px", padding: "20px" }}
                >
                  <Comment
                    style={{ marginRight: "10px", marginBottom: "40px" }}
                  >
                    {contact.Comment}
                  </Comment>
                  <CustomerInfo>
                    <Img
                      src={contact.IMG}
                      alt="customer-avatar"
                      style={{ marginRight: "50px" }}
                    />
                    <div>
                      <div>{contact.Customer}</div>
                      <div style={{ marginRight: "20px" }}>{contact.Date}</div>
                    </div>
                  </CustomerInfo>
                </Card>
              </CardWrapper>
            ))}
          </Slider>
        </SliderContainer>
      )}
    </div>
  );
};

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contacts.contacts);
  const [filter, setFilter] = useState("all");

  const filterData = (data) => {
    return data.filter((row) => {
      if (filter === "all") return true;
      if (filter === "published") return row.Action === "Archive";
      if (filter === "archived") return row.Action == "Publish";
      return false;
    });
  };

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  return (
    <div style={{ marginBottom: "100px" }}>
      <ContactSlider />
      <div
        style={{
          marginLeft: "69%",
          marginTop: "50px",
          marginBottom: "-150px",
          color: "white",
        }}
      >
        <label htmlFor="action-filter" style={{ fontSize: "20px" }}>
          Filter by action:
        </label>
        <select
          id="action-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            marginLeft: "18px",
            padding: "10px 20px",
            color: "white",
            borderRadius: "10px",
            background: "#212121",
            fontSize: "15px",
          }}
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      {Array.isArray(contactsData) ? (
        <Table initialData={filterData(contactsData)} route="contacts" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Contact;
