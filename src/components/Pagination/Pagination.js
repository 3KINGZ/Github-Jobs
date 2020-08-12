import React from "react";
import "./Pagination.css";

const Pagination = ({ jobsPerPage, totalJobs, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalJobs.length < 1) {
    return <p>hiyaa</p>;
  }

  console.log(pageNumbers);

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} href="#top">
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
