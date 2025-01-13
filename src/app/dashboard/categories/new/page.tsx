export default function CategoriesNewPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Create New Category</h1>
      <div className='max-w-lg'>
        {/* Category form will be implemented later */}
        <div className='space-y-4'>
          <a
            className='inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors'
            href='/dashboard/categories'
          >
            Back to Categories
          </a>
        </div>
      </div>
    </div>
  );
}
