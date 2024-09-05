import { useState } from 'react';
import Modal from "./modal";

export default function ModalTest(){
    const [showModal, setShowModal] = useState(false);
    function handleToggleModal() {  setShowModal(!showModal); }
    function onCloseModal() { setShowModal(false)}

    return (
        <div>
            <button onClick={handleToggleModal}>Toggle Modal Popup</button>
            {
                showModal && <Modal 
                                header={<h1>This is a CUSTOM header text received as props</h1>}
                                body={<div>This is a CUSTOM body text received as props</div>} 
                                footer={<h1>This is a CUSTOM footer received as props</h1>}
                                onCloseModal={onCloseModal}
                             />
            }
        </div>
    );
}