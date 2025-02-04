'use client';

import { Todo } from '@/lib/types';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { Trash2, GripVertical, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface TodoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, className, ...props }: TodoItemProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50',
        className
      )}
      {...props}
    >
      <GripVertical className="h-5 w-5 cursor-grab text-muted-foreground" />
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="h-5 w-5"
      />
      <span
        className={cn('flex-1 text-sm', {
          'line-through text-muted-foreground': todo.completed,
        })}
      >
        {todo.text}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/todo/${todo.id}`)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}