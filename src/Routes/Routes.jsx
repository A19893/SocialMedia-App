import Signup from '../Components/Signup'
import Home from '../Components/Home'
import Signin from '../Components/Signin'
import Profile from '../Components/Profile'
export const publicRoutes=[
{
    path:"/",
    element:<Signup/>
},
{
   path:"/login",
   element:<Signin/>
},
{
    path:"/*",
    element:<Signin/>
}
]
export const privateRoutes=[
    {
        path:"/home",
        element:<Home/>
    },
    {
        path:"/profile",
        element:<Profile/>
    }
]