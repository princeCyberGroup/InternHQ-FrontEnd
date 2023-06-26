import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReportTableSkeleton = () => {
  return (
    <tbody>
            <tr className="report-table-tr">
            <td className="d-flex justify-content-center align-items-center" style={{height: "54px"}}> <Skeleton width={18}/></td>
              <td style={{ width: "20.375rem" }}>
                <div className="name-column">
                  {/* <div> */}
                    <Skeleton
                      width={38}
                      height={38}
                      borderRadius={50}
                      style={{ marginRight: "0.5rem" }}
                      highlightColor="#97c0c5"
                    />
                  {/* </div> */}
                  <div className="tags">
                    <div className="tag1">
                      <Skeleton width={100} height={12}/>
                    </div>
                    <div className="tag2">
                      <Skeleton width={50} height={10}/>
                    </div>
                  </div>
                </div>
              </td>
              <td style={{ width: "20.875rem" }}>
              <div className="skills-wrapper">
              <span className="skills">
                <Skeleton width={73} height={24} highlightColor="#B2B2B3" /> &nbsp;
                 <Skeleton width={73} height={24} highlightColor="#B2B2B3" /> &nbsp;
                 <Skeleton width={73} height={24} highlightColor="#B2B2B3" /> &nbsp;
                 <Skeleton width={73} height={24} highlightColor="#B2B2B3" /> &nbsp;
                 <Skeleton width={73} height={24} highlightColor="#B2B2B3" /> &nbsp;
                 <Skeleton width={22} height={24} highlightColor="#28519E" />
                </span>
                </div>
              </td>
              <td style={{ width: "20.375rem" }}>
                <div className="skills-wrapper">
                  <span className="skills">
                     <Skeleton width={78} /> &nbsp;
                    &nbsp;  <Skeleton width={88} /> &nbsp;
                    &nbsp;  <Skeleton width={84} />
                  </span>
                </div>
              </td>
              <td style={{ width: "11.375rem" }}>
                <div className="duration">
                  <Skeleton width={100}/>
                </div>
              </td>
            </tr>
          </tbody>
  )
}

export default ReportTableSkeleton