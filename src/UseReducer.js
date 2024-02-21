import React from 'react'

const SECURITY_CODE = 'test'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const onConfirmed = () => dispatch({ type: actionTypes.confirm })
    
    const onError = () => dispatch({ type: actionTypes.error })

    const onWrite = ({ target: { value }}) => dispatch({ type: actionTypes.write, payload: value })
    
    const onCheck = () => dispatch({ type: actionTypes.check })

    const onDelete = () => dispatch({ type: actionTypes.delete })

    const onReset = () => dispatch({ type: actionTypes.reset })

    React.useEffect(() => {
        if(state.loading){
            setTimeout(() => {
                if(state.value === SECURITY_CODE) {
                    onConfirmed ()
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
                <input onChange={onWrite} value={state.value} placeholder='Código de seguridad' />
                <button onClick={onCheck}>Comprobar</button>
                {(state.error && !state.loading) && (<p>Error: el código es incorrecto</p>)}
                {state.loading && (<p>Cargando . . .</p>)}
            </div>
        )
    }
    else if(state.confirmed && !state.deleted) {
        return(
            <>
                <p>Confirmed</p>
                <button onClick={onDelete}>Continue</button>
                <button onClick={onReset}>Back</button>
            </> 
        )
    }
    else {
        return(
            <>
                <p>Deleted</p>
                <button onClick={onReset}>Reset</button>
            </> 
         )
    }
    
}

export { UseReducer }

const initialState = {
    error: false,
    loading: false,
    value: '',
    confirmed: false,
    deleted: false,
}

const actionTypes = {
    confirm : 'CONFIRM',
    error:'ERROR',
    write: 'WRITE',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: { ...state, error: false, loading: false, confirmed: true, },
    [actionTypes.error]: { ...state, error: true, loading: false, },
    [actionTypes.write]: {...state, value: payload },
    [actionTypes.check]: {...state, loading: true },
    [actionTypes.delete]: {...state, deleted: true},
    [actionTypes.reset]: {...state, confirmed: false, deleted: false, value: ''},
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    }
    else {
        return state
    }
}
export {reducer}