import { selectModal } from '@store/global/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SpinnerModal from './SpinnerModal';

const MODAL_COMPONENTS = {
    'SPINNER': SpinnerModal,
}

const RootModal = () => {
    const { modal } = useSelector(createStructuredSelector({
        modal: selectModal(),
    }));
    
    if (!modal.length) return null;

    const renderedModals = modal.map((modalDescription, index) => {
        const { modalType, modalProps = {} } = modalDescription;
        const ModalComponent = MODAL_COMPONENTS[modalType];

        return <ModalComponent {...modalProps}  key={modalType + index}/>;
    });

    return (
        <>
         {renderedModals}
        </>
    )

}

export default RootModal;