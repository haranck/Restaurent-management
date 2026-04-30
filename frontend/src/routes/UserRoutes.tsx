import {Routes,Route} from "react-router-dom"
import {SignupPage} from "../pages/Auth/SignupPage"
import {LoginPage} from "../pages/Auth/LoginPage"
import {LandingPage} from "../pages/LandingPage"
import {HomePage} from "../pages/HomePage"
import {ShopsPage} from "../pages/ShopsPage"
import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const UserRoutes =() =>{
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/shops" element={<ShopsPage />} />
            </Route>
        </Routes>
    )
}

export default UserRoutes