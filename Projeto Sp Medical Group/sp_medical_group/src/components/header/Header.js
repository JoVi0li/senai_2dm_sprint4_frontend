import { Link } from 'react-router-dom';
import '../../assets/css/Header.css'
import logo from '../../assets/images/logo_spmedgroup.svg'

function Header(){
    return(
        <div className="header">
            <figure>
                <img src={logo} alt='Logo Sp Medical Group' />
            </figure>
            <nav className="headerNav">
                <ul className="headerUl">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/dashbord'>Dashbord</Link></li>
                    <li className='headerLogin'><Link to='/login'>Login</Link></li>
                </ul>
            </nav>

        </div>
    )
}

export default Header;