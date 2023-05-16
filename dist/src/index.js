"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const store_tsx_1 = __importDefault(require("./store/store.tsx"));
const react_redux_1 = require("react-redux");
const AuthContext_tsx_1 = require("./contexts/AuthContext.tsx");
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(react_redux_1.Provider, { store: store_tsx_1.default },
    react_1.default.createElement(AuthContext_tsx_1.AuthProvider, null,
        react_1.default.createElement(App_1.default, null))));
