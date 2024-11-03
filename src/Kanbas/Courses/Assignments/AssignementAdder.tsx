export default function AssignmentAdder({
  dialogTitle,
  assignmentName,
  setAssignmentName,
  addAssignment,
  setDescription,
  setPoints,
  setDueDate,
  setAvailableFromDate,
  setAvailableUntilDate,
}:
  {
    dialogTitle: string;
    assignmentName: string;
    setAssignmentName: (name: string) => void;
    addAssignment: () => void;
    setDescription: (description: string) => void;
    setPoints: (points: number) => void;
    setDueDate: (date: string) => void;
    setAvailableFromDate: (date: string) => void;
    setAvailableUntilDate: (date: string) => void;
  }) {
  return (
    <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-3"
              value={assignmentName}
              placeholder="Assignment Name"
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <input
              className="form-control mb-3"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Points"
              onChange={(e) => setPoints(Number(e.target.value))}
            />
              <label htmlFor="dueDate" className="form-label">Due Date:</label>
              <input
                id="dueDate"
                type="datetime-local"
                className="form-control mb-3"
                onChange={(e) => setDueDate(e.target.value)}
              />
              <label htmlFor="availableFromDate" className="form-label">Available From Date:</label>
              <input
                id="availableFromDate"
                type="datetime-local"
                className="form-control mb-3"
                onChange={(e) => setAvailableFromDate(e.target.value)}
              />
              <label htmlFor="availableUntilDate" className="form-label">Available Until Date:</label>
              <input
                id="availableUntilDate"
                type="datetime-local"
                className="form-control"
                onChange={(e) => setAvailableUntilDate(e.target.value)}
              />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              Add Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
