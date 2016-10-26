export default (React) => {
  const TickAssignment = (props) => {
    const PropTypes = React.PropTypes;

    TickAssignment.propTypes = {
      tickCount: PropTypes.number.isRequired,
      rhTickIndices: PropTypes.number.isRequired,
      lhTickIndices: PropTypes.number.isRequired
    };
    const {tickCount, rhTickIndices, lhTickIndices} = props;

    return (
      <fieldset id='tickAssignmentFieldset'>
        <div className="tickAssignment">
          <h3>Ticks</h3>
          <div className="tickCount">
            <label>Tick Count: {tickCount ? tickCount.toString() : "--"}</label>
          </div>
          <div className="rhTickIndices">
            <label>Right-Hand Indices: {rhTickIndices ? rhTickIndices.toString() : "--"}</label>
          </div>
          <div className="lhTickIndices">
            <label>Left-Hand Indices: {lhTickIndices ? lhTickIndices.toString() : "--"}</label>
          </div>
        </div>
      </fieldset>
    );
  };
  return TickAssignment;
};

