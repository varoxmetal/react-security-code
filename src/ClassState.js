import React from 'react'

class ClassState extends React.Component {
    render() {
        return(
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                <input placeholder='Código de seguridad' />
                <button>Comprobar</button>
            </div>
        )
    }
}

export { ClassState }