import createMetronome from './components/metronome';
////////////////////////////////////

export default (React) => () => {
  const Metronome = createMetronome(React);

  return (
    <div>
      <Metronome />
    </div>
  );
};
