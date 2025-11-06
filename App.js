import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = () => {
    if (food.trim() === "" || calories === "") {
      alert("Please enter both food name and calories!");
      return;
    }

    const newItem = { id: Date.now(), food, calories: parseInt(calories) };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setTotal(total + newItem.calories);
    setFood("");
    setCalories("");
  };

  const deleteItem = (id, cal) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
    setTotal(total - cal);
  };

  return (
    <div className="container mt-5 p-4 rounded shadow-lg bg-light">
      <h2 className="text-center text-success mb-4">🍎 React Calorie Tracker</h2>

      <div className="row mb-3 justify-content-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter food name"
            value={food}
            onChange={(e) => setFood(e.target.value)}
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Enter calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          <button className="btn btn-success w-100" onClick={addItem}>
            Add Food
          </button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-4">
          <h4 className="text-center text-primary mb-3">Today's Calorie List</h4>
          <table className="table table-bordered table-striped text-center">
            <thead className="table-success">
              <tr>
                <th>Food Item</th>
                <th>Calories</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.food}</td>
                  <td>{item.calories}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteItem(item.id, item.calories)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="alert alert-info text-center fs-5">
            <b>Total Calories:</b> {total} kcal
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
