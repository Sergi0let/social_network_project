import React, { useState } from 'react';
import cn from 'classnames';

import s from './Paginator.module.scss';

type PropsType = {
  totalUsersCount: number;
  onPageChanged: (pageNum: number) => void;
  currentPage: number;
  pageSize: number;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  onPageChanged,
  currentPage,
  pageSize,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages: Array<number> = Array.from(
    { length: pagesCount },
    (_, i) => i + 1
  );
  let portionCount: number = Math.ceil(pagesCount / portionSize);

  const [portionNum, setPortionNum] = useState(1);

  let leftPortionPageNumber = (portionNum - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNum * portionSize;
  return (
    <div className={s.paginator}>
      <div>
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
              className={cn({ [s.selectedPage]: currentPage === page })}
              onClick={() => onPageChanged(page)}
            >
              {page}
            </span>
          ))}
        {portionCount > portionNum && (
          <button onClick={() => setPortionNum(portionNum + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
