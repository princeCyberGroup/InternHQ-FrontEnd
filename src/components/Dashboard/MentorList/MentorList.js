import "./mentorlist.css";

export const MentorComponent = () => {
  return (
    <>
      <div className="card" style={{ height: "370px", alignContent: "center" }}>
        <div className="border-bottom ">
          <h5 className="card-title dtt-hfs">Know Your Mentors</h5>
        </div>
        <div className="box-shadow d-flex justify-content-center align-item-center">
          <div
            id="carouselExampleDark"
            class="crousel slide "
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="0"
                class="bg-dark active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                class="bg-dark "
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                class="bg-dark "
              ></button>
            </div>
            <div class="carousel-inner crousal-set" role="listbox">
              <div
                class="carousel-item active border"
            
              >
                <div class="card-body pt-4">
                  <img
                    src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1"
                    class="d-block rounded-circle"
                    alt="..."
                  />
                  <div className="mentor-text">
                    <p class="card-text fs">
                      <b>1. Iron Man</b>
                    </p>
                    <p className="role-fs">Senior Developer</p>
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
              <div class="carousel-item border">
                <div class="card-body pt-4 ">
                  <img
                    src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1"
                    class="d-block rounded-circle"
                    alt="..."
                  />
                  <div className="mentor-text">
                    <p class="card-text fs">
                      <b>2. Iron Man</b>
                    </p>
                    <p className="role-fs">Senior Developer</p>
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
              <div class="carousel-item border ">
                <div class="card-body pt-4 ">
                  <img
                    src="https://th.bing.com/th/id/OIP.08bGE4YPB9q_OZ9hS45YpgHaGm?pid=ImgDet&rs=1"
                    class="d-block rounded-circle"
                    alt="..."
                  />
                  <div className="mentor-text">
                    <p class="card-text fs">
                      <b>3. Iron Man</b>
                    </p>
                    <p className="role-fs">Senior Developer</p>
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
            </div>
          </div>
        </div>
        <br />

        {/* <div className="text-center">
          <div class="carousel-indicators">
            <button
              data-mdb-target="#carouselExampleIndicators"
              data-mdb-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              data-mdb-target="#carouselExampleIndicators"
              data-mdb-slide-to="1"
              aria-label="Slide 1"
            ></button>
            <button
              data-mdb-target="#carouselExampleIndicators"
              data-mdb-slide-to="2"
              aria-label="Slide 1"
            ></button>
          </div>
        </div> */}
      </div>
    </>
  );
};
