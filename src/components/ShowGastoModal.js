import React from 'react';
import {intlNumber} from '../utils';
import {Modal, Button, Stack} from "react-bootstrap"
import {useBudgets} from '../contexts/BudgetsProviders';

const ShowGastoModal = ({ presupuestoId, handleClose }) => {
  const { getGastosPorCategoria, eliminarGasto } = useBudgets()
  const listaGastos = getGastosPorCategoria(presupuestoId)

  return (
    <Modal show={presupuestoId != null} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Detalle de Gastos en {presupuestoId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="vertical" gap="3">
                {listaGastos.map(itemG => (
                  <Stack direction="horizontal" className="bg-light border p-2" gap="3" key={itemG.id}>
                        <div className="me-auto fs-6 ">{itemG.fecha}</div> 
                        <div className="me-auto fs-6">{itemG.descripcion}</div>
                        <div className="fs-6">{intlNumber.format(itemG.monto)} </div>
                        <div className="vr" />
                    <Button variant="outline-danger" onClick={()=> eliminarGasto({id: itemG.id})} size="sm">Borrar</Button>
                  </Stack>
                ))}
            </Stack>
        </Modal.Body>
    </Modal>
  );
}
export default ShowGastoModal;