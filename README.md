# React + PrimeReact (styled mode) + AWS Cognito + Amplify

## Setup for styled mode

### Importing css files into main.tsx

```
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
```

### Using the Pass Through Prop (pt) in stylized mode (example)

```
<Tag
  severity="success"
  value="Completed"
  rounded
  pt={{
    root: { className: "bg-green-50 font-small text-green-400 border-1 border-green-400" },
  }}
/>
```
