
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (companyName) => {
    navigate(`/form/${encodeURIComponent(companyName)}`);

  };

  return (

    <>
      <button
          className="home-button"
          onClick={() => navigate("/entries")}
        >
          View All Entries
      </button>
      <div className="sections">
        <button
          className="logo-button"
          id="initialHygiene"
          onClick={() => handleButtonClick('Initial Hygiene')}
        >
          <img className="logo" src="/images/initial.png" alt="Initial Hygiene" />
        </button>

        <button
          className="logo-button"
          id="localRefrigeration"
          onClick={() => handleButtonClick('Local Refrigeration')}
        >
          <img className="logo" src="/images/local.png" alt="Local Refrigeration" />
        </button>

        <button
          className="logo-button"
          id="pCovich"
          onClick={() => handleButtonClick('P.Covich Electrical')}
        >
          <img className="logo" src="/images/pcovich.png" alt="P.Covich Electrical" />
        </button>

        <button
          className="logo-button"
          id="rentokil"
          onClick={() => handleButtonClick('Rentokil')}
        >
          <img className="logo" src="/images/rentokil.png" alt="Rentokil" />
        </button>

        <button
          className="logo-button"
          id="northFreeze"
          onClick={() => handleButtonClick('North Freeze')}
        >
          <img className="logo" src="/images/northfreeze.jpg" alt="North Freeze" />
        </button>

        <button
          className="logo-button"
          id="rogersAndRogers"
          onClick={() => handleButtonClick('Rogers and Rogers')}
        >
          <img className="logo" src="/images/rogers.jpg" alt="Rogers and Rogers" />
        </button>

        <button
          className="logo-button"
          id="certeq"
          onClick={() => handleButtonClick('Certeq')}
        >
          <img className="logo" src="/images/certeq.jpg" alt="Certeq" />
        </button>

        <button
          className="logo-button"
          id="ingenico"
          onClick={() => handleButtonClick('Ingenico')}
        >
          <img className="logo" src="/images/ingenico.png" alt="Ingenico" />
        </button>

        <button
          className="logo-button"
          id="ecolab"
          onClick={() => handleButtonClick('Ecolab')}
        >
          <img className="logo" src="/images/ecolab.jpg" alt="Ecolab" />
        </button>

        <button
          className="logo-button"
          id="ecosure"
          onClick={() => handleButtonClick('Ecosure')}
        >
          <img className="logo" src="/images/ecosure.jpg" alt="Ecosure" />
        </button>

        <button
          className="logo-button"
          id="buildingAndFire"
          onClick={() => handleButtonClick('Building and Fire')}
        >
          <img className="logo" src="/images/building.png" alt="Building and Fire" />
        </button>

        <button
          className="logo-button"
          id="asureQuality"
          onClick={() => handleButtonClick('Asure Quality')}
        >
          <img className="logo" src="/images/asure.png" alt="Asure Quality" />
        </button>

        <button
          className="logo-button"
          id="comduc"
          onClick={() => handleButtonClick('Comduc')}
        >
          <img className="logo" src="/images/comduc.jpg" alt="Comduc" />
        </button>

        <button
          className="logo-button"
          id="nfs"
          onClick={() => handleButtonClick('Fire Security Services')}
        >
          <img className="logo" src="/images/fss.png" alt="Fire Security Services" />
        </button>

        <button
          className="logo-button"
          id="northlandCCTV"
          onClick={() => handleButtonClick('Northland CCTV')}
        >
          <img className="logo" src="/images/cctv.png" alt="Northland CCTV" />
        </button>

        <button
          className="logo-button"
          id="cocaCola"
          onClick={() => handleButtonClick('Coca Cola')}
        >
          <img className="logo" src="/images/coke.jpg" alt="Coca Cola" />
        </button>

        <button
          className="logo-button"
          id="visitor"
          onClick={() => handleButtonClick('Visitor')}
        >
          <img className="logo" src="/images/visitor.jpg" alt="Visitor" />
        </button>
      </div>
      
    </>
  );
};

export default Home;
