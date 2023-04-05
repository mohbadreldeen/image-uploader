import axios from 'axios';
import { useAtom } from 'jotai'
import { dragOverAtom, progressAtom, stepAtom, imageAtom, Image, UploadError, errorAtom  } from '../store';
import placeholder from '/assets/image.svg'
const Uploader = () => {
    const [dragOver, setDragOver] = useAtom(dragOverAtom);
    const [progress, setProgress] = useAtom(progressAtom);
    const [step, setStep] = useAtom(stepAtom);
    const [image, setImage] = useAtom(imageAtom);
    const [error, setError] = useAtom(errorAtom);


    const handleFiles = (files: any) => {
        
        let formData = new FormData();
        formData.append("image", files[0]);
        var config = {
          onUploadProgress: function(progressEvent: any) {
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            setProgress(percentCompleted)
          }
        };
        axios.post('/upload', formData, config)
        .then(function (res) {
            if (res.data.success) {
                
                setImage(new Image(res.data.name, res.data.size, res.data.type, res.data.url))
                setError(new UploadError('', false))
                setStep(3);
            } else {
                setImage(new Image('', 0, '', ''))
                setError(new UploadError(res.data.message, true))
                setStep(3);
            }
        })
        .catch(function (err) { });
    }
    
    const drageOverHandler = (e: any) => {
    
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true)
    }
    
    const drageLeaveHandler = (e: any) => {
    
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false)
    }

    const drop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setStep(2);
        setDragOver(false)
        const files = e.dataTransfer.files
        handleFiles(files)
    }
    const handleFileInput = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setStep(2);
        const files = e.target.files
        handleFiles(files)
    }   

    return(
        <>
            <h1>Upload your image</h1>
            <p>File should be Jpeg, Png,...</p>
            <div className={dragOver? 'drop-area highlight' : 'drop-area'} 
                onDragOver={drageOverHandler}
                onDragEnter={drageOverHandler}
                onDragLeave={drageLeaveHandler}
                onDrop={drop}
            >
                <img src={placeholder} width="114.13px" height="88.24px"/>
                <p>Drag & Drop  your imaage here</p>
            </div>
            <span className="or">Or</span>
            <div className="file-area">
                <input onChange={handleFileInput} type="file" id="file" />
            </div>
        </>
    )
}

export default Uploader;