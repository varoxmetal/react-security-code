import React from 'react'

function UseState({ name }) {
    return(
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            <input placeholder='Código de seguridad' />
            <button>Comprobar</button>
        </div>
    )
}

export { UseState }