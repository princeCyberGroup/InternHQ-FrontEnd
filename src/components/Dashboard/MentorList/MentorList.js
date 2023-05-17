import "./mentorlist.css"

export const MentorComponent = () => {
    return (
        <>
            <div className="card" style={{ height: "370px", alignContent: "center", }}>
            <div className="border-bottom ">
                <h5 className="card-title dtt-hfs">Know Your Mentors</h5>
              </div>
                {/* <div className="card box-shadow"> */}
                <div id="carouselExampleIndicators" class="carousel slide wrapper-cr" data-bs-ride="carousel" style={{
                }}>
                    <div class="carousel-inner crousal-set"
                    >
                        <div class="carousel-item active m-auto" style={{ margin: 'auto' }}>
                            <div class="card-body card-dims">
                                <img src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1" class="d-block rounded-circle" alt="..." />
                                <div className="mentor-text">
                                    <p class="card-text"><b>Iron Man</b></p>
                                    <p>Senior Developer</p>
                                    <div className="row">
                                        <div className=" flex">
                                            <span class="badge badge-color">Primary</span>
                                            <span class="badge badge-color">Secondary</span>
                                            <span class="badge badge-color">Danger</span>
                                            <span class="badge badge-color">Primary</span>
                                            <span class="badge badge-color">Secondary</span>
                                            <span class="badge badge-color">Danger</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item" style={{ margin: 'auto' }}>
                            <div class="card-body card-dims">
                                <img src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1" class="d-block rounded-circle" alt="..." />
                                <div className="mentor-text">
                                    <p class="card-text"><b>Iron Man</b></p>
                                    <p>Senior Developer</p>
                                    <div className="row">
                                        <div className=" flex">
                                            <span class="badge badge-color">Primary</span>
                                            <span class="badge badge-color">Secondary</span>
                                            <span class="badge badge-color">Danger</span>
                                            <span class="badge badge-color">Primary</span>
                                            <span class="badge badge-color">Secondary</span>
                                            <span class="badge badge-color">Danger</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item" style={{ margin: 'auto' }}>
                            <div class="card-body card-dims">
                                <img src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1" class="d-block rounded-circle" alt="..." />
                                <div className="mentor-text">
                                    <p class="card-text"><b>Iron Man</b></p>
                                    <p>Senior Developer</p>
                                    <div className="flex">
                                        <span class="badge badge-color">Primary</span>
                                        <span class="badge badge-color">Secondary</span>
                                        <span class="badge badge-color">Danger</span>
                                        <span class="badge badge-color">Warning</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {/* </div> */}
                < br />
                <div className="text-center" >
                    <div class="carousel-indicators">
                        <button type="button" style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#000000' }} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#C4C4C4' }} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: '#C4C4C4' }} data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                </div>
            </div >
        </>
    )
}