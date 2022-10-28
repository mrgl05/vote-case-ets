import React, {useEffect, useState} from 'react';
import {Box, Button, Text} from "@chakra-ui/react";

function Pagination({data, setPage}) {
    const [a, setA] = useState([]);
    const [_index, _setIndex] = useState(1)

    useEffect(() => {
        paginationOperation();
    }, [])

    const renderPagination = () => {
        if (data) {
            const steps = [];
            const totalPage = Math.ceil(data.length / 5);
            for (let i = 1; i <= totalPage; i++) {
                steps.push(<Button size={'sm'}
                                   colorScheme={'blue'}
                                   variant={i === _index ? 'solid' :  'outline'}
                                   key={`pagination_${i}`}
                                   mr={1}
                                   onClick={() => setPagination(i)}>
                    {i}
                </Button>)
            }
            return steps;
        }
    }

    const paginationOperation = () => {
        let count = 1;
        const cA = [];
        const totalPage = Math.ceil(data.length / 5);
        for (let i = 1; i <= totalPage; i++) {
            if (i === 1 || i === 2) {
                cA.push(-1);
            }
            if (i > 2) {
                cA.push(count);
                count = count + 2;
            }
        }
        setA(cA);
    }

    const setPagination = (_value) => {
        if (_value === 1) {
            setPage((_value * 0) + 0)
        } else if (_value === 2) {
            setPage((_value * 2) + 1)
        } else if (_value > 2) {
            const h = a[_value - 1];
            setPage((_value * 2) + (_value + h));
        }
        _setIndex(_value)
    }

    return <Box w={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'center'}>
        {renderPagination()}
    </Box>
}

export default Pagination;