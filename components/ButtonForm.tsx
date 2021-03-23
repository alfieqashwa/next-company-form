type IProps = {
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled: boolean;
  disabledTrueStatus: string;
  disabledFalseStatus: string;
};

export const ButtonForm = ({
  type,
  disabled,
  disabledTrueStatus,
  disabledFalseStatus,
}: IProps) => (
  <div className='flex items-center justify-center'>
    <button
      className='w-3/5 py-2 text-lg text-center text-gray-100 transition duration-300 ease-in-out bg-gray-500 rounded-lg hover:shadow-md hover:bg-gray-400 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-opacity-30 focus:ring-offset-2 disabled:opacity-70'
      type={type}
      disabled={disabled}>
      {disabled ? disabledTrueStatus : disabledFalseStatus}
    </button>
  </div>
);
