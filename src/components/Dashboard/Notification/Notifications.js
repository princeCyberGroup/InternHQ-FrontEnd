import './Notification.css';
import angular from '../Notification/angular.svg';

export const NotificationComponent = () => {
    return (
        <div className=" notification-card card">
            <div className="card-header-notification">
                Notifications
            </div>
            <NewNotifications />
        </div>
    )
}

export const NewNotifications = () => {

    const data = [
        {
            FullName: 'John Doe',
            Skill: 'Angular skill',
            Technology: 'Angular'
        },
        {
            FullName: 'John Doe',
            Skill: 'Android Skill',
            Technology: 'Android'
        },
        {
            FullName: 'John Doe',
            Skill: 'HTML 5 Skill',
            Technology: 'Html'
        },
        {
            FullName: 'John Doe',
            Skill: 'SQL Skill',
            Technology: 'SQL'
        },
        {
            FullName: 'John Doe',
            Skill: 'Angular Skill',
            Technology: 'Angular'
        }, {
            FullName: 'John Doe',
            Skill: 'Android Skill',
            Technology: 'android'
        },
        {
            FullName: 'John Doe',
            Skill: 'HTML 5 Skill',
            Technology: 'Html'
        },
        {
            FullName: 'John Doe',
            Skill: 'SQL Skill',
            Technology: 'SQL'
        },
        {
            FullName: 'John Doe',
            Skill: 'Angular Skill',
            Technology: 'Angular'
        },
    ];

    return (
        <>  {/* Notification parent */}
            {data.map((user, key) => {
                return (
                    <>
                    <div className='notification-wrapper'>
                        <div className='image-wrapper mt-1'>
                        <div className="image-box">
                            <img src={`https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/${user.Technology.toLowerCase()}/${user.Technology.toLowerCase()}.png`} width={32} alt="" />
                            </div>
                        </div>
                        <div className='text-wrapper mt-3'>
                            <p className='m-0'><b>{user.FullName}</b> has achieved <b>skill</b> on <b>{user.Skill}</b> on <b>{user.Technology}</b></p>
                            <p  className='m-0 date-wrapper'> 02-06-2023</p>
                        </div>
                        </div>
                     
                    </>
                )
            })}
        </>
    )
}