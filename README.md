# Let’s Shyp – Frontend Booking Flow

This project is a frontend implementation of an end-to-end booking flow for **Let’s Shyp**, a hyperlocal logistics platform.  
It was built as part of the **Frontend Development Intern Assignment**, with a focus on user experience, validations, UI states, and a realistic booking journey.

---

## 📌 About the Project

The objective of this assignment was to design and build a **production-like booking flow** for a logistics service, starting from pickup and drop details and ending with a booking confirmation.

I chose the **Package Delivery** service and implemented a **desktop-first web experience**.  
There is no backend involved — all data, pricing, and logic are mocked or handled using local state.

---

## 🧭 Booking Flow

The booking journey is divided into the following steps:

1. Pickup & Drop Details  
2. Package Details  
3. Pricing & Order Summary  
4. Checkout  
5. Booking Confirmation  

Each step validates user input and allows progression only when required fields are completed.

---

## ✨ Features Implemented

### 1. Pickup & Drop Details
- Pickup address and drop address inputs
- Optional delivery instructions
- Validation for empty or incomplete fields
- “Next” button disabled until mandatory inputs are valid

---

### 2. Package Details
- Package size and weight selection
- Helper hints for package constraints
- Live validation with warning/error states
- Pricing updates based on selected package details

---

### 3. Pricing & Order Summary
- Mocked fare breakdown (base price, distance, package charges)
- Summary of pickup, drop, and package details
- Ability to edit previous steps while retaining entered data

---

### 4. Checkout
- User details input (name and phone number)
- Basic form validation
- Mock loading state on booking action

---

### 5. Booking Confirmation
- Booking success screen
- Auto-generated booking reference (e.g. `LS-482193`)
- Confirmation and reassurance message
- Clear next steps such as starting a new booking or contacting support

---

## ⚠️ Edge Cases Handled

The following edge cases were implemented as required:

- **Price change after package selection**  
  Pricing updates dynamically when package details are modified.

- **Editing pickup/drop after pricing**  
  Users can update addresses after viewing pricing without losing progress.

---

## 🛠 Tech Stack

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

No backend services or APIs were used.

---

## 🧠 State Management

- React hooks for managing form and step states
- Step-based navigation with persistent data
- Validation-driven UI states for better clarity

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone <your-repository-link>

# Navigate to the project directory
cd lets-shyp-booking

# Install dependencies
npm install

# Run the development server
npm run dev
