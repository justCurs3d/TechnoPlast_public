import React from 'react';
import './MyModal.css'

const MyModal = () => {
    return (
                <div className="modal-overlay">
                    <div className="modal__main">
                        <div className="modal-content">
                            <h1 className='load'>Создаем Pdf-файл...</h1>
                            <br/>
                            <div className="loading-spinner"></div>
                            <br/>
                        </div>
                    </div>
                </div>
    );
};

export default MyModal;