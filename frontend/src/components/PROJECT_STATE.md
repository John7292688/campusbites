PROJECT_STATE.md
# CampusBites — Project State Document

Last Updated: August 2026

---

# 1. PROJECT NAME & CORE OBJECTIVE

## Project Name
CampusBites

## Core Objective

CampusBites is a campus-focused food ordering platform that connects students with nearby campus restaurants and food vendors.

The goal is to allow students to:

- Discover restaurants
- Browse menus
- Order preset combo meals
- Build custom plates
- Add items to cart
- Checkout and place orders

while allowing vendors to:

- Manage restaurants
- Manage menus
- Manage combo packages
- Manage orders

The long-term goal is to become a complete campus food delivery ecosystem.

---

# 2. TECH STACK & LIBRARIES USED

## Frontend

### Core
- React
- React Router DOM
- JavaScript (JSX)
- CSS

### React Features Used
- useState
- useEffect
- Context API

### Routing
- react-router-dom

Examples:

```jsx
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
Global State

Cart Context

useCart()
Backend

Backend already exposes API endpoints consumed by frontend services.

Frontend consumes backend through service files.

Examples:

restaurantService.js
menuService.js
comboPackageService.js
customPlateService.js
3. FOLDER STRUCTURE & KEY FILE MAP

Current known structure:

src/
│
├── components/
│   ├── FeaturedRestaurants.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── RestaurantDetails.jsx
│
├── context/
│   ├── CartContext.jsx
│
├── services/
│   ├── restaurantService.js
│   ├── menuService.js
│   ├── comboPackageService.js
│   ├── customPlateService.js
│
├── styles/
│   ├── restaurantDetails.css
│   ├── home.css
│
└── App.jsx
4. COMPLETED FEATURES & WORK DONE SO FAR
Authentication

Completed:

Registration flow
Validation logic
Authentication foundation

Status:
✅ Completed

Restaurant Details Page

Status:
✅ Functional
✅ UI Polished

Completed:

Restaurant Hero
Restaurant image
Restaurant logo
Restaurant name
Description
Phone number
Location
Layout Improvements

Completed:

Header alignment
Logo positioning
Hero spacing
Typography cleanup
Menu System

Completed:

Dynamic menu loading
Menu categories
Category grouping
Combo Packages

Completed:

Preset combo cards
Combo package display
Combo package selection

Current Status:

User likes current combo package design.

DO NOT redesign unless requested.

Build Your Own Plate

Status:
✅ Completed
✅ Working

Completed:

Quantity Controls
Plus button
Minus button
Quantity display
Item Layout

Completed:

Food name alignment
Unit alignment
Price alignment

Final design decision:

Food name and unit should remain on same line.

Example:

White Rice (Per Spoon)

with a small spacing between:

White Rice     (Per Spoon)

NOT stacked vertically.

This layout was explicitly approved.

Plate Summary

Completed:

Selected items
Quantity display
Price calculation
Total calculation
Create Custom Plate

Completed:

Button
Payload creation
Submission flow
Featured Restaurants Section

Status:
🟡 In Progress

Completed:

Dynamic Restaurant Loading

Using:

getRestaurants()
Restaurant Cards

Currently displaying:

Restaurant image
Name
Location
Description
View Menu button
UI Improvements Already Done
Card styling
Border radius consistency
Improved spacing
Responsive grid foundation
Bug Fixed

Issue:

FeaturedRestaurants.jsx does not provide an export named 'default'

Resolution:

Added:

export default FeaturedRestaurants;

Status:
✅ Fixed

Homepage

Status:
🟡 In Progress

Completed:

Hero Section

Built

Categories Section

Built

Featured Restaurants

Partially polished

How It Works

Built but not fully polished

5. CURRENT PENDING TASKS & ROADBLOCKS
Current Active Task

Featured Restaurants Section

Current Bug

Restaurant:

Mama T's Kitchen

cover image is not displaying.

Current investigation status:

NOT yet solved.

Next debugging step:

Add:

console.log(
  restaurant.name,
  restaurant.image_url
);

inside FeaturedRestaurants.jsx.

Goal:

Verify whether:

image_url is null
image_url is empty
image_url is invalid
image request is failing

This is the CURRENT task we were working on immediately before context reset.

DO NOT skip ahead.

Homepage Polish

Pending:

Featured Restaurants

Need:

Image issue fixed
Card consistency review
Final spacing review
Footer

Not yet built.

Needs:

Branding
Navigation links
Contact information
Copyright

Status:
❌ Pending

Responsive Design

Not started systematically.

Need:

Desktop
Final polish
Tablet
Layout review
Mobile
Responsive review

Status:
❌ Pending

Future Planned Features

After Homepage Completion:

Phase 1

Restaurant Listing Page

Features:

Search
Filters
Categories
Pagination
Phase 2

Cart

Features:

Add to cart
Remove from cart
Quantity updates
Cart page
Phase 3

Checkout

Features:

Delivery details
Hostel
Room number
Phone number
Order summary
Phase 4

Vendor Dashboard

Features:

Restaurant management
Menu management
Order management
6. AI PERSONA & ROLE
Official Role

Lead Systems Architect
+
Technical Project Manager
+
Senior React Instructor

Responsibilities

The AI is responsible for:

Architecture
Deciding project build order
Preventing premature optimization
Preventing feature jumping
Project Management
Directing next implementation step
Tracking completed work
Tracking pending work
Maintaining project roadmap
Instruction Style

Must:

Work one feature at a time
Give clear instructions
Avoid overwhelming the user
Avoid large unrelated refactors
Verify changes before proceeding

Workflow:

Choose Task
↓
Implement
↓
Verify
↓
Polish
↓
Move To Next Task
Important User Preference

The user explicitly prefers:

One thing at a time
Clear explanations
Sequential development
Minimal confusion
Finishing a feature before moving on

The AI should respect this workflow at all times.

CURRENT NEXT ACTION

DO NOT start a new feature.

Continue from current task:

Investigate why:

Mama T's Kitchen

cover image is not displaying.

Immediate next step:

Add:

console.log(
  restaurant.name,
  restaurant.image_url
);

inside FeaturedRestaurants.jsx and inspect console output.


This document can be used as the authoritative project handoff/reference when starting a new chat or after a context reset.