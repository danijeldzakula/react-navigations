import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Header from '../components/header/Header'

// const Navbar = () => {
//   return (
//     <nav className='navbar'>
//         <ul>
//           <li>
//             <NavLink to='/cart'>
//               <span className='text'>Cart</span>
//             </NavLink>
//           </li>
//         </ul>
//     </nav>
//   )
// }

// const Header = () => {
//   return (
//     <header className='header'>
//       <div className='container'>
//         <Link to='/'>
//           <span className='text'>Webshop</span>
//         </Link>

//         <Navbar />
//       </div>
//     </header>
//   )
// }

const Layout = (props) => {
  const { children } = props;

  return (
    <div className='app'>
      <Header />
      <main className='main'>{children}</main>
    </div>
  )
}

export default Layout;