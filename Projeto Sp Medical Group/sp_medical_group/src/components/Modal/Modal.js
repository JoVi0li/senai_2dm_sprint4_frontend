import React, { Component } from 'react'
import ReactCircleModal from 'react-circle-modal'
import '../../assets/css/Modal.css'
import addIcon from '../../assets/icons/add.svg'

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <ReactCircleModal
        backgroundColor="rgba(246, 246, 246, 1)"


        toogleComponent={onClick => (
          <button type='button' onClick={onClick} >
            <img src={addIcon} alt='Icone de adição' />
          </button>

        )}
        // Optional fields and their default values
        offsetX={0}
        offsetY={0}
      >
        {(onClick) => (
          <div className='content'>
            <button type='button' className='closeModal' onClick={onClick} ><img src={addIcon} alt='Icone para fechar o modal'/></button>

            {this.props.children}
          </div>
        )}
      </ReactCircleModal>

    )
  }
}
export default Modal