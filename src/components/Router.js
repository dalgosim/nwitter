import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; //Switch -> Routes (v6.0.2)
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center"
                    }}>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj}/>} />
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>} />
                    </>
                ) : (
                    <Route exact path="/" element={<Auth/>} />
                )}
            </Routes>
        </Router>
    );
}

export default AppRouter;