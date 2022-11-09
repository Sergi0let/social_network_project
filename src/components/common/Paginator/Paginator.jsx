import React from 'react';
import { useState } from 'react';

import s from './Paginator.module.scss';

const Paginator = ({
  totalUsersCount,
  onPageChanged,
  currentPage,
  pageSize,
  portionSize = '10',
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  let portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNum, setPortionNum] = useState(1);
  let leftPortionPageNumber = (portionNum - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNum * portionSize;
  return (
    <div className={s.paginator}>
      {portionNum > 1 && (
        <button onClick={() => setPortionNum(portionNum - 1)}>Prev</button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page, index) => (
          <span
            key={index}
            className={currentPage === page && s.selectedPage}
            onClick={() => onPageChanged(page)}
          >
            {page}
          </span>
        ))}
      {portionCount > portionNum && (
        <button onClick={() => setPortionNum(portionNum + 1)}>Next</button>
      )}
    </div>
  );
};

export default Paginator;
