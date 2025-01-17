import { useState } from "react";

const Test = () => {
    const [pageNum, setPageNum] = useState(0);

    const nextPage = () => {
        let lastPage = 10;
        if(pageNum < lastPage) {
            setPageNum(currPage => currPage+1);
        }
    }

    const prevPage = () => {
        if(pageNum > 0) {
            setPageNum(currPage => currPage-1);
        }
    }
    
    return (
        <>
            <button className="btn btn btn-outline-primary" onClick={prevPage}>Previous page</button>
            <button className="btn btn btn-outline-primary" onClick={nextPage}>Next page</button>
            <p>{pageNum}</p>
        </>
    );
};
export default Test;