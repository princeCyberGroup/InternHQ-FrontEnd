import { useLocation, Link } from "react-router-dom";
import { ReactComponent as Chevron } from "../../Assets/Vectorchevron.svg";
import "./BreadCrumbs.css"
const BreadCrumbs = () => {
  const location = useLocation();
  // console.log(location);

  let currentLink = "";
  const crumbs = location.pathname;

  const crumbName=crumbs.split(/[\/-]/).filter((crumbs) => crumbs !== "")
    .map((crumb) => {
      currentLink = +`>${crumb}`;
      return (
        <>
          <Link to={currentLink} className="crumb-parent">{crumb}</Link>
        </>
      );
    });
    const crumbSimplified=crumbName[0].props.children.props.children
    const capital=()=>{

      const name=crumbSimplified.split("-").map((d)=>{
        return d.slice(0,1).toUpperCase()+d.slice(1).toLowerCase() +" ";
      })
      return name;
    }
  return (
    <div className="crumb">
      <Link to="/dashboard" className="crumb-parent">Dashboard</Link> <Chevron /> {capital()}
    </div>
  );
};

export default BreadCrumbs;
