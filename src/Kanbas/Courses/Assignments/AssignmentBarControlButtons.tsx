import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentBarControlButtons() {
  return (
    <div className="float-end">
        <span style={{ border: '2px solid gray', borderRadius: '10px', padding: '2px'}}>
                40% of Total</span> 
      <BsPlus className="fs-3"/>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}