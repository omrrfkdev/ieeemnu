# 📧 Contact Page Documentation

> **File:** `src/pages/Contact.jsx`
> **What it does:** Contact form, location info, and social media links!

---

## 🎬 The Big Picture

The Contact page is like a **digital reception desk** 🏢:
- Contact form for inquiries
- Location map/address
- Social media links
- Office hours and contact info

---

## 🧩 Components Breakdown

### 1. Form State Management

```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
```

**Multiple States Working Together:**
```
formData      → What the user types
isSubmitting  → Is the form being sent?
submitStatus  → Did it succeed or fail?
```

---

### 2. Controlled Form Inputs

```jsx
<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="Your Name"
  required
/>
```

**The `handleChange` Function:**
```jsx
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,        // Keep all existing fields
    [name]: value   // Update just this field
  }));
};
```

**How it works:**
```
User types "John" in name field
      ↓
onChange fires with e.target.name = "name", e.target.value = "John"
      ↓
setFormData({ ...prev, name: "John" })
      ↓
formData = { name: "John", email: "", subject: "", message: "" }
      ↓
Input re-renders with new value
```

**The `[name]` Syntax (Computed Property):**
```jsx
const name = "email";
{ [name]: "test@example.com" }
// Same as:
{ email: "test@example.com" }
```

---

### 3. Form Submission

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();  // Don't reload the page!
  setIsSubmitting(true);
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });  // Reset form
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};
```

**The async/await Pattern:**
```
handleSubmit called
      ↓
e.preventDefault() stops page reload
      ↓
setIsSubmitting(true) shows loading state
      ↓
await API call (or simulated delay)
      ↓
Success? → setSubmitStatus('success')
Error?   → setSubmitStatus('error')
      ↓
finally → setIsSubmitting(false) always runs
```

---

### 4. Conditional UI Based on State

```jsx
<button 
  type="submit" 
  disabled={isSubmitting}
  className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
>
  {isSubmitting ? (
    <>
      <Loader2 className="animate-spin" />
      Sending...
    </>
  ) : (
    <>
      <Send />
      Send Message
    </>
  )}
</button>
```

**State → UI Mapping:**
| State | Button Text | Button Style |
|-------|-------------|--------------|
| `isSubmitting: false` | "Send Message" | Normal |
| `isSubmitting: true` | "Sending..." + spinner | Disabled, faded |

---

### 5. Success/Error Messages

```jsx
{submitStatus === 'success' && (
  <div className="bg-green-100 text-green-800 p-4 rounded-lg">
    <CheckCircle className="w-5 h-5" />
    Message sent successfully!
  </div>
)}

{submitStatus === 'error' && (
  <div className="bg-red-100 text-red-800 p-4 rounded-lg">
    <AlertCircle className="w-5 h-5" />
    Something went wrong. Please try again.
  </div>
)}
```

**The `&&` Pattern for Conditional Rendering:**
- If left side is truthy → render right side
- If left side is falsy → render nothing

---

## 🎨 Form Styling

### Input Styling

```jsx
className="
  w-full 
  px-4 py-3 
  border border-gray-300 
  rounded-lg 
  focus:ring-2 focus:ring-ieee-blue focus:border-transparent
  dark:bg-gray-800 dark:border-gray-600 dark:text-white
  transition-all duration-200
"
```

**Breaking it down:**

| Classes | Purpose |
|---------|---------|
| `w-full` | Full width of container |
| `px-4 py-3` | Padding inside input |
| `border border-gray-300` | Light gray border |
| `rounded-lg` | Rounded corners |
| `focus:ring-2` | Blue ring when focused |
| `focus:border-transparent` | Hide border when focused |
| `dark:bg-gray-800` | Dark background in dark mode |
| `transition-all` | Smooth state changes |

### Textarea Auto-Resize

```jsx
<textarea
  rows={5}
  className="resize-none"  // or "resize-y" for vertical only
/>
```

---

## 📍 Contact Info Section

```jsx
const CONTACT_INFO = [
  {
    icon: MapPin,
    title: 'Address',
    content: 'Engineering Building, Room 101',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (555) 123-4567',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'ieee@university.edu',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Mon-Fri: 9AM - 5PM',
  },
];

