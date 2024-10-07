import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title" style={{paddingTop:"25px"}}>Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-5">
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-text">
                                        CS1234 React JS
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Fall 24 Section 02
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>


                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/2000/Home">
                                <img src="/images/artPic.jpg" width="100%" height={160} />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-text">
                                        ART2000 Intro to Art
                                    </h5>
                                    <p className="wd-dashboard-course-title card-text">
                                        Fall 24 Section 01
                                    </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/1100/Home">
                            <img src="/images/mathPic.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-text">
                                    MATH1100 Algebra 
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Fall 24 Section 05
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/4400/Home">
                            <img src="/images/physPic.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-text">
                                    SC4400 Physics
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Fall 24 Section 01
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/4320/Home">
                            <img src="/images/chemPic.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-text">
                                    SC4320 Chemistry
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Fall 24 Section 07
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/1010/Home">
                            <img src="/images/gymPic.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-text">
                                    SP1010 Gym
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Fall 24 Section 02
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/5500/Home">
                            <img src="/images/cyberPic.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-text">
                                    CS5500 Cybersecurity
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                Fall 24 Section 01
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
