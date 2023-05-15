var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchContactsAsync } from "../../features/contactSlice";
import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
var ContactContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: white;\n  border-radius: 10px;\n  padding: 20px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  margin-top: 150px;\n"], ["\n  background-color: white;\n  border-radius: 10px;\n  padding: 20px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  margin-top: 150px;\n"])));
var Detail = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: 10px;\n"], ["\n  margin-bottom: 10px;\n"])));
var SingleContact = function () {
    var id = useParams().id;
    var dispatch = useDispatch();
    var contactsData = useSelector(function (state) { return state.contacts.contacts; });
    useEffect(function () {
        dispatch(fetchContactsAsync());
    }, [dispatch]);
    var contact = contactsData.find(function (contact) { return contact["Order ID"] === id; });
    return (React.createElement(ContactContainer, null, contact ? (React.createElement(React.Fragment, null,
        React.createElement(Detail, null,
            React.createElement("strong", null, "Order ID:"),
            " ",
            contact["Order ID"]),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Date:"),
            " ",
            contact.Date),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Customer:"),
            " ",
            contact.Customer),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Mail:"),
            " ",
            contact.Mail),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Telephone:"),
            " ",
            contact.Telephone),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Asunto:"),
            " ",
            contact.Asunto),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Comment:"),
            " ",
            contact.Comment),
        React.createElement(Detail, null,
            React.createElement("strong", null, "Action:"),
            " ",
            contact.Action))) : (React.createElement("p", null, "Contact not found."))));
};
export default SingleContact;
var templateObject_1, templateObject_2;
