// step492: lets make the page now starting with "rafce" followed by "making the function name and funciton in export to "About" from the default name "page there."

// step493: after the below page made now go to Footer.js file there for the next steps.

// Import React library which is necessary for any React component
import React from 'react';
// Import Head from next/head for managing document head elements (like title, meta tags)
import Head from 'next/head';
import Link from 'next/link';

// Define the About component as a functional component
const About = () => {
    return (
        // Main container div with max width, centered, and padding
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Head component to manage the document head */}
            <Head>
                {/* Set the page title that appears in browser tab */}
                <title>About - Get Me A Juice</title>
                {/* Meta description for SEO */}
                <meta name="description" content="Get Me A Juice is a crowdfunding platform where creators connect with supporters to bring creative projects to life through juice-powered funding." />
            </Head>

            {/* Hero Section - The main introductory section at the top */}
            <div className="text-center mb-16">
                {/* Main heading with responsive font sizes and styling */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#abe5f0] mb-6">
                    Fueling Creativity, <span className="text-orange-500">One Juice at a Time</span>
                </h1>
                {/* Subheading paragraph with max width constraint */}
                <p className="text-xl text-[#c5c5c5] max-w-3xl mx-auto">
                    Get Me A Juice is a vibrant crowdfunding platform where creators and supporters come together to make amazing projects happen. Just like a refreshing juice gives you energy, our platform energizes creative visions.
                </p>
            </div>

            {/* How It Works Section - Explains the platform process */}
            <div className="mb-16">
                {/* Section heading */}
                <h2 className="text-3xl font-bold text-center mb-12">How Get Me A Juice Works</h2>
                {/* Grid layout for the three steps - responsive (1 column on mobile, 3 on desktop) */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* First step card */}
                    <div className="bg-[#017070] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        {/* Circular number indicator with orange background */}
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-orange-500 text-2xl">1</span>
                        </div>
                        {/* Step title */}
                        <h3 className="text-xl font-semibold text-center mb-3">Creators Share Projects</h3>
                        {/* Step description */}
                        <p className="text-white text-center">
                            Creators post their creative projects, goals, and what they need support for.
                        </p>
                    </div>

                    {/* Second step card */}
                    <div className="bg-[#017070] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-orange-500 text-2xl">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Supporters Fuel the Vision</h3>
                        <p className="text-white text-center">
                            Fans and supporters contribute by &quot;buying a juice&quot; to help reach funding goals.
                        </p>
                    </div>

                    {/* Third step card */}
                    <div className="bg-[#017070] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <span className="text-orange-500 text-2xl">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-3">Projects Come to Life</h3>
                        <p className="text-white text-center">
                            When funded, creators deliver their projects and share the results with supporters.
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits Section - Split into two columns for creators and supporters */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Left column - Benefits for Creators */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">For Creators</h2>
                    {/* List of benefits with checkmark icons */}
                    <div className="space-y-4">
                        {/* First benefit item */}
                        <div className="flex items-start">
                            {/* Checkmark icon container */}
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    {/* Checkmark SVG icon */}
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            {/* Benefit text */}
                            <p className="ml-3 text-[#c5c5c5]">Direct funding from your most passionate supporters</p>
                        </div>

                        {/* Second benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Keep 100% creative control of your projects</p>
                        </div>

                        {/* Third benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Offer exclusive rewards and experiences to your backers</p>
                        </div>

                        {/* Fourth benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Build a sustainable creative practice with recurring support</p>
                        </div>
                    </div>
                </div>

                {/* Right column - Benefits for Supporters */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">For Supporters</h2>
                    <div className="space-y-4">
                        {/* First benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Be part of the creative process from the beginning</p>
                        </div>

                        {/* Second benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Get exclusive access and rewards from creators you love</p>
                        </div>

                        {/* Third benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Discover new and emerging talent before anyone else</p>
                        </div>

                        {/* Fourth benefit item */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <div className="bg-orange-100 p-2 rounded-full">
                                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <p className="ml-3 text-[#c5c5c5]">Join a community that celebrates creativity
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Section - Highlighted with orange background */}
            <div className="bg-[#5e5e5e] rounded-2xl p-8 md:p-12 mb-16">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="text-xl text-white text-center max-w-4xl mx-auto">
                    At Get Me A Juice, we believe that great ideas deserve to be shared with the world. We&apos;re building a platform that makes it simple for creators to get the support they need and for fans to directly contribute to the work they love. Like a refreshing juice on a hot day, we&apos;re here to energize the creative economy.
                </p>
            </div>

            {/* Stats Section - Shows platform statistics */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Our Vision - For Success</h2>
                {/* Grid layout for three stats */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* First stat */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">1000+</div>
                        <p className="text-[#c5c5c5]">Projects Funded</p>
                    </div>
                    {/* Second stat */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                        <p className="text-[#c5c5c5]">Creator Satisfaction</p>
                    </div>
                    {/* Third stat */}
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-500 mb-2">$1M+</div>
                        <p className="text-[#c5c5c5]">Raised for Creators</p>
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section - Encourages user action */}
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Juice Up Your Creativity?</h2>
                <p className="text-xl text-[#c5c5c5] mb-8 max-w-2xl mx-auto">
                    Whether you&apos;re a creator looking for support or a fan wanting to fuel great projects, we&apos;ve got you covered.
                </p>
                {/* Button group */}
                <div className="space-x-4">
                    {/* Login button - links to /login */}
                    <Link href="/login" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                        Login to Get Started
                    </Link>
                    {/* Home button - links to root */}
                    <Link href="/" className="inline-block bg-white hover:bg-gray-100 text-orange-500 font-semibold py-3 px-6 border border-orange-500 rounded-lg transition-colors">
                        Explore Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Export the component as default
export default About;

// step503: now lets use the metadata below to set the title an dmeta description for this "/about" page here now below.

// step504: see the next steps in the dashboard foler's page.js file now.
export const metadata = {
    title: "About - Get Me A Juice",
    description: "Learn how Get Me A Juice connects creators with supporters to bring creative projects to life through juice-powered funding."
}