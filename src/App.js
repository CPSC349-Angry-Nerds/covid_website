import Table from './components/table/Table'
import Map from './components/map/Map'

function App() {
  return (
    <div className="container-lg App pb-5 px-5">
      <h1> Covid-19 Website</h1>
      <div className=" px-5">
        <Map />
      </div>
      <Table/>
    </div>
  );
}

export default App;
