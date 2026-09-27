# 🎓 React Fundamentals Guide

> **For Beginners:** Everything you need to understand this project!

---

## 🤔 What is React?

React is a **JavaScript library** for building user interfaces. Think of it like LEGO blocks 🧱:
- Each block is a **component**
- You combine blocks to build bigger things
- You can reuse blocks in different places

---

## 🧩 Components - The Building Blocks

### What's a Component?

A component is a **reusable piece of UI**. It's just a function that returns HTML-like code (JSX).

```jsx
// A simple component
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

// Using it
<Greeting />
```

### Function Components vs Class Components

**Modern way (Function Components):** ✅
```jsx
const MyComponent = () => {
  return <div>Hello!</div>;
};
```

**Old way (Class Components):** ❌ (We don't use these anymore)
```jsx
class MyComponent extends React.Component {
  render() {
    return <div>Hello!</div>;
  }
}
```

---

## 📦 Props - Passing Data to Components

Props are like **function arguments** for components.

```jsx
// Defining a component with props
const UserCard = ({ name, age }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

// Using it with props
<UserCard name="John" age={25} />
<UserCard name="Jane" age={30} />
```

**Think of it like:**
```
UserCard(name="John", age=25)  →  <div><h2>John</h2><p>Age: 25</p></div>
```

---

## 🔄 State - Data That Changes

State is **data that can change** over time. When state changes, React re-renders the component.

```jsx
import { useState } from 'react';

const Counter = () => {
  // Declare state: [currentValue, functionToUpdateIt]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add 1
      </button>
    </div>
  );
};
```

**The Flow:**
```
1. count starts at 0
2. User clicks button
3. setCount(1) is called
4. React re-renders with count = 1
5. User sees "Count: 1"
```

---

## 🪝 Hooks - Special React Functions

Hooks are functions that let you "hook into" React features.

### useState - Remember Values

```jsx
const [value, setValue] = useState(initialValue);
```

### useEffect - Do Something When Things Change

```jsx
useEffect(() => {
  // This runs after render
  console.log('Component rendered!');
  
  // This runs on cleanup (component unmounts)
  return () => {
    console.log('Goodbye!');
  };
}, [dependency]); // Only re-run if dependency changes
```

**Common Use Cases:**
```jsx
// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when userId changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);

// Run on every render (no dependency array)
useEffect(() => {
  console.log('Rendered!');
});
```

### useRef - Access DOM Elements

```jsx
const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

return <input ref={inputRef} />;
```

### useCallback - Remember Functions

```jsx
// Without useCallback - new function every render
const handleClick = () => { ... };

// With useCallback - same function unless deps change
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);
```

### useMemo - Remember Calculated Values

```jsx
// Without useMemo - calculates every render
const total = items.reduce((sum, item) => sum + item.price, 0);

// With useMemo - only recalculates when items change
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);
```

---

## 📝 JSX - HTML in JavaScript

JSX looks like HTML but it's actually JavaScript!

### Basic JSX

```jsx
const element = <h1>Hello, World!</h1>;
```

### JSX with JavaScript Expressions

```jsx
const name = "John";
const element = <h1>Hello, {name}!</h1>;
// Renders: <h1>Hello, John!</h1>
```

### JSX Differences from HTML

| HTML | JSX |
|------|-----|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `onclick="..."` | `onClick={...}` |
| `style="color: red"` | `style={{ color: 'red' }}` |

### Conditional Rendering

```jsx
// Using &&
{isLoggedIn && <WelcomeMessage />}

// Using ternary
{isLoggedIn ? <WelcomeMessage /> : <LoginButton />}
```

### Rendering Lists

```jsx
const fruits = ['Apple', 'Banana', 'Orange'];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);
```

**Always use `key` prop when rendering lists!**

---

## 🎯 Event Handling

### Click Events

```jsx
const handleClick = () => {
  alert('Clicked!');
};

<button onClick={handleClick}>Click Me</button>
```

### Form Events

```jsx
const handleChange = (e) => {
  console.log(e.target.value);
};

<input onChange={handleChange} />
```

### Passing Arguments

```jsx
// Wrong - calls immediately!
<button onClick={handleClick(id)}>

// Right - calls on click
<button onClick={() => handleClick(id)}>
```

---

## 🏗️ Component Patterns

### Container Pattern

```jsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Render Props Pattern

```jsx
<DataFetcher
  url="/api/users"
  render={(data) => <UserList users={data} />}
/>
```

### Composition vs Inheritance

**React prefers composition:**
```jsx
// Good - composition
const Dialog = ({ children }) => (
  <div className="dialog">{children}</div>
);

<Dialog>
  <h1>Title</h1>
  <p>Content</p>
</Dialog>
```

---

## 🔀 Conditional Rendering Patterns

### Pattern 1: && Operator

```jsx
{isLoading && <Spinner />}
```

### Pattern 2: Ternary Operator

```jsx
{isLoading ? <Spinner /> : <Content />}
```

### Pattern 3: Early Return

```jsx
const Component = () => {
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return <Content />;
};
```

### Pattern 4: Object Lookup

```jsx
const statusComponents = {
  loading: <Spinner />,
  error: <Error />,
  success: <Content />,
};

return statusComponents[status];
```

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI pieces
│   ├── common/        # Buttons, Cards, etc.
│   ├── layout/        # Header, Footer, Layout
│   └── animations/    # Animated components
├── pages/             # Full page components
├── hooks/             # Custom hooks
├── context/           # Global state (Theme, Auth)
├── constants/         # Static data
├── utils/             # Helper functions
└── App.jsx            # Main app component
```

---

## 🎨 Styling in React

### Option 1: CSS Classes (Tailwind)

```jsx
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Styled with Tailwind!
</div>
```

### Option 2: Inline Styles

```jsx
<div style={{ backgroundColor: 'blue', color: 'white' }}>
  Inline styled!
</div>
```

### Option 3: CSS Modules

```jsx
import styles from './Button.module.css';

<button className={styles.primary}>Click</button>
```

---

## 🚀 Performance Tips

### 1. Use React.memo for Pure Components

```jsx
const ExpensiveComponent = memo(({ data }) => {
  // Only re-renders if data changes
  return <div>{data}</div>;
});
```

### 2. Use useCallback for Event Handlers

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

### 3. Use useMemo for Expensive Calculations

```jsx
const sortedList = useMemo(() => {
  return list.sort((a, b) => a - b);
}, [list]);
```

### 4. Lazy Load Components

```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

---

## 🐛 Common Mistakes

### 1. Mutating State Directly

```jsx
// ❌ Wrong
state.items.push(newItem);
setState(state);

// ✅ Right
setState({ ...state, items: [...state.items, newItem] });
```

### 2. Missing Key in Lists

```jsx
// ❌ Wrong
{items.map(item => <Item item={item} />)}

// ✅ Right
{items.map(item => <Item key={item.id} item={item} />)}
```

### 3. Calling Hooks Conditionally

```jsx
// ❌ Wrong
if (condition) {
  const [value, setValue] = useState(0);
}

// ✅ Right
const [value, setValue] = useState(0);
if (condition) {
  // use value here
}
```

### 4. Infinite useEffect Loops

```jsx
// ❌ Wrong - runs forever!
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ Right - runs once
useEffect(() => {
  setCount(c => c + 1);
}, []);
```

---

## 📚 Glossary

| Term | Meaning |
|------|---------|
| **Component** | Reusable UI piece |
| **Props** | Data passed to component |
| **State** | Data that changes over time |
| **Hook** | Function to use React features |
| **JSX** | HTML-like syntax in JavaScript |
| **Render** | Converting component to DOM |
| **Mount** | Component added to DOM |
| **Unmount** | Component removed from DOM |
| **Re-render** | Component updates |

---

## 🎯 Next Steps

1. **Understand the basics** - Components, Props, State
2. **Learn hooks** - useState, useEffect, useRef
3. **Practice patterns** - Conditional rendering, lists
4. **Study this project** - Read the page documentation!

---

Happy learning! 🚀
