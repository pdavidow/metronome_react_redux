let isTesting = false;

const audioTestStart = () => isTesting = true;
const audioTestEnd = () => isTesting = false;

const normalDestination = ({audioContext}) => audioContext.destination;
const testDestination = ({audioContext}) => audioContext.createAnalyser();

const getDestination = ({audioContext}) => isTesting ?
  testDestination({audioContext}) : normalDestination({audioContext});

export {
  audioTestStart,
  audioTestEnd,
  getDestination
};
