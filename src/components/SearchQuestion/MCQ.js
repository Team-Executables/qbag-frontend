const MCQ = (props) => {
    const data = props.data;
    return <ol>{data.map(option => <li>{option.option}</li>)}</ol>;
}
 
export default MCQ;