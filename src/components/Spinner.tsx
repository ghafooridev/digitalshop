import { Loader2 } from 'lucide-react';

const Spinner = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <span className="font-bold text-xl">Please Wait ...</span>
      <Loader2 size={48} className="text-9xl animate-spin" />
    </div>
  );
};

export default Spinner;
