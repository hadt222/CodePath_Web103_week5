# Gaming PC Builder

A full-stack Web103 customization app where users create, preview, save, edit, and delete custom gaming PC builds. The app updates the total price live, changes the PC preview visually as options change, and blocks invalid part combinations before they can be saved.

## Video Walkthrough

Add your Loom or YouTube walkthrough link here.

## Project Notes

- Frontend: React + Vite
- Backend: Express
- Database: PostgreSQL on Render
- Main custom item table: `custom_pc_builds`

## Required Features Checklist

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [ ] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command `SELECT * FROM tablename;` to display your table contents.**
- [x] **Users can view multiple features of the `CustomItem` they can customize.**
- [x] **Each customizable feature has multiple options to choose from.**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` changes dynamically as different options are selected or displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

## Optional Features

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

## Additional Features

- [x] Added prebuilt gaming PC presets with one-click loading into the builder
- [x] Added sample build seeding into the database from the app
- [x] Added real PC photography to the prebuilt gallery
- [x] Added a live PC preview that changes with case color and RGB settings
- [x] Added extended builder options for CPU, GPU, RAM, storage, cooling, and case colors

## Routes

- `/` creates a new custom build
- `/builds` lists saved builds
- `/builds/:id` shows one saved build
- `/builds/:id/edit` edits one saved build

## API Routes

- `GET /api/builds`
- `GET /api/builds/:id`
- `POST /api/builds`
- `PUT /api/builds/:id`
- `DELETE /api/builds/:id`
- `POST /api/builds/seed`

## Database Schema

Run the SQL in `server/config/schema.sql` to create the `custom_pc_builds` table.

```sql
CREATE TABLE IF NOT EXISTS custom_pc_builds (
    id SERIAL PRIMARY KEY,
    build_name VARCHAR(100) NOT NULL,
    case_color VARCHAR(50) NOT NULL,
    cpu VARCHAR(100) NOT NULL,
    gpu VARCHAR(100) NOT NULL,
    ram VARCHAR(50) NOT NULL,
    storage VARCHAR(50) NOT NULL,
    cooling VARCHAR(50) NOT NULL,
    rgb BOOLEAN NOT NULL DEFAULT false,
    total_price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Render Database Walkthrough Evidence

### 1. Render Dashboard Screenshot

Add a screenshot here that shows your Render Postgres dashboard is running.

Suggested filename:

```txt
client/public/render-dashboard-proof.png
```

Then embed it here after you capture it:

```md
![Render Postgres Dashboard](./client/public/render-dashboard-proof.png)
```

### 2. Table Contents via `psql`

Command used:

```bash
psql "$DATABASE_URL" -c "SELECT * FROM custom_pc_builds;"
```

Example output from the current Render database:

```text
 id | build_name | case_color |     cpu     |    gpu     | ram  | storage |   cooling   | rgb | total_price |         created_at
----+------------+------------+-------------+------------+------+---------+-------------+-----+-------------+----------------------------
  1 | thaiha     | Blue       | AMD Ryzen 5 | RX 7700 XT | 32GB | 2TB SSD | Air Cooling | t   |         985 | 2026-03-28 05:47:58.982492
(1 row)
```

## Local Setup

```bash
npm install
npm run dev
```
