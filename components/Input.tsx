type IProps = {
  label: string;
  placeholder: string;
  name: string;
  type: string;
  formRef: any; // not sure yet...
};

export const Input = (props: IProps) => (
  <div className=''>
    <label className='block font-semibold'>{props.label}</label>
    <input
      className='w-11/12 px-2 py-1 border border-gray-300 rounded-md md:w-4/5 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset'
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      ref={props.formRef}
    />
  </div>
);
