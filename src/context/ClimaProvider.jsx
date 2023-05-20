import axios from "axios";
import { createContext, useState } from "react";

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({ ciudad: "", pais: "" });
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [noResultado, setNoResultado] = useState('');

  const datosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const consultarClima = async (datos) => {
    try {
      setCargando(true);
      const { ciudad, pais } = datos;
      const appId = import.meta.env.VITE_API_KEY;
      console.log(appId);
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: dataClima } = await axios(urlClima);

      setResultado(dataClima);
    } catch (error) {
      setResultado({});
      setNoResultado('No hay resultado');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        resultado,
        cargando,
        noResultado,
        datosBusqueda,
        consultarClima,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };
export default ClimaContext;
