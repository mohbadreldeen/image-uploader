import { useAtom } from 'jotai'
import errorImg from '/assets/error.png';
import { UploadError, stepAtom, progressAtom, errorAtom } from '../store';

const Error = () => {
    const [step, setStep] = useAtom(stepAtom);
    const [progress, setProgress] = useAtom(progressAtom);
    const [error, setError] = useAtom(errorAtom);
    const goBack = (e: any) => {
        e.preventDefault();
        setError(new UploadError('', false))
        setStep(1);
        setProgress(0);
    }
    return (
    <div className="error">
        <img src={errorImg} width={`35px`} alt="error" />
        <h1>Something went wrong!</h1>
        <p>{error.message}</p>
        <button onClick={goBack}>Go Back</button>

    </div>
    );
}
export default Error;