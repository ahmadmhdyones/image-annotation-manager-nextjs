export default function CategoriesEditPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Edit Category</h1>
      <div>
        <div>
          <a href='/dashboard/categories'>Back to Categories</a>
        </div>
      </div>
    </div>
  );
}
