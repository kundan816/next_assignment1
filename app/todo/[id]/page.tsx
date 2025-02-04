'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Todo } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function TodoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const found = todos.find((t: Todo) => t.id === params.id);
    if (found) {
      setTodo(found);
      setEditText(found.text);
    }
  }, [params.id]);

  if (!todo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Todo not found</p>
      </div>
    );
  }

  const handleSave = () => {
    if (!editText.trim()) return;

    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = todos.map((t: Todo) =>
      t.id === todo.id ? { ...t, text: editText } : t
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    router.push('/');
  };

  const handleDelete = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = todos.filter((t: Todo) => t.id !== todo.id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    router.push('/');
  };

  const handleToggle = () => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = todos.map((t: Todo) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodo({ ...todo, completed: !todo.completed });
  };

  return (
    <div className="min-h-screen bg-background p-4 transition-colors">
      <div className="mx-auto max-w-2xl">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="rounded-lg border p-6">
          <div className="mb-6 flex items-center gap-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggle}
              className="h-5 w-5"
            />
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}