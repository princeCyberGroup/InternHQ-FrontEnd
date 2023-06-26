import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManageSkillTestSkeleton = () => {
  return (
    <tr>
      <td className="technology-rows">
        <Skeleton width={84} height={16} />
      </td>
      <td className="name-row">
        <Skeleton width={287} height={16} />
      </td>
      <td className="levels-row">
        <Skeleton width={100} height={16} />
      </td>
      <td className="questions-row">
        <Skeleton width={36} height={16} />
      </td>
      <td className="duration-row">
        <Skeleton width={80} height={16} />
      </td>
      <td className="uploaded-on-row">
        <Skeleton width={152} height={16} />
      </td>
      <td className="delete-btn-row">
        <button type="button" style={{ border: "none", background: "none" }}>
          <Skeleton width={16} height={16} />
        </button>
      </td>
    </tr>
  );
};

export default ManageSkillTestSkeleton;
