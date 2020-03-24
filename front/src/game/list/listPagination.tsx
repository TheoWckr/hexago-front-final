import React from "react";
import Pagination from '@material-ui/lab/Pagination';
import detail from '../../data-mock/gameDetailMockList';
import ListCard from "./listCard";

const handleChange = (event: any, value: any) => {
    console.log(value);
};

const listPagination = () => {
    const numberPage = Math.floor(detail.length / 12) < 1 ? 1 : Math.floor(detail.length / 12);

    return (
        <div>
            <ListCard data={detail}/>
            <Pagination count={numberPage} onChange={handleChange}/>
        </div>
    );
};

export default listPagination;
