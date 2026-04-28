import {Routes,Route} from "react-router-dom"
import {SignupPage} from "../pages/Auth/SignupPage"
import {LoginPage} from "../pages/Auth/LoginPage"
import {LandingPage} from "../pages/LandingPage"
import {HomePage} from "../pages/HomePage"

const UserRoutes =() =>{
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}

export default UserRoutes