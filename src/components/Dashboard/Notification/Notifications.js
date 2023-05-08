import './Notification.css';


export const NotificationComponent = () => {
    return (
        <div className=" notification-card card">
            <div className="card-header">
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
            Technology: 'HTML 5'
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
        },{
            FullName: 'John Doe',
            Skill: 'Android Skill',
            Technology: 'Android'
        },
        {
            FullName: 'John Doe',
            Skill: 'HTML 5 Skill',
            Technology: 'HTML 5'
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
        <div className="">
            {data.map((user, key) => {
                return (
                    <div className='div-1'>
                        <div className="skills">
                            <b>{user.FullName}</b> has achieved <b>skill</b> on <b>{user.Skill}</b> on <b>{user.Technology}</b>
                            <div className="date">
                                02-06-2023
                            </div>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}