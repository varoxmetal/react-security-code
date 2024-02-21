import React from 'react'

const SECURITY_CODE = 'test'

function UseState({ name }) {
    const [state, setState] = React.useState({
        error: false,
        loading: false,
        value: '',
        confirmed: false,
        deleted: false,
    })
    
    const onConfirmed = () => {
        setState({ ...state, error: false, loading:false, confirmed: true, })
    }
    const onError = () => {
        setState({ ...state, error: true, loading:false, })
    }
    const onWrite = (newValue) => {
        setState({...state, value: newValue})
    }
    const onCheck = () => {
        setState({...state, loading: true})
    }
    const onDelete = () => {
        setState({...state, deleted: true})
    }
    const onReset = () => {
        setState({...state, confirmed: false, deleted: false, value: ''})
    }

    React.useEffect(() => {
        if(state.loading){
            setTimeout(() => {
                if(state.value === SECURITY_CODE) {
                    onConfirmed()
                }
                else {
                    onError()
                }
            }, 3000);
        }
    }, [state.loading])

    if(!state.confirmed && !state.deleted) {
        return(
            <div>
                <h2>{name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                <input onChange={(event) => { onWrite(event.target.value)}} value={state.value} placeholder='Código de seguridad' />
                <button onClick={() => { onCheck() }}>Comprobar</button>
                {(state.error && !state.loading) && (<p>Error: el código es incorrecto</p>)}
                {state.loading && (<p>Cargando . . .</p>)}
            </div>
        )
    }
    else if(state.confirmed && !state.deleted) {
        return(
            <>
                <p>Confirmed</p>
                <button onClick={() => { onDelete() }}>Continue</button>
                <button onClick={() => { onReset() }}>Back</button>
            </> 
        )
    }
    else {
        return(
            <>
                <p>Deleted</p>
                <button onClick={() => { onReset() }}>Reset</button>
            </> 
         )
    }
    
}

export { UseState }