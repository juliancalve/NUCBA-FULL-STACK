import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AllUsers from "../components/AllUsers"
import CreateUser from "../components/CreateUser"
import ShowUser from "../components/ShowUser"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/users' element={<AllUsers />} />
                <Route path='/users/:id' element={<ShowUser />}/>
                <Route path='/create' element={<CreateUser />}/>
                <Route path='*' element={<Navigate to='/users'/>}/>
            </Routes>
        </BrowserRouter>
    )
}

// export default Router
