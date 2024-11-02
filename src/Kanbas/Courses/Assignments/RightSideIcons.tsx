import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import AssignmentDeleter from "./AssignmentDeleter";

export default function RightSideIcons({ assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; }) {
    return (
        <div className="float-end">
            <button className="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog">
                <FaTrash className="text-danger me-2 mb-1" />
            </button>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            <AssignmentDeleter assignmentId={assignmentId}
                deleteAssignment={deleteAssignment} />
        </div>

    );
}