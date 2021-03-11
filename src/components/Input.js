export const Input = (props) => (
  <div className="">
    <label className="block">{props.label}</label>
    <input className="px-2 py-1 rounded-md" placeholder={props.placeholder} name={props.name} type={props.type} ref={props.formRef} />
  </div>
)