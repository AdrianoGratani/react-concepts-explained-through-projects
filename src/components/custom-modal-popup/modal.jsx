import React from 'react';
import "./modal.css";
export default function Modal({id, header, body, footer, onCloseModal}) {        // you get id prop of a new custom stuff. if you don't get anything, css has a "modal" fallbacke ruleset, as prescriped in the div;

    return (
        <div id={id || "modal"} className="modal">
            <div className="modal-content">
                <div className="modal-header">              <span onClick={onCloseModal} className="close-modal-icon">&times;</span>
                    { header ? header : <h2>This is the header section(fallback)</h2> }
                </div>
                <div className="modal-body">{ body ? body : <p>This is our body section(fallback)</p> }</div>
                <div className="modal-footer">{ footer ? footer : <h2>This is our footer section(fallback)</h2> }</div>
            </div>
        </div>
    );
}