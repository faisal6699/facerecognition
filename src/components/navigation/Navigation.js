import React from "react";

const Navigation = ({ onRouteChange, isSignin, route }) => {
  if (isSignin) {
    if (route === "voice") {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f4 link dim black underline  pointer ma2"
            onClick={() => onRouteChange("face")}
          >
            Go to face app{" "}
          </p>

          <p
            className="f4 link dim black underline  pointer ma2"
            onClick={() => onRouteChange("signout")}
          >
            Sign out{" "}
          </p>
        </nav>
      );
    } else if (route === "face") {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f4 link dim black underline  pointer ma2"
            onClick={() => onRouteChange("voice")}
          >
            Go to voice app{" "}
          </p>

          <p
            className="f4 link dim black underline  pointer ma2"
            onClick={() => onRouteChange("signout")}
          >
            Sign out{" "}
          </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            className="f4 link dim black underline  pointer"
            onClick={() => onRouteChange("signout")}
          >
            Sign out
          </p>
        </nav>
      );
    }
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f4 link dim black underline  pointer ma2"
          onClick={() => onRouteChange("signin")}
        >
          sign in{" "}
        </p>
        <p
          className="f4 link dim black underline  pointer ma2"
          onClick={() => onRouteChange("register")}
        >
          register{" "}
        </p>
      </nav>
    );
  }
};

export default Navigation;
