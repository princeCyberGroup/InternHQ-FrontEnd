import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DailyUpdateTableSectionSkeleton = () => {
  return (
    <tr>
                  <td><Skeleton width={18}/></td>
                  <td><Skeleton width={160}/></td>
                  <td><Skeleton width={190}/></td>
                  <td><Skeleton width={160}/></td>
                  <td>
                      <Skeleton width={240}/>
                      <Skeleton width={110}/>
                  </td>
                  <td>
                    <span className="d-flex ">
                    <Skeleton width={100}/>
                    <Skeleton width={20} height={20} className="ms-5" borderRadius={50} highlightColor="#28519E"/>
                    </span>
                  </td>
                </tr>
  )
}

export default DailyUpdateTableSectionSkeleton