import './App.css';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { createOneCarRecord } from './empGeneration';


function App() {
  let emps = [...new Array(2)].map(() => createOneCarRecord());

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {field: 'id', sortable:true , filter:true},
    {field: 'name',sortable:true , filter:true},
    {field: 'position',sortable:true , filter:true},
    {field: 'hours',sortable:true , filter:true}
  ]);

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true
    }
  ));

  

  useEffect(() => {
    /*fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(cars))*/
    setRowData(emps);
  }, []);

  

 

  const onTxInsertOne = useCallback( ()=> {
    const newRecord = createOneCarRecord();
    const res = gridRef.current.api.applyTransaction({
      add: [newRecord]
    });
    console.log(res);
  });

  


  
  const onTxRemove = useCallback( () => {
    const selectedNodes 
            = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map( 
              node => node.data);

    gridRef.current.api.applyTransaction({
      remove: selectedData
    });
  });
 
  /*const onTxUpdate = useCallback( () => {
    const getRowId = 2;
      
    const updatedRecords = [];

    gridRef.current.api.forEachNode( node => {
      if (Math.random()>0.5) { return; }

      const emp = node.data;

      updatedRecords.push({
        ...emp,
        workinghours: emp.workinghours 
            + (100)        
      });
    });

    gridRef.current.api.applyTransaction({
      update: updatedRecords
    });
  });*/
  
 
  
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);
  return (
    <div class="container">
      
      <button  onClick={onTxInsertOne}>New Employee</button>
      <button onClick={onTxRemove}>Delete Employee</button>
     
     
      <div className="ag-theme-alpine" style={{width: 1000, height: 500}}>
        <AgGridReact 
          
            ref={gridRef}
            
            asyncTransactionWaitMillis={5000}
            
            rowSelection={'multiple'}
            rowData={rowData} 
            animateRows={true} 
            columnDefs={columnDefs}/>
      </div>
    </div>
  );
}

export default App;