import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import MainPage from "../pages/MainPage";
import PartnerSignupForm from "../components/SignupForm/PartnerSignupForm";
import PartnerLoginForm from "../components/LoginForm/PartnerLoginForm";
import PetProfile from "../components/PetProfile/PetProfile";
import AllPets from "../components/PartnerComponents/AllPets";
import AddPetProfile from "../components/PartnerComponents/AddPetProfile";
import PartnerHomePage from "../pages/PartnerPages/PartnerHomePage";
import PartnerAppointments from "../components/PartnerComponents/PartnerAppointments";

/* User Pages */
import UserSignupForm from "../components/SignupForm/UserSignupForm";
import UserLoginForm from "../components/LoginForm/UserLoginForm";
import UserAppointmentForm from "../components/UserComponents/UserAppointmentForm";
import UserHomePage from "../pages/UserPages/UserHomePage/UserHomePage";
import UserSearchPage from "../pages/UserPages/UserSearchPage/UserSearchPage";
import UserViewAppointmentPage from "../pages/UserPages/UserViewAppointmentPage/UserViewAppointmentPage";

function App() {
  const [token, setToken] = useState("");

  console.log("token in app jsx", token);

  return (
    <>
      <h1>Pawfect Match</h1>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/partner/login"
          element={<PartnerLoginForm setToken={setToken} />}
        />
        <Route
          path="/partner/signup"
          element={<PartnerSignupForm setToken={setToken} />}
        />
        <Route
          path="/partner/home"
          element={<PartnerHomePage token={token} />}
        />
        <Route path="/partner/search" element={<UserSearchPage />} />
        <Route path="/partner/pets" element={<AllPets token={token} />} />
        <Route
          path="/partner/pets/add"
          element={<AddPetProfile token={token} />}
        />
        <Route
          path="/partner/pets/:petId"
          element={<PetProfile view="partner" token={token} />}
        />
        <Route
          path="/partner/appointments"
          element={<PartnerAppointments token={token} />}
        />

        <Route
          path="/user/login"
          element={<UserLoginForm setToken={setToken} />}
        />
        <Route
          path="/user/signup"
          element={<UserSignupForm setToken={token} />}
        />
        <Route path="/home/:userId" element={<UserHomePage token={token} />} />
        <Route path="/search" element={<UserSearchPage view="user" token={token} />} />
        <Route path="/pets/:petId" />
        <Route path="/favorites/:userId" />
        <Route
          path="/appointments/create/:petId"
          element={<UserAppointmentForm token={token} />}
        />
        <Route
          path="/appointments/:userId"
          element={<UserViewAppointmentPage token={token} />}
        />
      </Routes>
    </>
  );
}

export default App;
