export default (React) => {
  const TickAssignment = (props) => {
    return (
      <div className="tickAssignment">
        <label>===================================</label>
        <h3>TickAssignment</h3>
        <div className="tickCount">
          <label>tickCount</label>
        </div>
        <div className="rhTickIndices">
          <label>rhTickIndices</label>
        </div>
        <div className="lhTickIndices">
          <label>lhTickIndices</label>
        </div>
      </div>
    );
  };
  return TickAssignment;
};

