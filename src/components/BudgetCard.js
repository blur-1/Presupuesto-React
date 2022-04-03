import React from 'react';
import {Button, Card, ProgressBar} from 'react-bootstrap'
import {intlNumber} from '../utils'
import {useBudgets} from '../contexts/BudgetsProviders'

const BudgetCard =({categoria, monto, montoMax, verGastosClick, idPresupuesto})=> {
    const decoClass = [];
        if(monto > montoMax){
            decoClass.push('bg-danger','bg-opacity-10');
        }
    const {eliminarPresupuesto} = useBudgets()

    return (
        <>
          <Card className='mb-3'>
            <Card.Header className='text-end'>
              <Button variant="outline-danger" onClick={()=> eliminarPresupuesto({id: idPresupuesto, categoriaP: categoria})} size="sm">&times;</Button>
            </Card.Header>
            <Card.Body className={decoClass.join(' ')}>
              <Card.Title className='d-flex justify-content-between mb-3'>
                  <div>{categoria}</div>
                  <div>{intlNumber.format(monto)} - <small className='text-muted fs-6'>{intlNumber.format(montoMax)}</small></div>
              </Card.Title>
              <Card.Text>
                <ProgressBar className='rounded-pill' variant={progressBarAction(monto, montoMax)} label={`S/.${monto}`}
                      min={0} animated now={monto} max={montoMax}
                ></ProgressBar>
              </Card.Text>
            </Card.Body>
            <Card.Footer className='text-end'>
              <Button variant='outline-secondary' onClick={verGastosClick}>Ver Gastos</Button>
            </Card.Footer>
          </Card>
        </>
    );
}
let progressBarAction = (monto, montoMax) =>{
    const ratio = monto / montoMax;
    if(ratio < 0.5) return 'primary';
    if(ratio < 0.75) return 'warning';
    return 'danger'
}
export default BudgetCard;