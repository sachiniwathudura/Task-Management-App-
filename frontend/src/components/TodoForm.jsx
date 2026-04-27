import { useState } from 'react';

export default function TodoForm({ onAdd, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required ❗");
      return;
    }

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    setError('');

    await onAdd({
      title: title.trim(),
      description: description.trim() || null
    });

    
    setTitle('');
    setDescription('');
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate aria-labelledby="add-todo-heading">
      <label id="add-todo-heading" className="visually-hidden">Add todo</label>

      {error && <p className="error">{error}</p>}

      <input
        id="new-title"
        name="title"
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(""); // clear error while typing
        }}
        disabled={loading}
        autoComplete="off"
        className={error ? "input-error" : ""}
      />

      <textarea
        id="new-description"
        name="description"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />

      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
