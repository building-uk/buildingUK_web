---
name: wordpress-dev
description: Guide for WordPress development, theme creation, and content migration matching the specific Figma design. Use when working on the WordPress migration for BuildingUK.
---

# WordPress Development & Migration

## Overview

This skill provides the workflow and resources for migrating the BuildingUK application to a WordPress CMS. It includes instructions for theme development, content management, and ensuring the final product matches the provided Figma design.

## Workflow

### 1. Local Development Setup (Alternative to Docker)
**Recommended: use "Local" app**
1. Download [Local](https://localwp.com/) and install it.
2. Create a new site in Local.
3. Go to the site folder (click "Go to site folder" in Local).
4. Replace the `app/public` folder in Local with the contents of our `wordpress` directory.
5. Access the site via the "Admin" button in Local.

**Option B: Automated Script (CLI)**
- **Run Script**: Execute `./start-wp.sh` in the terminal.
- **Prerequisites**: Requires `php` and `mysql` installed (e.g., via `brew install php mysql`).

**Option C: Docker (Advanced)**
- **Start Environment**: Run `docker-compose up -d` in the project root.
- **Access Site**: Open [http://localhost:8000](http://localhost:8000).

### 2. Theme Development
- **Active Theme**: `buildinguk` (Custom theme).
- **Dynamic Images**:
    - **Logo**: Go to **Appearance > Customize > Site Identity** to upload a logo.
    - **Page/Post Images**: Use the **Featured Image** box in the post editor to set the main image for any page or post.
- **Code Location**: `wordpress/wp-content/themes/buildinguk`.

### 3. Content Migration (Populating the CMS)
The theme includes Custom Post Types for **Projects**, **Services**, and **Testimonials**. Follow these steps:

#### Pages Setup
1. **Home**: Create a Page titled "Home". Set a **Featured Image** (Hero background). Add Hero text in editor.
2. **About**: Create a Page titled "About Us". Set **Template** → `About Page`. Set a **Featured Image**.
3. **Contact**: Create a Page titled "Contact". Set **Template** → `Contact Page`.
4. Go to **Settings > Reading** → set **Homepage** to "Home" (static page).

#### Custom Content
- **Projects** → Add New: Title, Description, **Featured Image**.
- **Services** → Add New: Title, Excerpt (card text), Description, **Featured Image**.
- **Testimonials** → Add New: Client Name as Title, Testimonial as Content.

### 4. Asset Management
**Recommended Method: WordPress Media Library**
1. **Download Images**: Get the zip file from [Google Drive](https://drive.google.com/drive/folders/1ADMkv5zanX0kFqHQ6wYQfvVf7gbqJ_eX).
2. **Extract**: Unzip the folder on your computer.
3. **Import**:
   - Go to your WordPress Dashboard (e.g., `http://localhost:8000/wp-admin`).
   - Navigate to **Media > Add New**.
   - Drag and drop the files from your extracted folder, or click "Select Files" to upload them.
   - *Note: This ensures images are properly registered in the WordPress database and available in the Media Library.*

## Resources

### Design & Assets
- **Figma Design**: [BuildingUK Design](https://www.figma.com/design/Gpyz4tnoke60Pm9sjUGxih/BuildingUK?node-id=0-1&p=f&t=Ivv1Uj7udSJ0wEah-0)
- **Image Assets**: [Google Drive Folder](https://drive.google.com/drive/folders/1ADMkv5zanX0kFqHQ6wYQfvVf7gbqJ_eX)

### References
- [Design Resources](references/design-resources.md) - Contains links to Figma and Drive.
