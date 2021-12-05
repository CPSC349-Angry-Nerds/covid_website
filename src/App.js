import Graph from "./components/graph/Graph";
import Map from "./components/map/Map";
import Table from "./components/table/Table";
import Covid from "./components/covid-19/Covid";
import { columns1, columns2 } from "./components/table/COLUMNS";
import "./App.css"

function App() {
  return (
    <div>
      <div>
        <Covid />
      </div>
      <div className="container-lg App pb-5 px-5">
        <div className=" px-5">
          <Map />
        </div>
        <Graph />
        <div className="t-g-container">
          <div className="tg">
            <Table
              TCol={columns1}
              TDataKind="/v1/us/daily.json"
              TableType={1}
            />
          </div>
          <div className="tg">
            <Table
              TCol={columns2}
              TDataKind="/v1/states/daily.json"
              TableType={2}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;