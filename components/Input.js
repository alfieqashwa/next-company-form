export const Input = (props) => (
  <div className="px-2">
    <label className="block font-semibold">{props.label}</label>
    <input className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset" placeholder={props.placeholder} name={props.name} type={props.type} step={props.step} ref={props.formRef} />
  </div>
)