import Graph from "./components/graph/Graph";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import "./App.css"
import { columns1 , columns2} from "./components/table/COLUMNS";


function App() {
  return (
    <div className="container-lg App pb-5 px-5">
      <h1> Covid-19 Website</h1>
      <div className=" px-5">
        <Map />
      </div>
      <div className="t-g-container">
        <div className="tg">
          <Table TCol={columns1} TDataKind="/v1/us/daily.json" TableType={1}/>
        </div>
        <div className="tg">
        <Table TCol={columns2} TDataKind="/v1/states/current.json" TableType={2}/>
        </div>
        <div className="tg">
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
