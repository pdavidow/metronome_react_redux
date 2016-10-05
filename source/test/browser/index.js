// browserify -t babelify index.js | browser-run -p 3000

import './model/metronome';
import './components/beat';
import './components/metronomeSetting';

// todo need better solution
import './components/beatPlayer'; // should come last such that embeddedAudioTest in async does not confuse other tests

