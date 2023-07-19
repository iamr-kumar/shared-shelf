export const ErrorCard: React.FC<{ error: string }> = ({
  error,
}: {
  error: string;
}) => {
  return (
    <div className="w-screen flex justify-center mt-4">
      <div className="py-2 px-4 border border-red-600 bg-red-400 rounded">
        <span className="font-medium text-lg text-white">{error}</span>
      </div>
    </div>
  );
};
