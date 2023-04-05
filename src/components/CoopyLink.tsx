import { useState } from "react";
const CopyLink = ({link}:{link:string}) => {

    const [copied, setCopied] = useState(false);
    
    const copy = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }
        , 2000);

    }

    return (
        <div className="copy-link">
            <input  type="text" readOnly value={link} />
            <button className={copied?'copied':''} onClick={copy}>Copy Link</button>
        </div>
    )
}

export default CopyLink;
