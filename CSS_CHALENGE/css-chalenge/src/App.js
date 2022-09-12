import "./App.css";
import DetailsCars from "./components/DetailsCars";

function App() {
  const cars = [
    { marca: "Fiat", modelo: "Toro", ano: "2020" },
    { marca: "Chevrolet", modelo: "Celta", ano: "2012" },
    { marca: "VW", modelo: "Golf", ano: "2000" },
  ];

  return (
    <div className="App">
      <h1>Desafio CSS - Estilos e CSS reset</h1>
      {cars.map((car, i) => {
        <DetailsCars marca={car.marca} modelo={car.modelo} ano={car.ano} />;
      })}
    </div>
  );
}

export default App;
