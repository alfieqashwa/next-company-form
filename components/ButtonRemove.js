export const ButtonRemove = ({ onClick }) =>
  <button
    className="transition duration-300 ease-in-out hover:text-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
    type="button"
    onClick={onClick}>
    <svg
      className='w-6 h-6'
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={4}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  </button>