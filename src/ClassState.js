import React from 'react'

const SECURITY_CODE = 'test'

class ClassState extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error : false,
            loading: false,
            value: '',
        }
    }

    componentDidUpdate() {
        if(this.state.loading){
            setTimeout(() => {
                if(this.state.value === SECURITY_CODE){
                    this.setState({ loading: false, error: false})
                }
                else {
                    this.setState({ loading: false, error: true})
                }
            }, 3000);
        }
    }

    render() {
        return(
            <div>
                <h2>{this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                
                <input onChange={(event) => this.setState({ value: event.target.value })} value={this.state.value} placeholder='Código de seguridad' />
                <button onClick={() => this.setState({ loading: true})}>
                    Comprobar
                </button>
                {(this.state.error && !this.state.loading) && (<p>Error: el código es incorrecto</p>)}
                {this.state.loading && (<p>Cargando . . .</p>)}
            </div>
        )
    }
}

export { ClassState }