type Category = {
  id?: number;
  name: string;
  courseCount?: number;
};

type Props = {
  data: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id?: number) => void;
};

export default function CategoryTable({ data, onEdit, onDelete }: Props) {
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
                <button onClick={() => onEdit(cat)} title="Edit">✏️</button>
                <button onClick={() => onDelete(cat.id)} title="Delete">🗑️</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
