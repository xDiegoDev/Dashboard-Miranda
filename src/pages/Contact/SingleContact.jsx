import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../features/contactSlice";
import styled from "styled-components";

const ContactContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 150px;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const SingleContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contactsData = useSelector((state) => state.contacts.contacts);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  const contact = contactsData.find((contact) => contact["Order ID"] === id);

  return (
    <ContactContainer>
      {contact ? (
        <>
          <Detail>
            <strong>Order ID:</strong> {contact["Order ID"]}
          </Detail>
          <Detail>
            <strong>Date:</strong> {contact.Date}
          </Detail>
          <Detail>
            <strong>Customer:</strong> {contact.Customer}
          </Detail>
          <Detail>
            <strong>Mail:</strong> {contact.Mail}
          </Detail>
          <Detail>
            <strong>Telephone:</strong> {contact.Telephone}
          </Detail>
          <Detail>
            <strong>Asunto:</strong> {contact.Asunto}
          </Detail>
          <Detail>
            <strong>Comment:</strong> {contact.Comment}
          </Detail>
          <Detail>
            <strong>Action:</strong> {contact.Action}
          </Detail>
        </>
      ) : (
        <p>Contact not found.</p>
      )}
    </ContactContainer>
  );
};

export default SingleContact;
