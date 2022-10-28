import React from 'react';
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";

function ApproveModal({isOpen, close, hotelName, hotelIndex, deleteHotel}) {
    return <Modal isOpen={isOpen} onClose={() => close(false)} isCentered>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                Otel Sil
            </ModalHeader>
            <ModalBody>{hotelName}'i silmek istediğinizden emin misiniz?</ModalBody>
            <ModalFooter>
                <Button colorScheme={'blue'} mr={1} onClick={() => {
                    deleteHotel(hotelIndex)
                    setTimeout(() => {
                        close(false)
                    }, 300)
                }}>Oteli Sil</Button>
                <Button colorScheme={'blue'} variant={'outline'} onClick={() => close(false)}>Vazgeç</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

export default ApproveModal;
