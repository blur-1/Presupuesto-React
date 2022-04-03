import {useRef} from "react"
import {Form, Modal, Button} from "react-bootstrap"
import {useBudgets} from '../contexts/BudgetsProviders'

const AddGastoModal = ({show , handleClose}) => {
    const cateRef = useRef()
    const montoRef = useRef()
    const descRef = useRef()
    const {agregarGasto, listaPresupuestos} = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        agregarGasto({
            idCategoria: cateRef.current.value,
            monto: parseFloat(montoRef.current.value),
            descripcion: descRef.current.value
        })
       handleClose()
    }
      
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Gasto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="idCategoria">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select required ref={cateRef} autoFocus>
                            {listaPresupuestos.map(itemP => (
                            <option key={itemP.idCategoria} value={itemP.categoria}>{itemP.categoria}</option>
                            ))}
                        </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="monto">
                <Form.Label>Monto a gastar</Form.Label>
                <Form.Control type="number" ref={montoRef} required min={0} step={0.01}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descripcion">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control type="text" ref={descRef} required autoFocus />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">Añadir</Button>
              </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default AddGastoModal;