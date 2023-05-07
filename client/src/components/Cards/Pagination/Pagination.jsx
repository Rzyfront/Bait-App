import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';
import { useSelector } from 'react-redux';
import { FcPrevious, FcNext } from 'react-icons/fc';
function Pagination ({ handlePage }) {
  const { filters, searchName } = useSelector((state) => state);
  const { totalPages } = useSelector((state) => state.cards);
  const [activePage, setActivePage] = useState(0);
  const [limit, setLimit] = useState(1);
  const handlePageClick = (event) => {
    setActivePage(event.selected);
    handlePage(event.selected);
    setLimit(Event.selected + 1);
  };

  useEffect(() => {
    setActivePage(0);
    setLimit(1);
    handlePage(activePage);
  }, [filters, searchName]);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={activePage !== totalPages - 1 ? <FcNext className='page-icon' /> : null}
        onPageChange={handlePageClick}
        marginPagesDisplayed={limit}
        pageRangeDisplayed={4} // Limita a 5 números de página
        pageCount={totalPages}
        previousLabel={activePage !== 0 ? <FcPrevious className='page-icon'/> : null}
        renderOnZeroPageCount={null}
        containerClassName='Pagination'
        pageLinkClassName='page-num'
        previousLinkClassName={activePage !== 0 ? 'page-icon' : null}
        nextLinkClassName={activePage !== totalPages - 1 ? 'page-icon' : null}
        activeLinkClassName='active'
        forcePage={activePage}
      />
    </>
  );
}
export default Pagination;
