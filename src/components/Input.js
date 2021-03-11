export const Input = (props) => (
  <div className="px-2">
    <label className="block font-semibold">{props.label}</label>
    <input className="px-2 py-1 border border-gray-300 rounded-md" placeholder={props.placeholder} name={props.name} type={props.type} ref={props.formRef} />
  </div>
)