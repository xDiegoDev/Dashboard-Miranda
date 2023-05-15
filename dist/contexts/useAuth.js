import { useContext } from "react";
import { AuthContext } from "./AuthContext";
export var useAuth = function () {
    var authState = useContext(AuthContext).authState;
    var isLoggedIn = authState.isLoggedIn;
    var userEmail = authState.userEmail;
    console.log("useAuth values:", { isLoggedIn: isLoggedIn, userEmail: userEmail });
    return { isLoggedIn: isLoggedIn, userEmail: userEmail };
};
