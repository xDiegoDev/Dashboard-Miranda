var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
export var StyledMain = styled.main(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: ", ";\n  margin-left: ", ";\n  padding: ", ";\n  transition: all 0.4s;\n  width: ", ";\n  background-color: #171717;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: ", ";\n  margin: auto;\n  margin-left: ", ";\n"], ["\n  margin-top: ", ";\n  margin-left: ", ";\n  padding: ", ";\n  transition: all 0.4s;\n  width: ", ";\n  background-color: #171717;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: ", ";\n  margin: auto;\n  margin-left: ", ";\n"])), function (_a) {
    var isLoggedIn = _a.isLoggedIn;
    return (isLoggedIn ? "0" : "0");
}, function (_a) {
    var sidebarVisible = _a.sidebarVisible;
    return (sidebarVisible ? "350px" : "30px");
}, function (_a) {
    var isLoggedIn = _a.isLoggedIn;
    return (isLoggedIn ? "0" : "0");
}, function (_a) {
    var sidebarVisible = _a.sidebarVisible, isLoggedIn = _a.isLoggedIn;
    return isLoggedIn && sidebarVisible ? "calc(100% - 300px)" : "100%";
}, function (_a) {
    var isLoggedIn = _a.isLoggedIn;
    return (isLoggedIn ? "auto" : "hidden");
}, function (_a) {
    var sidebarVisible = _a.sidebarVisible;
    return (sidebarVisible ? "350px" : "auto");
});
var templateObject_1;
