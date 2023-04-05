
const Progress = ({ percent } : {percent: number}) => {
    return (

        <div className="progress-card">
            <h2>Uploading...</h2>
            <div className="progress">
                <div className="progress-bar" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
};
export default Progress;