import React, {useState} from 'react';
import {Box, Button, Heading, Input, useToast, VStack} from "@chakra-ui/react";

function AddHotel({setData, screen}) {
    const toast = useToast();
    const [name, setName] = useState('');

    const validation = () => {
        if (name === '') {
            toast({
                title: 'Otel Oluşturulmadı.',
                description: "Otel adı girmeniz gerekmektedir.",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
            return false;
        }
        return true;
    }

    const save = () => {
        if (validation()) {
            setData(name);
            setName('');
            toast({
                title: 'Otel Oluşturuldu.',
                description: "Listeye yönlendiriliyorsunuz",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            setTimeout(() => {
                screen('list')
            }, 500)
        }
    }
    return <Box display={'flex'} flexDirection={'column'} w={'400px'}>
        <VStack justifyContent={'start'}>
            <Heading>Otel Adı</Heading>
            <Input placeholder={'Otel Adı'} value={name} onChange={(e) => {
                setName(e.target.value);
            }}/>
        </VStack>
        <Box w={'100%'} mt={2} display={'flex'} justifyContent={'end'}>
            <Button colorScheme={'red'} variant={'outline'} mr={1} onClick={() => screen('list')}>Listeye Dön</Button>
            <Button colorScheme={'blue'} variant={'outline'} onClick={save}>Ekle</Button>
        </Box>
    </Box>
}

export default AddHotel;
