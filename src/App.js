import{BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Profile from './pages/profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<AuthLayout/>}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="profile/:token" element={<Profile />} />
      </Route>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
