export default (React) => {
  const PropTypes = React.PropTypes;

  const Beat = ({rh, lh, onSubmit}) => {
    return (
      <div className='beat'>
        <div className='rh'>
          <label>Right Hand Note Count</label>
          <input type="number" placeholder={rh} min="1" ref={node => {input_rh = node}}/>
        </div>

        <div className='lh'>
          <label>Left Hand Note Count</label>
          <input type="number" placeholder={lh} min="1" ref={node => {input_lh = node}}/>
        </div>

        <button
          onClick={() => {
            onSubmit(input_rh.value, input_lh.value);
            input_rh.value = '';
            input_lh.value = '';
          }}>
          Submit
        </button>
      </div>
        );
  };

  Beat.propTypes = {
    rh: PropTypes.number.isRequired,
    lh: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  return Beat;
};
