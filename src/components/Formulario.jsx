import { useState } from "react";
import useClima from "../hooks/useClima";

const Formulario = () => {
  const { busqueda, datosBusqueda, consultarClima } = useClima();
  const {ciudad, pais} = busqueda;
  const [alerta, setAlerta] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(Object.values(busqueda).includes('')){
      setAlerta('Todos los campos son obligatorios');
      return;
    }

    consultarClima(busqueda);
  }

  return (
    <div className="contenedor">
      {alerta && <p>{alerta}</p>}
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            value={ciudad}
            onChange={datosBusqueda}
          />
        </div>
        <div className="campo">
          <label htmlFor="pais">País</label>
          <select id="pais" name="pais"  onChange={datosBusqueda} value={pais}>
            <option value="">Seleccione un país</option>
            <option value="US">Estados Unidos</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CO">Colombia</option>
          </select>
        </div>
        <input type="submit" value="Consultar Clima" />
      </form>
    </div>
  );
};

export default Formulario;
