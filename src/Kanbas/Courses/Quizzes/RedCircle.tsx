import { FaCircle } from "react-icons/fa";
import { FiSlash } from "react-icons/fi";export default function RedCircle() {
  return (
    <span className="me-1 position-relative">
      <FiSlash style={{ top: "2px" }}
        className="text-danger me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
);}
