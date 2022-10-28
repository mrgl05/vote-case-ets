import React, {useState} from 'react';
import {Box, Button, Center, HStack, Image, Text, VStack} from "@chakra-ui/react";
import logo from '../assets/hotel-image.jpeg'
import ApproveModal from "../modals/approve-modal";

function ListItem({hotelName, hotelVote, _upVote, _downVote, hotelIndex, deleteHotel}) {
    const [deleteButtonShow, setDeleteButtonShow] = useState(false);
    const [deleteItemDetail, setDeleteItemDetail] = useState({});
    return <>
        <HStack
            onMouseEnter={() => {
                setDeleteButtonShow(true)
            }}
            onMouseLeave={() => {
                setDeleteButtonShow(false);
            }}
            w={'100%'}
            p={1} mt={1}
            border={'1px solid lightgray'}
            rounded={5}
            _hover={{bg: 'lightgray', transition: '0.5s', cursor: 'pointer'}}
            position={'relative'}>
            {deleteButtonShow &&
                <Box w={'20px'} h={'20px'} rounded={'20px'}
                     bg={'red.400'}
                     color={'white'}
                     position={'absolute'}
                     top={'-5px'}
                     right={'-5px'}
                     onClick={() => {
                         setDeleteItemDetail({isOpen: true, name: hotelName, index: hotelIndex})
                     }}>
                    <Center fontSize={12} mt={'1px'}>X</Center>
                </Box>}
            <Image src={logo} w={120} h={120}/>
            <VStack>
                <Box w={'100%'} display={'flex'} justifyContent={'start'} flexDirection={'column'}>
                    <Text fontWeight={'bold'}>{hotelName}</Text>
                    <Text color={'blue.500'} fontSize={'14px'} fontWeight={'bold'}>{hotelVote} Puan</Text>
                </Box>
                <Box w={'253px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Button colorScheme={'blue'} variant={'outline'} onClick={() => _upVote(hotelName)}>Puan
                        Arttır</Button>
                    <Button colorScheme={'blue'} variant={'outline'} onClick={() => _downVote(hotelName)}>Puan
                        Azalt</Button>
                </Box>
            </VStack>
        </HStack>
        <ApproveModal isOpen={deleteItemDetail.isOpen}
                      hotelName={deleteItemDetail.name}
                      hotelIndex={deleteItemDetail.index}
                      close={(value) => setDeleteItemDetail({...deleteItemDetail, isOpen: value})}
                      deleteHotel={(index) => deleteHotel(index)}
        />
    </>
}

export default ListItem;
