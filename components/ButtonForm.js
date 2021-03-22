export const ButtonForm = ({ type, disabled, disabledTrueStatus, disabledFalseStatus }) => (
  <button
    className='w-3/4 py-2 mx-4 text-lg text-center text-gray-100 transition duration-300 ease-in-out bg-gray-500 rounded-lg hover:shadow-md hover:bg-gray-400 hover:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-opacity-30 focus:ring-offset-2 disabled:opacity-70'
    type={type}
    disabled={disabled}>
    {disabled ? (disabledTrueStatus) : (disabledFalseStatus)}
  </button>
)