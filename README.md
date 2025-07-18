# BizLocator-SA
Find the right business for your place.

## Overview

BizLocator SA is a web application designed to help users in South Africa find suitable business ideas based on their location type. It supports various location types including villages, suburbs, townships, cities, and estates. The app offers curated business recommendations, interactive features for feedback and rating, and export options to aid entrepreneurs and planners.

---

## Features

### 1. Flask Backend API

- **Purpose:** Provides business recommendations based on a location query.
- **Endpoint:** `/recommendations`
- **Input:** Location name as a query parameter (e.g., `?location=township`)
- **Output:** JSON response containing a list of relevant businesses.
- **Implementation Highlights:**
  - Simple RESTful API built with Flask.
  - Validates location input.
  - Returns meaningful error messages for missing or unknown locations.
  - Easily extensible for additional locations and business data.

### 2. React Frontend

- **Purpose:** User interface for searching locations, viewing recommendations, and interacting with business plans.
- **Core Components:**
  - Location dropdown selector for consistent input.
  - Search button to query the backend.
  - Display area showing business recommendations as styled cards.
  - Star rating component for users to rate each business idea.
  - Textarea input for additional feedback per business.
  - Download PDF button to export recommendations.

### 3. Location Dropdown Menu

- Replaces free-text input with a dropdown containing predefined locations: village, suburb, township, city, estate.
- Improves usability and input accuracy.

### 4. Google Maps Integration

- Embeds a Google Map centered on the searched location.
- Displays markers for recommended business areas.
- Requires Google Maps API key and geocoding to convert location names to coordinates.

### 5. Dark Mode Toggle

- Allows users to switch between light and dark themes.
- Enhances accessibility and user comfort.
- Implements CSS classes toggled by React state.

### 6. Feedback and Rating System

- Star rating lets users rate each recommended business from 1 to 5 stars.
- Text feedback area allows users to provide comments on each business idea.
- Ratings and feedback are stored in React state and persisted in local storage.

### 7. Saving User Data

- Ratings and feedback are saved locally using the browser’s local storage API.
- Enables data persistence between sessions.
- Can be extended to save data to a backend database for multi-user support.

---

## Technologies Used

- **Backend:** Python, Flask
- **Frontend:** React.js (functional components and hooks)
- **PDF Generation:** jsPDF library for exporting recommendations
- **Maps:** Google Maps React API (`@react-google-maps/api`)
- **State Management:** React’s useState and useEffect hooks
- **Storage:** Browser Local Storage for persisting ratings and feedback

---

## User Flow

1. User selects a location type from the dropdown.
2. User clicks “Search” to fetch business recommendations.
3. Recommended businesses display as cards with names, descriptions, star rating widgets, and feedback boxes.
4. User can rate businesses and add textual feedback.
5. User can click “Download PDF” to export the current recommendations and details.
6. User can toggle dark mode for comfortable viewing.
7. Map displays showing the location and business markers.
8. Ratings and feedback are saved locally and persist between sessions.

---

## Setup & Running the Project

### Backend

1. Ensure Python 3.x is installed.
2. Install Flask:

   ```bash
   pip install flask
