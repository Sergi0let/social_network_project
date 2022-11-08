import React from 'react';

import s from './Paginator.module.scss';

const Paginator = ({
  totalUsersCount,
  onPageChanged,
  currentPage,
  pageSize,
}) => {
  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      {pages.map((page) => (
        <span
          className={currentPage === page && s.selectedPage}
          onClick={() => onPageChanged(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
