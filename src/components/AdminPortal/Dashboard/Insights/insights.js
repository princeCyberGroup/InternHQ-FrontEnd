import '../Insights/insights.css';
import { ReactComponent as Bullet } from "../Assets/bullet.svg"
export default function Insights(props) {
    console.log(props.data);
    return (
        <>
            <div className='col-4 main-div-insight'>
                <div className='about-insight col'>Insights</div>
                <div className=' insights '>
                    <div className='search-insights'>search</div>
                  
                        {props.data && props.data.map((insights) => {
                            return <>
                              <div className='div-insights'>
                            <div className='row'>
                                <div className='col image-div'>
                                <img src={insights.techLink} alt="Description of the image" />
                        
                                </div>
                                <div className='col'>
                                    <div className='exam-name'>{insights.techName}</div>
                                    <div className='number-of-test'>{insights.beginner} Beginner{" "}<Bullet /> {insights.intermediate} Intermediate {" "}<Bullet /> {insights.advanced} Advanced</div>
                                </div>
                            </div>
                            </div>
                            </>
                        })}


                    
                </div>
            </div>
        </>
    )
}