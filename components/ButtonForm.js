export const ButtonForm = ({ type, disabled, disabledTrueStatus, disabledFalseStatus }) => (
  <button
    className='w-full py-2 mt-8 text-lg text-center text-gray-100 transition duration-200 ease-in-out bg-gray-500 rounded-lg hover:bg-gray-400 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 disabled:opacity-70'
    type={type}
    disabled={disabled}>
    {disabled ? (disabledTrueStatus) : (disabledFalseStatus)}
  </button>
)