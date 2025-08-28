# Creator Support Platform

A modern, full-stack application for creators to receive direct support from their fans. This platform is built with **React**, **Next.js**, **Tailwind CSS**, and **MongoDB**, featuring secure authentication and seamless payment integration.

---

## Key Features

* **Secure Authentication:** Creators can log in and manage their profiles securely using **NextAuth.js**, with **GitHub** as the primary provider.
* **Dynamic Profile Page:** An "About" page that dynamically updates based on the creator's dashboard entries for their username and profile picture.
* **Integrated Payments:** Utilizes **Razorpay** to facilitate payments from fans, including an option to leave a personal message for the creator. The system is configured in test mode for development and can be switched to production by updating the ID and secret.
* **Top Supporters Display:** The profile page showcases the top 10 supporters, highlighting their contributions and messages.
* **Database Integration:** Uses **MongoDB** to securely store user data and payment information.
* **Fully Responsive:** The user interface is meticulously crafted with **Tailwind CSS** to ensure a smooth, beautiful experience on all devices.

---

## Technologies Used

* **Frontend:**
    * **Next.js:** The full-stack framework for building the application, enabling features like server-side rendering and API routes.
    * **React:** For the dynamic and component-based frontend user interface.
    * **Tailwind CSS:** A utility-first CSS framework used to build a responsive and modern design with minimal custom CSS.
* **Backend & Database:**
    * **MongoDB:** A flexible NoSQL database for storing user and supporter data.
    * **NextAuth.js:** A complete authentication solution for Next.js applications, configured here for GitHub login.
    * **Razorpay:** The payment gateway integrated to handle secure transactions.

---

## Setup & Installation

To get the project up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/creator-support-platform.git](https://github.com/your-username/creator-support-platform.git)
    cd creator-support-platform
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add the following keys. These are necessary for authentication and payments.
    ```
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    NEXTAUTH_SECRET=a_random_string_for_nextauth

    # Razorpay credentials for test mode
    RAZORPAY_KEY_ID=rzp_test_...
    RAZORPAY_KEY_SECRET=your_test_key_secret

    # MongoDB connection string
    MONGODB_URI=mongodb+srv://...
    ```
4.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## Future Enhancements

* Expand authentication to include more providers like Google and Facebook.
* Implement advanced analytics for creators to track their earnings and fan engagement.
* Add a feature for creators to set up different subscription tiers or exclusive content for supporters.

---

## Acknowledgements

A big thank you to the creators of **Next.js**, **React**, **Tailwind CSS**, and **NextAuth.js** for providing the powerful tools that made this project possible.