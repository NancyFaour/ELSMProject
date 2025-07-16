type Category = {
  id?: number;
  name: string;
  courseCount?: number;
};

type Props = {
  data: Category[];
  onEdit: (category: Category) => void;
};

export default function CategoryTable({ data, onEdit}: Props) {
  return (
    <table className="category-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Course Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3}>No categories found.</td>
          </tr>
        ) : (
          data.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>{cat.courseCount ?? 0}</td>
              <td>
                <button onClick={() => onEdit(cat)}>✏️</button>
                <span title="Delete">🗑️</span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
