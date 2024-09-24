import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />

            <div id="wd-dashboard-courses">

                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1234/Home">
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5>
                                CS1234 React JS
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />

                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/2000/Home">
                        <img src="/images/artPic.jpg" width={200} />
                        <div>
                            <h5>
                                ART2000 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Intro To Art
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1100/Home">
                        <img src="/images/mathPic.jpg" width={200} />
                        <div>
                            <h5>
                                MATH1100 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Intro to Math
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />

                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/4400/Home">
                        <img src="/images/physPic.jpg" width={200} />
                        <div>
                            <h5>
                                SC4400 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Angular Physics
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />

                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/4320/Home">
                        <img src="/images/chemPic.jpg" width={200} />
                        <div>
                            <h5>
                                SC4320 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Chemistry
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />

                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1010/Home">
                        <img src="/images/gymPic.jpg" width={200} />
                        <div>
                            <h5>
                                SP1010 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Gym
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/5500/Home">
                        <img src="/images/cyberPic.jpg" width={200} />
                        <div>
                            <h5>
                                CS5500 
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Foundations of Cybersecurity
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <br />
                <hr />
                <br />
            </div>
        </div>
    );
}