{CONTACT_INFO.map(({ icon: Icon, title, content }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-ieee-blue/10 rounded-lg">
      <Icon className="w-6 h-6 text-ieee-blue" />
    </div>
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  </div>
))}
```

**The `icon: Icon` Destructuring:**
```jsx
// Original object:
{ icon: MapPin, title: 'Address', ... }

// Destructure and rename:
{ icon: Icon, title, content }

// Now we can use:
<Icon className="..." />  // Renders <MapPin />
```

---

## 🔗 Social Media Links

```jsx
const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/ieee', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/ieee', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ieee', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com/ieee', label: 'Instagram' },
];

<div className="flex gap-4">
  {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="p-3 bg-gray-100 rounded-full hover:bg-ieee-blue hover:text-white transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  ))}
</div>
```

**Accessibility:**
- `aria-label={label}` = Screen readers announce "Facebook link"
- Icons alone aren't accessible without labels!

---

## 🎓 Key Concepts

### 1. Controlled vs Uncontrolled Forms

**Controlled (React manages value):**
```jsx
<input value={formData.name} onChange={handleChange} />
```

**Uncontrolled (DOM manages value):**
```jsx
<input defaultValue="John" ref={inputRef} />
```

**We use controlled because:**
- React knows the value at all times
- Easy to validate, transform, or reset
- Consistent with React's data flow

### 2. Form Validation

```jsx
// HTML5 validation:
<input type="email" required />

// Custom validation:
const isValid = formData.email.includes('@') && formData.message.length > 10;
```

### 3. Optimistic UI

```jsx
// Show success immediately, handle errors if they occur
setSubmitStatus('success');
try {
  await sendEmail(formData);
} catch {
  setSubmitStatus('error');  // Revert if failed
}
```

---

## 📱 Responsive Layout

```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
  {/* Form - takes full width on mobile, half on large */}
  <div>
    <form>...</form>
  </div>
  
  {/* Contact Info - stacks below form on mobile */}
  <div>
    <ContactInfo />
    <SocialLinks />
  </div>
</div>
```

| Screen | Layout |
|--------|--------|
| Mobile | Form above, info below |
| Large | Form left, info right |

---

## 🚀 Performance Notes

### No Heavy Assets

Contact page is lightweight:
- No images to preload
- Simple form interactions
- Fast initial render

### Form State Optimization

```jsx
// Each keystroke only updates one field
setFormData(prev => ({
  ...prev,
  [name]: value
}));
```

**Why spread `...prev`?**
- Creates new object (React detects change)
- Preserves other fields
- Only updates what changed

---

## 🤔 Common Questions

**Q: Why `e.preventDefault()` in handleSubmit?**
A: Without it, the browser would reload the page (traditional form behavior). We want to handle submission with JavaScript!

**Q: Why use `finally` in the try/catch?**
A: `finally` ALWAYS runs, whether success or error. Perfect for cleanup like `setIsSubmitting(false)`.

**Q: How would I add real email sending?**
A: Replace the simulated delay with an API call:
```jsx
await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData),
});
```

---

## 📊 Page Structure

```
┌─────────────────────────────────────────┐
│           HERO SECTION                  │
│    "Contact Us" title                   │
│    Subtitle                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FORM              │  CONTACT INFO      │
│  ┌───────────────┐ │  📍 Address        │
│  │ Name          │ │  📞 Phone          │
│  ├───────────────┤ │  ✉️ Email          │
│  │ Email         │ │  🕐 Hours          │
│  ├───────────────┤ │                    │
│  │ Subject       │ │  SOCIAL LINKS      │
│  ├───────────────┤ │  [f] [t] [in] [ig] │
│  │ Message       │ │                    │
│  │               │ │                    │
│  ├───────────────┤ │                    │
│  │ [Send Button] │ │                    │
│  └───────────────┘ │                    │
└─────────────────────────────────────────┘
```

---

Happy coding! 🚀
