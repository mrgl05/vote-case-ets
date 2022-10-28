import React, {useEffect, useState} from 'react'
import {Box, Center, VStack} from "@chakra-ui/react";
import ListItem from "../components/list-item";
import AddButtonArea from "../components/add-button-area";
import Pagination from "../components/pagination";
import SortSelect from "../components/sort-select";
import AddHotel from "./add-hotel";

function MainPage() {
    const [page, setPage] = useState(0);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('hotels')) ?? [])
    const [showData, setShowData] = useState([]);
    const [screen, setScreen] = useState('list');

    useEffect(() => {
        localStorage.setItem('hotels', JSON.stringify(data));
    }, [data])

    useEffect(() => {
        setShowData(data.slice(page, page + 5))
    }, [page, data])

    const getData = () => {
        setData(JSON.parse(localStorage.getItem('hotels')).sort((a, b) => a.vote - b.vote))
    }

    const createData = (obj) => {
        const localStorageData = data;
        if (!localStorageData) {
            localStorage.setItem('hotels', JSON.stringify([{name: obj, vote: 0, id: 1}]));
        } else {
            localStorage.setItem('hotels', JSON.stringify([...localStorageData, {
                name: obj,
                vote: 0,
                id: localStorageData.length + 1
            }]));
        }
        getData();
    }

    const upVote = (name) => {
        setData((prevState) => {
            return prevState.map((_item, _index) => {
                if (_item.name === name) {
                    return {..._item, vote: _item.vote + 1}
                }
                return _item;
            }).sort((a, b) => b.vote - a.vote)
        })
    }

    const downVote = (name) => {
        setData((prevState) => {
            return prevState.map((_item, _index) => {
                if (_item.name === name) {
                    return {..._item, vote: _item.vote - 1}
                }
                return _item;
            }).sort((a, b) => b.vote - a.vote)
        })
    }

    const deleteHotel = (index) => {
        setData((prevState) => {
            return prevState.filter((f) => f.id !== index)
        })
    }

    const sortData = (value) => {
        const a = [...data];
        if (value === 'asc') {
            a.sort((a, b) => a.vote - b.vote)
        } else if (value === 'desc') {
            a.sort((a, b) => b.vote - a.vote)
        }
        setData(a);
    }

    return <>
        <Center w={'100%'} h={'100vh'}>
            {screen === 'list' &&
                <VStack>
                    <Box w={'400px'} h={10} rounded={5} bg={'white'}>
                        <AddButtonArea click={(value) => setScreen(value)}/>
                    </Box>
                    {showData.length > 0 && <Box w={'400px'}>
                        <SortSelect sort={(value) => sortData(value)}/>
                    </Box>}
                    {data.length === 0 && <Box mt={5}>Kayıtlı Otel Bulunmamaktadır. Lütfen Otel Ekleyin!</Box>}
                    {showData.length > 0 &&
                        showData.map((hotel, hotelIndex) => {
                            return <ListItem key={`hotel_${hotelIndex}`} hotelName={hotel.name} hotelVote={hotel.vote}
                                             hotelIndex={hotel.id}
                                             _upVote={(name) => upVote(name)}
                                             _downVote={(name) => downVote(name)}
                                             deleteHotel={(index) => deleteHotel(index)}/>
                        })}
                    <Pagination data={data} setPage={(_value) => setPage(_value)}/>
                </VStack>}
            {screen === 'add' && <AddHotel setData={(obj) => createData(obj)} screen={(value) => setScreen(value)}/>}
        </Center>
    </>
}

export default MainPage;
