export default function Input({id,labelName, ...props}){
    return <p className="control">
        <label htmlFor={id}>{labelName}</label>
        <input id={id} name={id} required {...props}/>
    </p>
}