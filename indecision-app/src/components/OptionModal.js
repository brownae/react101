import React from 'react';
import Modal from 'react-modal';

//note this is using implicit return shorthand.
const OptionModal = (props) => (
    <Modal
        isOpen={!!props.selectedOption}
        onRequestClose = {props.clearSelectedOption}
        contentLabel="Selected Option"
    >
        <h3>Selected Option</h3>
        {props.selectedOption && <p>{props.selectedOption}</p>}
        <button onClick={props.clearSelectedOption}>Okay</button>
    </Modal>
);

export default OptionModal;
