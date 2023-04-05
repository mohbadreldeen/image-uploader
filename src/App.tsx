import { useAtom } from 'jotai'

import Uploader from './components/Uploader'
import { stepAtom, progressAtom, errorAtom } from './store';

import Progress from './components/Progress';
import Results from './components/Results';
import Error from './components/Error';
import './App.css'



function App() {
  const [step, setStep] = useAtom(stepAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const [error, setError] = useAtom(errorAtom);

  return (
    <div className="App">
      <div className="card">
        { (step === 1) ? (<Uploader />) : null}
        { (step === 2) ? (<Progress percent={progress} />) : null}
        { (step === 3 && error.hasError === false) ? (<Results />) : null}
        { (step === 3 && error.hasError === true) ? (<Error />) : null}
        
      </div>
      <div className="copyright">Created by <a href="#">mohbadreldeen</a> - devChallenges.io</div>
    </div>
  )
}

export default App
