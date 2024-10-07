import { FiSlash } from "react-icons/fi";
export default function CircleSlash() {
  return (
    <span className="me-1 position-relative">
      <FiSlash style={{ top: "2px" }}
        className="text-danger me-1 position-absolute fs-5" />
      <FiSlash className="text-white me-1 fs-6" />
    </span>
);}
