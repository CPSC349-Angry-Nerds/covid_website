import Graph from './components/graph/Graph'
import Map from './components/map/Map'
import Table from './components/table/Table';

function App() {
  return (
    <div className="container-lg App pb-5 px-5">
      <h1> Covid-19 Website</h1>
      <div className=" px-5">
        <Map />
      </div>
      <Table/>
      <Graph/>
    </div>
  );
}

export default App;
