import { BsGripVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
export default function AssignmentControlButtons() {
    return (
        <div className="float-start">
            <BsGripVertical className="me-2 fs-3" />
            <FaRegEdit className="text-success me-2 fs-3"/>
        </div>
    );
}