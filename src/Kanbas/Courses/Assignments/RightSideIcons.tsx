import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import AssignmentDeleter from "./AssignmentDeleter";
import { useSelector } from "react-redux";

export default function RightSideIcons({
    assignmentId,
    deleteAssignment,
    buttonId }:
    {
        assignmentId: string;
        deleteAssignment: (assignmentId: string) => void;
        buttonId: string;
    }) {
        const { currentUser } = useSelector((state: any) => state.accountReducer);
        const role = currentUser.role === "FACULTY";
    return (
        <div className="float-end">
            {role && <button className="btn btn-sm me-1" data-bs-toggle="modal" data-bs-target={`#${buttonId}`}>
                <FaTrash className="text-danger me-2 mb-1" />
            </button>}
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
            <AssignmentDeleter assignmentId={assignmentId}
                deleteAssignment={deleteAssignment}
                buttonId={buttonId} />
        </div>

    );
}