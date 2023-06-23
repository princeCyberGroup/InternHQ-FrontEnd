// import React from "react";

// const Pagination = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//   const [resultsPerPage, setResultsPerPage] = useState(10);
//   const totalPages = Math.ceil(tableData.length / resultsPerPage);
//   const startIndex = (currentPage - 1) * resultsPerPage;
//   const endIndex = startIndex + resultsPerPage;
//   const currentResults = tableData.slice(startIndex, endIndex);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo(0, 0); //To scroll all the way up whenever page gets clicked
//   };
//   const handlePrevPageChange = () => {
//     if (currentPage != 1) {
//       setCurrentPage(currentPage - 1);
//     }
//     window.scrollTo(0, 0);
//   };
//   const handleNextPageChange = () => {
//     if (currentPage != totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//     window.scrollTo(0, 0);
//   };

//   const handleResultsPerPageChange = (event) => {
//     setResultsPerPage(event.target.value);
//     setCurrentPage(1);
//   };
//   return (
//     <div className="d-flex justify-content-end" style={{ color: "#706F73" }}>
//       <div className="d-flex align-items-center">
//         <p className="me-2 mb-0" style={{ whiteSpace: "nowrap" }}>
//           Results per page
//         </p>
//         <select
//           className="form-select m-2"
//           value={resultsPerPage}
//           onChange={handleResultsPerPageChange}
//         >
//           <option value="10">10</option>
//           <option value="20">20</option>
//           <option value="30">30</option>
//         </select>
//         <ul className="pagination mb-0">
//           <li
//             className={`page-item me-1 ${
//               currentPage === 1 ? "page-item disabled" : ""
//             }`}
//           >
//             <button className="page-link" onClick={handlePrevPageChange}>
//               <span>&lt;</span>
//             </button>
//           </li>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <li
//               key={page}
//               className={`page-item me-1 ${
//                 page === currentPage ? "active" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(page)}
//               >
//                 {page}
//               </button>
//             </li>
//           ))}
//           <li
//             className={`page-item ${
//               currentPage === totalPages ? "page-item disabled" : ""
//             }`}
//           >
//             <button className="page-link" onClick={handleNextPageChange}>
//               <span>&gt;</span>
//             </button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
