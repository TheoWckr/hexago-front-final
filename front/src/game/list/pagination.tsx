import React from "react";
import detail from '../../data-mock/gameDetailMockList';
import ListCard from "./listCard";

const Pagination = () => {
    return (
        <div>
            <ListCard data={detail}/>
        </div>
    );
};

export default Pagination;
