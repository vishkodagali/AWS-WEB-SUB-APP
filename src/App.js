import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MusicTable from './CreateTable';
import LoadData from './LoadData';
import CreateBucketAndUploadImages from './CreateBucketAndUploadImages';
import './Navbar.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn ? (
            <>
              <Route path="/MusicTable" element={<MusicTable />} />
              <Route path="/LoadData" element={<LoadData />} />
              <Route path="/CreateBucketAndUploadImages" element={<CreateBucketAndUploadImages />} />
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </>
    </Router>
  );
}

export default App;
















// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// import Home from './Home';
// import Login from './Login';
// import Register from './Register';
// import MusicTable from './CreateTable';
// import LoadData from './LoadData';
// import CreateBucketAndUploadImages from './CreateBucketAndUploadImages';
// import './Navbar.css'; 

// function App() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const user = localStorage.getItem('userLoggedIn');
//     if (user) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('userLoggedIn');
//     setIsLoggedIn(false);
//     navigate('/login');

//   };

//   return (
//     <Router>
//       <>
//         <nav className="navbar">
//           <div className="container-fluid">
//             <Link className="navbar-brand" to="/">Cloud Computing Assignment 1</Link>
//             <div className="navbar" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/">Home</Link>
//                 </li>
//               </ul>
//               <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                 {!isLoggedIn ? (
//                   <>
//                     <li className="nav-item">
//                       <Link className="nav-link active" to="/login">Login</Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link className="nav-link active" to="/register">Register</Link>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li className="nav-item">
//                       <Link className="nav-link active" to="/MusicTable">Table Creation</Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link className="nav-link active" to="/LoadData">Load a1.json Data</Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link className="nav-link active" to="/CreateBucketAndUploadImages">s3-Bucket</Link>
//                     </li>
//                     <li className="nav-item">
//                       <button onClick={handleLogout} className="btn btn-danger">Logout</button>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </nav>

//         <Routes>
//           {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           {isLoggedIn ? (
//             <>
//               <Route path="/MusicTable" element={<MusicTable />} />
//               <Route path="/LoadData" element={<LoadData />} />
//               <Route path="/CreateBucketAndUploadImages" element={<CreateBucketAndUploadImages />} />
//               <Route path="/" element={<Home />} />
//             </>
//           ) : (
//             <Route path="*" element={<navigate replace to="/login" />} />
//           )}
//         </Routes>
//       </>
//     </Router>
//   );
// }

// export default App;


