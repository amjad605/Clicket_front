const AdminEventCardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 animate-pulse"></div>

        <div className="p-5 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse mb-3"></div>

            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>

            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>

            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventCardSkeleton;
