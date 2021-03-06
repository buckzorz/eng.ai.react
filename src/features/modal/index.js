import React from 'react'
import {Modal, Backdrop, Fade} from '@material-ui/core'
import { Close }  from '@material-ui/icons'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledFade = styled(Fade)`
    background-color: white;
    width: 500px;
    height: 500px;
    text-overflow: break-word;
`;

const ModalContent = styled.div`

`;

const CloseWrap = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default function RowModal(props){
    const {isModalOpen, setIsModalOpen, modalContent} = props;

    const modalClose = () => {
        setIsModalOpen(false);
    }
    return(
        <StyledModal
            open={isModalOpen}
            onClose={modalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 100,
            }}
        >
            <StyledFade in={isModalOpen}>
                <ModalContent>
                    <CloseWrap>
                        <Close onClick={modalClose}/>
                    </CloseWrap>
                    <p>{JSON.stringify(modalContent)}</p>
                </ModalContent>
            </StyledFade>
        </StyledModal>
    )
}