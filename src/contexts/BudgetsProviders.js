import React, {useContext} from "react"
import {v4 as uuidV4} from 'uuid'
import {useLocalStorage} from '../hook/localStorage'

const BudgetsContext = React.createContext()

export const useBudgets = ()=>{
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({children}) =>{
    const [listaPresupuestos, setListaPresupuestos] = useLocalStorage("presupuestos", [])
    const [listaGastos, setListaGastos] = useLocalStorage("gastos", [])
    
    const agregarGasto= ({idCategoria,monto, descripcion})=>{
        const f = new Date();
        const d = f.getDate() + "/"+ (f.getMonth()+1) + "/" +f.getFullYear();
        
        const gasto = {
            id: uuidV4(),
            idCategoria,
            monto,
            descripcion,
            fecha: d
        }
        setListaGastos([...listaGastos, gasto])
    }
    
    const getGastosPorCategoria = (categoriaId)=>{
        return listaGastos.filter(gastoItem => gastoItem.idCategoria === categoriaId)
    }

    const agregarPresupuesto= ({categoria,montoMax})=>{
        const presupuesto = {
            idCategoria: uuidV4(),
            categoria,
            montoMax
        }
        setListaPresupuestos(listaPresupuestos =>{
            if(listaPresupuestos.find(itemP => itemP.categoria === categoria)){
                return listaPresupuestos
            }
            return [...listaPresupuestos, presupuesto]
        })
    }

    const eliminarPresupuesto= ({id, categoriaP})=>{
        const confirm = window.confirm("Seguro desea eliminar esta categoria?");
        if(confirm){
            setListaPresupuestos(listaPresupuestos =>{
                return listaPresupuestos.filter(itemP => itemP.idCategoria !== id)
            })
            setListaGastos(listaGastos =>{
                return listaGastos.filter(itemG => itemG.idCategoria != categoriaP)
            })
        }else{
            confirm.close();
        } 
    }

    const eliminarGasto= ({id})=>{
        setListaGastos(listaGastos =>{
            return listaGastos.filter(itemG => itemG.id != id)
        })
    }
    
    return(
        <BudgetsContext.Provider value={{
            listaPresupuestos,
            listaGastos,
            getGastosPorCategoria,
            agregarGasto,
            agregarPresupuesto,
            eliminarPresupuesto,
            eliminarGasto
        }}>
        {children}
        </BudgetsContext.Provider>
    )
}