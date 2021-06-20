import '../../assets/css/SideBar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo_spmedgroup.svg';
import user from '../../assets/icons/user.svg';
import geral from '../../assets/icons/geral.svg';
import clinica from '../../assets/icons/clinica.svg';
import consulta from '../../assets/icons/consulta.svg';
import medico from '../../assets/icons/medico.svg';
import paciente from '../../assets/icons/paciente.svg';

function SideBar() {
    return (
        <div className='barBody'>
            <div className='barContent'>
                <figure className='barLogo'>
                    <Link to='/'><img src={logo} alt='Logo do Sp Medical Group' /></Link>
                </figure>
                <nav className='barNav'>
                    <ul>
                        <li><Link to='/dashbord'><img src={geral} alt='Icone de visão geral' /><p>Geral</p></Link></li>
                        <li><Link to='/dashbord/pacientes'><img src={paciente} alt='Icone de pacientes' /><p>Pacientes</p></Link></li>
                        <li><Link to='/dashbord/medicos'><img src={medico} alt='Icone de médicos' /><p>Médicos</p></Link></li>
                        <li><Link to='/dashbord/consultas'><img src={consulta} alt='Icone de consultas' /><p>Consultas</p></Link></li>
                        <li><Link to='/dashbord/clinicas'><img src={clinica} alt='Icone de clínicas' /><p>Clínicas</p></Link></li>
                    </ul>
                </nav>
                <div className='barUser'>
                    <img src={user} alt='Icone de usuário' />
                    <p>João Vitor</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar;