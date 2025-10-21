# Togglex

Простой React + TypeScript переключатель.

## Пример

```tsx
import { useState } from 'react';
import { Toggle } from '@your-scope/togglex';
import '@your-scope/togglex/dist/styles/toggle.css';

export function Example() {
  const [on, setOn] = useState(false);
  return (
    <Toggle
      checked={on}
      onChange={setOn}
      size="md"
      theme="auto"
      ariaLabel="Theme"
      onIcon="🌙"
      offIcon="☀️"
    />
  );
}
```

## Props

| Prop | Тип | Описание |
|------|-----|----------|
| checked | boolean | Controlled состояние |
| defaultChecked | boolean | Стартовое значение |
| onChange | (val:boolean)=>void | Коллбек изменения |
| size | 'sm' \| 'md' \| 'lg' | Размер |
| theme | 'light' \| 'dark' \| 'auto' | Темизация |
| onIcon/offIcon | ReactNode | Иконки внутри knob |
| disabled | boolean | Отключение |
| ariaLabel | string | Для доступности |

## Лицензия
MIT