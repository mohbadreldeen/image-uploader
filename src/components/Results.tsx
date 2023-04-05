import { useAtom } from 'jotai'
import { imageAtom, Image  } from '../store';
import CopyLink from './CoopyLink';
import checkIcon from '/assets/check-button.png'
const Results = () => {
    const [image, setImage] = useAtom(imageAtom);
    return (
        <div className="results">
            <img src={checkIcon} alt="check" width={`35px`} />
            <h1>Upload Successfully!</h1>
            <img className="preview-img" src={image.url} alt={image.name} />
             <CopyLink link={image.url} />
        </div>
    )
}   


export default Results;