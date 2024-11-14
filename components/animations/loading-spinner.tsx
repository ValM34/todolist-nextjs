export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px-80px)]" data-testid="loading-spinner">
      <div className="animate-spin rounded-full h-40 w-40 border-b-4 border-gray-300"></div>
    </div>
  );
}
