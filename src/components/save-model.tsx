import { Button } from "./ui/button";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

// SaveConfirmation component jo modal show karega
const SaveConfirmation = ({
  isOpen, //model open hai ya nhi
  onClose,  //model close krne ka function 
  onConfirm, //confirm krne ka function
  loading,
}: SaveModalProps) => {
  if (!isOpen) return null; // Hide when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Are you sure?</h2>
        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone. You won't be able to edit or re-answer this question again!
        </p>

        <div className="flex items-center justify-end w-full pt-6 space-x-2">
          <Button disabled={loading} variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-800"
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmation;
