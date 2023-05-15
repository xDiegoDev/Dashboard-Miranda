var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Arrow = function (_a) {
    var direction = _a.direction, onClick = _a.onClick;
    var styles = {
        position: "absolute",
        zIndex: 2,
        top: direction === "left" ? "32%" : "35%",
        cursor: "pointer",
        fontSize: "3rem",
        color: "white",
        marginLeft: direction === "left" ? "-7%" : "102%",
    };
    var transform = direction === "left" ? "rotate(180deg)" : "rotate(0deg)";
    return (React.createElement("div", { style: __assign(__assign({}, styles), { transform: transform }), onClick: onClick },
        React.createElement(FaChevronRight, null)));
};
var Card = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: #212121;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 0px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  height: 200px;\n  color: white;\n"], ["\n  background-color: #212121;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 0px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n  height: 200px;\n  color: white;\n"])));
var SliderContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 1100px;\n  margin: auto;\n  margin-bottom: 20px;\n  border-radius: 20px;\n"], ["\n  width: 1100px;\n  margin: auto;\n  margin-bottom: 20px;\n  border-radius: 20px;\n"])));
var Comment = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-grow: 1;\n  display: -webkit-box;\n  -webkit-line-clamp: 4;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin-bottom: 10px;\n"], ["\n  flex-grow: 1;\n  display: -webkit-box;\n  -webkit-line-clamp: 4;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  margin-bottom: 10px;\n"])));
var CustomerInfo = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var SliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: React.createElement(Arrow, { direction: "right" }),
    prevArrow: React.createElement(Arrow, { direction: "left" }),
};
var Img = styled.img(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  margin-right: 10px;\n"], ["\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  margin-right: 10px;\n"])));
var CardWrapper = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-left: 10px;\n"], ["\n  margin-left: 10px;\n"])));
export var ContactSlider = function () {
    var contactsData = useSelector(function (state) { return state.contacts.contacts; });
    var navigate = useNavigate();
    var handleCardClick = function (id) {
        navigate("/contacts/".concat(id));
    };
    return (React.createElement("div", { style: {
            margin: "auto",
            marginTop: "150px",
            borderRadius: "10px",
            width: "80%",
        } },
        React.createElement("h2", { style: { marginLeft: "8%", marginBottom: "30px", color: "white" } }, "Latest Reviews by Customers"),
        Array.isArray(contactsData) && (React.createElement(SliderContainer, null,
            React.createElement(Slider, __assign({}, SliderSettings, { style: {} }), contactsData.map(function (contact) { return (React.createElement(CardWrapper, null,
                React.createElement(Card, { key: contact["Order ID"], onClick: function () { return handleCardClick(contact["Order ID"]); }, style: { marginRight: "20px", padding: "20px" } },
                    React.createElement(Comment, { style: { marginRight: "10px", marginBottom: "40px" } }, contact.Comment),
                    React.createElement(CustomerInfo, null,
                        React.createElement(Img, { src: contact.IMG, alt: "customer-avatar", style: { marginRight: "50px" } }),
                        React.createElement("div", null,
                            React.createElement("div", null, contact.Customer),
                            React.createElement("div", { style: { marginRight: "20px" } }, contact.Date)))))); }))))));
};
var Contact = function () {
    var navigate = useNavigate();
    var dispatch = useDispatch();
    var contactsData = useSelector(function (state) { return state.contacts.contacts; });
    var _a = useState("all"), filter = _a[0], setFilter = _a[1];
    var filterData = function (data) {
        return data.filter(function (row) {
            if (filter === "all")
                return true;
            if (filter === "published")
                return row.Action === "Archive";
            if (filter === "archived")
                return row.Action == "Publish";
            return false;
        });
    };
    useEffect(function () {
        dispatch(fetchContactsAsync());
    }, [dispatch]);
    return (React.createElement("div", { style: { marginBottom: "100px" } },
        React.createElement(ContactSlider, null),
        React.createElement("div", { style: {
                marginLeft: "69%",
                marginTop: "50px",
                marginBottom: "-150px",
                color: "white",
            } },
            React.createElement("label", { htmlFor: "action-filter", style: { fontSize: "20px" } }, "Filter by action:"),
            React.createElement("select", { id: "action-filter", value: filter, onChange: function (e) { return setFilter(e.target.value); }, style: {
                    marginLeft: "18px",
                    padding: "10px 20px",
                    color: "white",
                    borderRadius: "10px",
                    background: "#212121",
                    fontSize: "15px",
                } },
                React.createElement("option", { value: "all" }, "All"),
                React.createElement("option", { value: "published" }, "Published"),
                React.createElement("option", { value: "archived" }, "Archived"))),
        Array.isArray(contactsData) ? (React.createElement(Table, { initialData: filterData(contactsData), route: "contacts" })) : (React.createElement("p", null, "Loading..."))));
};
export default Contact;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
