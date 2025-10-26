# secure-nested 🛡️

Safe nested object access utility for JavaScript/TypeScript. Never crash from `Cannot read property of undefined` again.

## ✨ Features

-   **Simple**: One-liner API
-   **Fast**: Minimal overhead
-   **Safe**: Automatic null/undefined checks
-   **Flexible**: String or array path support
-   **Zero dependencies**
-   **Universal**: Works in Node.js and browsers
-   **TypeScript support**: Full type definitions

## 📦 Install

```bash
npm install secure-nested
```

## 🚀 Usage

```javascript
import safeGet from "secure-nested";

const user = {
    profile: {
        name: "Ali",
        settings: { theme: "dark" },
    },
};

// Safe access
safeGet(user, "profile.name", "Guest"); // 'Ali'
safeGet(user, "profile.age", 0); // 0 (default value)
```

### Array Access

```javascript
const data = {
    users: [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
    ],
};

safeGet(data, "users.0.name"); // 'Alice'
safeGet(data, "users.3.name", "Unknown"); // 'Unknown'
```

### Array Path Format

```javascript
const obj = { a: { b: { c: "value" } } };

safeGet(obj, "a.b.c"); // 'value'
safeGet(obj, ["a", "b", "c"]); // 'value'
```

## 🎨 Other Functions

### `safeSet` - Safe assignment

```javascript
import { safeSet } from "secure-nested";

const obj = {};
safeSet(obj, "user.profile.name", "Ali");
safeSet(obj, "items.0.value", "test");
```

### `safeDelete` - Safe deletion

```javascript
import { safeDelete } from "secure-nested";

const obj = { a: { b: "value", c: "keep" } };
safeDelete(obj, "a.b");
```

### `safeHas` - Property check

```javascript
import { safeHas } from "secure-nested";

const obj = { user: { id: 1, name: "Ali" } };

safeHas(obj, "user.name"); // true
safeHas(obj, "user.email"); // false
```

## 📚 API

### `safeGet(obj, path, defaultValue)`

-   `obj` - Object to access
-   `path` - Property path (string or array)
-   `defaultValue` - Default value if not found
-   Returns: Found value or default

### `safeSet(obj, path, value, createMissing)`

-   `obj` - Object to modify
-   `path` - Property path
-   `value` - Value to set
-   `createMissing` - Create missing objects (default: true)
-   Returns: Success boolean

### `safeDelete(obj, path)`

-   `obj` - Object to modify
-   `path` - Property path
-   Returns: Success boolean

### `safeHas(obj, path)`

-   `obj` - Object to check
-   `path` - Property path
-   Returns: Exists boolean

## 📄 License

MIT
