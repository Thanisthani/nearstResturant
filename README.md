# Nearest Restaurant Finder

Nearest Restaurant Finder is a **React Native** mobile application designed to help users discover the best dining spots nearby. Built with **TypeScript**, it leverages the **Google Maps SDK**, **Reverse Geocoding** and **Google Places API** to provide real-time restaurant results, interactive maps, and a seamless user experience.

---

## Key Features

- **Real-time Geolocation**: Automatically detects your current position to find offers and restaurants in your immediate vicinity.
- **Interactive Map**: Explore nearby restaurants with markers displaying ratings directly on the map.
- **Smart Search**: Integrated with **Google Places Autocomplete** to search for locations anywhere in the world.
- **Category Filtering**: Quickly browse through categories like **Cafe**, **Restaurant**, **Bar**, and **Bakery**.
- **Filtering**: Sort results by **Rating** or **Distance** to find exactly what you're looking for.
- **Manual Location Picker**: Set your location manually by dropping a pin anywhere on the map.

---

## Technical Implementation

For this assignment, I focused on building a scalable, performant, and user-friendly "Restaurant Finder" application. Here are the key technical implementations:

### 1. Robust Map & Location Integration

- Integrated **React Native Maps** with custom-rendered markers that provide immediate value (displaying restaurant ratings directly on the map).
- Implemented a dual-mode location system: **Automatic Geolocation** (using device sensors) and a **Manual Location Picker** with a draggable map interface.

### 2. Advanced API Integration (Google Places V1)

- Used the latest **Google Places API (New)** with field masking to optimize data usage and reduce latency.
- Implemented **Google Places Autocomplete** for a seamless global search experience.
- Built a custom extraction layer to handle restaurant data.

### 3. UI/UX Elements

- **Real-time Filtering & Sorting**: Developed logic to sort restaurants dynamically by distance (calculated via Haversine formula or API) and rating.
- **Performance Optimization**: Utilized `Reanimated` for 60fps UI transitions and implemented **Shimmer Loading** to improve perceived performance during data fetching.
- **Modular Architecture**: Organized the codebase into reusable components, utilities, and screens for maintainability and scalability.
- **Interactive Bottom Sheet**: Integrated `@gorhom/bottom-sheet` for a native-feel experience when browsing large lists of data.
- **Responsive Design**: Used `react-native-size-matters` to ensure the UI scale correctly across various screen sizes and orientations.

---

##  Tech Stack

- **Framework**: React Native (0.83.1)
- **Language**: TypeScript
- **Maps**: React Native Maps (with Google Maps Provider)
- **State & Logic**: React Hooks & Functional Components
- **Animations**: React Native Reanimated & Worklets
- **Icons**: Lucide React Native & Custom SVGs
- **API**: Axios with Google Places API (New V1) and Reverse Geocoding API

---

## Setup Instructions

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 20)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- A Google Cloud Project with **Maps SDK for Android/iOS** and **Places API** enabled.

### 2. Installation

Clone the repository and install dependencies:

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

### 3. iOS Configuration

If you are developing for iOS, install the CocoaPods:

```sh
cd ios && pod install && cd ..
```

### 4. Google Cloud Platform (GCP) Setup

To use the maps and search functionality, you must configure a project on the [Google Cloud Console](https://console.cloud.google.com/):

#### A. Create a Project & Billing

1. Create a new project named **NearestRestaurant**.
2. [Link a billing account](https://console.cloud.google.com/billing) (Google provides a $200 free monthly credit).

#### B. Enable Required APIs

You must enable the following APIs for your project:

- **Places API (New)**: For restaurant search and details.
- **Geocoding API**: For converting coordinates to addresses.
- **Maps SDK for Android**: For showing maps on Android.
- **Maps SDK for iOS**: For showing maps on iOS.

#### C. Get Your API Key

1. Go to **APIs & Services > Credentials**.
2. Click **Create Credentials > API Key**.
3. Copy the key into your `.env` file.
4. **Restriction (Highly Recommended):** Click the key details and under **API restrictions**, select only the 4 APIs listed above to prevent unauthorized usage.

### 5. Environment Setup

Create a `.env` file in the root directory and add your Google Maps API Key:

```env
GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### 6. Running the Application

First, start the Metro Bundler:

```sh
npm start
```

Then, run the app on your preferred platform:

**Android:**

```sh
npm run android
```

**iOS:**

```sh
npm run ios
```
## Screenshots 

**Android:**
![WhatsApp Image 2026-02-12 at 10 56 52 PM](https://github.com/user-attachments/assets/7ba81697-84e4-4c00-a186-b80ee4acf355)
![WhatsApp Image 2026-02-12 at 10 56 51 PM (1)](https://github.com/user-attachments/assets/f1b98e23-860a-4072-a9ae-ec825394407e)
![WhatsApp Image 2026-02-12 at 10 56 51 PM](https://github.com/user-attachments/assets/a407ff58-9ce2-4df4-ade4-5dc8598ccbac)
![WhatsApp Image 2026-02-12 at 10 56 36 PM](https://github.com/user-attachments/assets/0c2d0909-b5a8-4402-ac30-932877aca83a)
![WhatsApp Image 2026-02-12 at 10 56 35 PM](https://github.com/user-attachments/assets/c9b1bd71-d46d-4191-a06c-ca90711c2e40)
![WhatsApp Image 2026-02-12 at 10 56 34 PM](https://github.com/user-attachments/assets/dd9ce64c-fbff-4a3e-8e4f-be0967e03cd8)

**iOS:**
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 22 29" src="https://github.com/user-attachments/assets/bc21c1f9-82d6-40d7-8ce7-1f2446e72ee0" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 23 00" src="https://github.com/user-attachments/assets/a1674695-8a92-4a12-8e77-dd67a1ccbd62" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 23 10" src="https://github.com/user-attachments/assets/927620b3-b9ff-4a80-89ab-fba955ed026f" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 23 31" src="https://github.com/user-attachments/assets/cac4aac3-060b-4e44-a638-8199554ce04c" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 23 54" src="https://github.com/user-attachments/assets/50cc84d2-fcf9-4591-82ed-94fb2ada0335" />
<img width="1206" height="2622" alt="Simulator Screenshot - iPhone 17 Pro - 2026-02-12 at 22 24 18" src="https://github.com/user-attachments/assets/50a59cd7-f28a-4752-b716-7bca7054ef14" />
