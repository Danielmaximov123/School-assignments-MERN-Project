import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

//  Routers
import LoginComp from "./pages/auth/Login";
import HomePageComp from './pages/Home Page/home';
import NavSection from './pages/Home Page/nav/navSection';
import Missions from './pages/missions/missions';
import Layout from './pages/Home Page/layout';
import StudentsComp from './pages/students/students';
import MyProfileComp from './pages/profile/myProfile';
import NewUser from './pages/profile/newUser';
import NoMatchPage from './pages/404';
import VerifyAccountComp from "./pages/auth/verifyAcount";
import { getAllUsers } from './redux/actions/getUsersAction';
import { LoadUser } from "./redux/actions/getAuthAction";
import Subjects from './pages/sucjects/subjects';
import { getAllSubjects } from "./redux/actions/getSubjectsAction";
import NewMission from './pages/missions/newMission';
import MissionPage from "./pages/missions/mission/missionPage";
import { getAllMissions } from "./redux/actions/getMissionAction";
import jwtDecode from 'jwt-decode'
import NewSubject from "./pages/sucjects/newSubject";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import StudentComp from "./pages/students/student";

const MainPageComp = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const auth = useSelector(state => state.auth.auth)
    const users = useSelector(state => state.users.users)

    let user = users.find((user) => user._id === auth?.userId);

    useEffect(() => {
        dispatch(LoadUser())
        dispatch(getAllUsers())
        dispatch(getAllSubjects())
        dispatch(getAllMissions())
    },[dispatch])

    
    let interval = setInterval(() => {
        if(localStorage.getItem("token")) {
            const { exp } = jwtDecode(localStorage.getItem("token"))
            let expiresIn = exp * 1000
            if(expiresIn < Date.now()) {
            dispatch({ type : 'LOG_OUT_USER' })
        }
        } else {
            clearInterval(interval)
        }
    },[10000])

  return (
    <div>
        {token ? <NavSection auth={auth} user={user} /> : null}
        <Routes>
            <Route index element={<Navigate to="app"/>}/>
            <Route path="/" element={token ? <Layout/> : <Navigate to={'/sign-in'}/>}>
                <Route path="app" element={<HomePageComp user={user} auth={auth}/>}/>
                <Route path="missions" element={<Missions auth={auth} user={user} users={users}/>}/>
                <Route path="missions/add-new" element={<NewMission auth={auth} user={user} users={users}/>}/>
                <Route path="missions/:id" element={<MissionPage auth={auth}/>}/>
                <Route path="subjects" element={<Subjects auth={auth} user={user} users={users}/>}/>
                <Route path="subjects/add-new" element={<NewSubject auth={auth} user={user} users={users}/>}/>
                <Route path="students" element={<StudentsComp user={user} users={users}/>}/>
                <Route path="students/:id" element={<StudentComp users={users}/>}/>
                <Route path="my-profile" element={<MyProfileComp auth={auth} user={user}/>}/>
                <Route path="new-user" element={<NewUser/>}/>
                <Route path="*" element={<Navigate to='404'/>}/>
                <Route path="404" element={<NoMatchPage/>}/>
            <Route/>
            </Route>
            <Route path="/verify-account" element={!token ? <VerifyAccountComp users={users}/> : <Navigate to={'/'}/>} />
            <Route path="/sign-in" element={!token ? <LoginComp users={users}/> : <Navigate to={'/'}/>}/>
            <Route path="/forgot-password" element={!token ? <ForgotPassword users={users}/> : <Navigate to={'/'}/>}/>
            <Route path="/reset-password" element={!token ? <ResetPassword users={users}/> : <Navigate to={'/'}/>}/>
        </Routes>
    </div>
  )
}

export default MainPageComp