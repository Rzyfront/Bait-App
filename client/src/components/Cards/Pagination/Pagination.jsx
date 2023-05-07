import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';
import { useSelector } from 'react-redux';
function Pagination ({ handlePage }) {
  const { filters, searchName } = useSelector((state) => state);
  const { totalPages } = useSelector((state) => state.cards);
  const [activePage, setActivePage] = useState(0);

  const handlePageClick = (event) => {
    setActivePage(event.selected);
    handlePage(event.selected);
  };

  useEffect(() => {
    setActivePage(0);
    handlePage(activePage);
  }, [filters, searchName]);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName='Pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
        forcePage={activePage}
      />
    </>
  );
}
export default Pagination;
