# Crochet by Masi - Website

Welcome to the source code for the **Crochet by Masi** website. This is a static, premium frontend tailored specifically for a handmade crochet brand.

## How to Host this Website for Free on GitHub Pages

Follow these step-by-step instructions if you have never used GitHub before.

### Step 1: Create a GitHub Account and Repository
1. Go to [GitHub.com](https://github.com/) and create a free account.
2. Once logged in, click the **"+"** icon in the top right corner and select **"New repository"**.
3. Name your repository (e.g., `crochet-by-masi`). 
4. Leave it as "Public".
5. Click **"Create repository"**.

### Step 2: Upload Your Files
1. On your new repository page, click the **"uploading an existing file"** link.
2. Drag and drop all the files provided in this code delivery into the browser window.
   *Ensure you maintain the exact folder structure (the `css/`, `js/`, and `assets/` folders).*
3. Add a short message in the "Commit changes" box (e.g., "Initial website upload") and click **"Commit changes"**.

### Step 3: Upload the Logo
1. In your GitHub repository, navigate to `assets/logo/`.
2. Click **"Add file"** > **"Upload files"**.
3. Upload the exact official logo provided (`crochet-by-masi.png`).
4. Commit the change.

### Step 4: Turn on GitHub Pages
1. In your repository, click the **"Settings"** tab at the top.
2. In the left sidebar, click on **"Pages"**.
3. Under "Build and deployment", set the **Source** to "Deploy from a branch".
4. Under **Branch**, select `main` (or `master`) and keep the folder as `/ (root)`.
5. Click **"Save"**.
6. Wait about 1-2 minutes. Refresh the page, and GitHub will provide you with a live URL (e.g., `https://yourusername.github.io/crochet-by-masi/`).

---

## How to Customize Your Website

All configurations can be easily managed by editing the `js/script.js` file.

### 1. Update Contact Information (Instagram, WhatsApp, Email)
Open `js/script.js`. Right at the very top, you will see a block called `SITE_CONFIG`:
```javascript
const SITE_CONFIG = {
    instagram: "crochetbymasi", // Change to your handle (no @)
    whatsapp: "910000000000",   // Change to your number with country code
    email: "hello@example.com", // Change to your email
    formEndpoint: ""            // See below
};
