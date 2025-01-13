import Link from 'next/link';

// ----------------------------------------------------------------------

export default function ImagesDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Image Details</h1>
        <div className='space-x-2'>
          <Link
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
            href={`/dashboard/images/${params.id}/canvas`}
          >
            Open in Canvas
          </Link>
          <Link
            className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
            href='/dashboard/images'
          >
            Back to Images
          </Link>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='border rounded-lg p-4'>{/* Image preview will be implemented later */}</div>
        <div className='border rounded-lg p-4'>{/* Image metadata and annotations will be implemented later */}</div>
      </div>
    </div>
  );
}
