import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../features/contactSlice";
import styled from "styled-components";

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 20px;
  margin-top: 200px;
`;

const Contact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const handleRowClick = (id) => {
    navigate(`/contacts/${id}`);
  };

  const handleCardClick = (id) => {
    navigate(`/contacts/${id}`);
  };

  return (
    <div>
      {Array.isArray(contactsData) && (
        <CardsContainer>
          {contactsData.map((contact) => (
            <Card
              key={contact["Order ID"]}
              onClick={() => handleCardClick(contact["Order ID"])}
            >
              <div>Customer: {contact.Customer}</div>
              <div>Asunto: {contact.Asunto}</div>
              <div>Comment: {contact.Comment}</div>
            </Card>
          ))}
        </CardsContainer>
      )}
      {Array.isArray(contactsData) ? (
        <Table
          initialData={contactsData}
          onRowClick={handleRowClick}
          route="contacts"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Contact;
