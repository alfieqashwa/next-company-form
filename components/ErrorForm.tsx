export const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='ml-2 text-xs text-red-400'>{errorMessage}</p>;
};
