'use client';

type Category = {
  id: number;
  name: string;
  courseCount: number;
};

type Props = {
  data: Category[];
};

export default function CategoryTable({ data }: Props) {
  const handleEdit = (id: number) => {
    console.log('Edit category', id);
    // Open modal or navigate to edit form
  };

  const handleDelete = (id: number) => {
    console.log('Delete category', id);
    // Show confirmation and send delete request to backend
  };

  return (
    <table className="category-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Course Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={4}>No categories found.</td>
          </tr>
        ) : (
          data.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.courseCount}</td>
              <td className="action-icons">
                <span onClick={() => handleEdit(cat.id)} title="Modify">✏️</span>
                <span onClick={() => handleDelete(cat.id)} title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
