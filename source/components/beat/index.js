export default (React) => {
  const PropTypes = React.PropTypes;

  const Beat = ({rh, lh, onSubmit}) => {
    let input_rh, input_lh;

    const clearInputs = () => {
      input_rh.value = '';
      input_lh.value = '';
    };

    const submitButtonAction = () => {
      const new_rh = Number(input_rh.value);
      const new_lh = Number(input_lh.value);
      onSubmit({new_rh, new_lh});
      clearInputs();
    };

    return (
      <div className='beat'>
        <div className='rh'>
          <label>Right Hand note count</label>
          <input type="number" placeholder={rh} min="1" ref={node => input_rh = node}/>
        </div>

        <div className='lh'>
          <label>Left Hand note count</label>
          <input type="number" placeholder={lh} min="1" ref={node => input_lh = node}/>
        </div>

        <button onClick={submitButtonAction}>Submit</button>
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
