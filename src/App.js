import Graph from './components/graph/Graph'
import Map from './components/map/Map'
import Table from './components/table/Table'
import Covid from './components/covid-19/Covid';

function App() {
  return (
    <div className="container-lg App pb-5 px-5">
      <h1> </h1>
      <div className=" px-5">
        <Covid />
        <Map />
      </div>
      <Table/>
      <Graph/>
    </div>
  );
}

export default App;
