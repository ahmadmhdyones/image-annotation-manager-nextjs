import Link from 'next/link';

// ----------------------------------------------------------------------

export default function ImagesUploadPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Upload Images</h1>
      <div className='max-w-lg'>
        {/* Upload form will be implemented later */}
        <div className='space-y-4'>
          <Link
            className='inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
            href='/dashboard/images'
          >
            Back to Images
          </Link>
        </div>
      </div>
    </div>
  );
}
