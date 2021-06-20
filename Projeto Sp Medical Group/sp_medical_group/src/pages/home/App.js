import '../../assets/css/App.css';
import Header from '../../components/header/Header'
import ilustration from '../../assets/images/ilustration01.svg'
import { Link } from 'react-router-dom';


function App() {
  return (
    <div className="body">

      <Header />
      <main className="main">

        <div className="appTextButton">
          <h1>Sp Medical Group</h1>
          <p>Somos uma nova clínica médica de pequeno porte, fundada pelo médico Fernando Strada em 2020 na região da
            Paulista em São Paulo.
            Contamos com uma equipe de médicos que atuam em diversas
            áreas (pediatria, odontologia, gastrenterologia etc.).</p>
            <button className="appButton"><Link to='/sobre'>Saiba mais</Link></button>
        </div>



        <figure className="appFigure">
          <img src={ilustration} alt='Ilustração de uma médica' />
        </figure>

      </main>
    </div>
  );
}

export default App;
