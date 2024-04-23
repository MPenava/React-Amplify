# React + PrimeReact (styled mode) + AWS Cognito + Amplify

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/username/react-app.git
   ```
2. Navigate to the project directory:

   ```bash
   cd your-react-app
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env` file in the root directory of your project:

   ```plaintext
   VITE_COGNITO_USER_POOL_ID=your_user_pool_id
   VITE_COGNITO_CLIENT_ID=your_user_pool_client_id
   VITE_COGNITO_LOGIN_URL=url_for_hosted_ui
   ```

   Replace `your_aws_region`, `your_user_pool_id`, and `url_for_hosted_ui` with your AWS Cognito configuration details.

5. Start the development server:

   ```bash
   pnpm run dev
   ```

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
