import {Button, Stack} from 'react-bootstrap'
import React, {useState} from "react"
import Container from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import AddGastoModal from './components/AddGastoModal'
import ShowGastoModal from './components/ShowGastoModal'
import { useBudgets } from './contexts/BudgetsProviders'
import './App.css';
import logo from './logo.svg';

function App() {
  const [showBudget, setShowBudget] = useState(false);
  const [showGasto, setShowGasto] = useState(false);
  const [showGastoDetalleId, setShowGastoDetalleId] = useState();
  const {listaPresupuestos,getGastosPorCategoria} = useBudgets();

  return(
  <>
    <Container className="my-4">
          <Stack direction="horizontal" gap="3" className="mb-4">
            <div className="row me-auto">
            <div className="col-4 p-0"><img src={logo} className="w-100"  /></div>
            <div className="col-8 align-self-center d-none d-sm-block"><h2 className="row">My Budget</h2></div>
            </div>
        
            <Button variant="primary" onClick={() => setShowBudget(true)}>+Presupuesto</Button>
            <div className="vr" />
            {listaPresupuestos == ''?
            <Button variant="secondary" disabled onClick={() => setShowGasto(true)}>Gasto</Button>
            :
            <Button variant="outline-warning" onClick={() => setShowGasto(true)}>+Gasto</Button>
            }
          </Stack>

          {listaPresupuestos.map(itemP =>{
            const idGastoCate = itemP.categoria
            const objetosGastoxCate = getGastosPorCategoria(idGastoCate)
            const totalGasto = objetosGastoxCate.reduce((total, itemP) => total + itemP.monto, 0)
            //console.log(idGastoCate)
            return(
             <BudgetCard 
              key={itemP.idCategoria} 
              categoria={itemP.categoria} 
              monto={totalGasto}
              montoMax={itemP.montoMax}
              verGastosClick={() => setShowGastoDetalleId(itemP.categoria)}
              idPresupuesto={itemP.idCategoria}
              />
             )
          })}  
    </Container>
    
    <AddBudgetModal show={showBudget} handleClose={() => setShowBudget(false)}/>
    <AddGastoModal show={showGasto} handleClose={() => setShowGasto(false)} />
    <ShowGastoModal presupuestoId={showGastoDetalleId} handleClose={() => setShowGastoDetalleId()} /> 
  </>
  )
}
export default App;
