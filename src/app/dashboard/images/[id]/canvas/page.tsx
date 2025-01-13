export default function ImagesCanvasPage({ params }: { params: { id: string } }) {
  return (
    <div className='h-screen flex flex-col'>
      <div className='border-b p-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Image Annotation Canvas</h1>
        <div className='space-x-2'>
          <a
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
            href={`/dashboard/images/${params.id}`}
          >
            Back to Details
          </a>
        </div>
      </div>
      <div className='flex-1 flex'>
        <div className='flex-1 bg-gray-100'>{/* Canvas will be implemented later */}</div>
        <div className='w-80 border-l p-4'>{/* Annotation tools will be implemented later */}</div>
      </div>
    </div>
  );
}
