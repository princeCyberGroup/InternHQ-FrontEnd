import '../Insights/insights.css';
import { ReactComponent as Bullet } from "../Assets/bullet.svg"
export default function Insights() {
    return (
        <>
            <div className='col-4'>
                <div className='about-insight col'>Insights</div>
                <div className=' insights '>
                    <div className='search-insights'>search</div>
                    <div className='div-insights'>
                    <div className='row'>
                            <div className='col image'>
                                
                            </div>
                            <div className='col'>
                                <div className='exam-name'>React</div>
                                <div className='number-of-test'>5  Beginner{" "}<Bullet /> 6 Intermediate {" "}<Bullet /> 3 Advanced</div>
                            </div>
                        </div>
                    </div>
                </div>



            </div></>
    )
}