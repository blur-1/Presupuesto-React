import {useRef} from "react"
import {Form, Modal, Button} from "react-bootstrap"
import {useBudgets} from '../contexts/BudgetsProviders'


const AddBudgetModal = ({show , handleClose}) => {
    const cateRef = useRef()
    const montoMaxRef = useRef()
    const {agregarPresupuesto} = useBudgets()

    function handleSubmit(e) {
        e.preventDefault()
        agregarPresupuesto({
            categoria: cateRef.current.value,
            montoMax: parseFloat(montoMaxRef.current.value)
        })
       handleClose()
    }
      
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Añadir Presupuesto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="categoria">
                <Form.Label>Escriba una Categoria:</Form.Label>
                <Form.Control type="text" ref={cateRef} required autoFocus placeholder="Ejm: emergencias, comidas.."/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="montoMax">
                <Form.Label>Presupuesto destinado:</Form.Label>
                <Form.Control type="number" ref={montoMaxRef} required min={0} step={0.01} placeholder="Digite un monto $"/>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">Añadir</Button>
              </Modal.Footer>
            </Form>
        </Modal>
    );
}
export default AddBudgetModal;