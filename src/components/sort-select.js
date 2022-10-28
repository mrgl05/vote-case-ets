import React from 'react';
import {Select} from "@chakra-ui/react";

function SortSelect({sort}) {
    return <Select my={3} placeholder={'Sıralama'} onChange={(e) => {
        sort(e.target.value)
    }}>
        <option value="asc">Puan(Artan)</option>
        <option value="desc">Puan(Azalan)</option>
    </Select>
}

export default SortSelect;
