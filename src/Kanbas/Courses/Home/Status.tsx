import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaBars, FaBullhorn, FaBell } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoBarChart } from "react-icons/io5";
import { LiaFileImportSolid } from "react-icons/lia";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish </button>
        </div>
      </div><br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdHome className="me-2 fs-5" /> Choose Home Page </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBars className="me-2 fs-5" /> View Course Stream </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBullhorn className="me-2 fs-5" /> New Announcement </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoBarChart className="me-2 fs-5" /> New Analytics </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaBell className="me-2 fs-5" /> View Course Notifications </button>
    </div>
  );
}


/*
<div>

    <div id="wd-course-status">
      <h2>Course Status</h2>
      <button>Unpublish</button> <button>Publish</button>
      <br />
      <br /><button>Import Existing Content</button>
      <br /><button>Import From Commons</button>
      <br /><button>Choose Home Page</button>
      <br /><button>View Course Stream</button>
      <br /><button>New Announcement</button>
      <br /><button>New Analytics</button>
      <br /><button>View Course Notifications</button>
      
    </div>
    </div>
    */