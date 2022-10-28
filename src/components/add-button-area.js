import React from 'react';
import {Button, Heading, HStack, Text} from "@chakra-ui/react";

function AddButtonArea({click}) {
    return <HStack>
        <Button colorScheme={'blue'} variant={'outline'} onClick={() => {
            click('add')
        }}>
            <Text>Ekle</Text>
        </Button>
        <Heading>
            OTEL EKLE
        </Heading>
    </HStack>
}

export default AddButtonArea;
