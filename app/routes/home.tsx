"use client";
// Import necessary types, components, and hooks
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

// Function to set metadata for the page (title, description)
export function meta({}: Route.MetaArgs) {
    return [
        { title: "ResuMind" },
        { name: "description", content: "Ultimate feedback for your dream role" },
    ];
}

// The main component for the home page
export default function Home() {
    // Access Puter's authentication and key-value store
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    // State to hold the list of fetched resumes
    const [resumes, setResumes] = useState<Resume[]>([]);
    // State to track if resumes are currently being loaded
    const [loadingResumes, setLoadingResumes] = useState(false);

    // Effect to redirect unauthenticated users to the auth page
    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    // Effect to load resumes from the key-value store when the component mounts
    useEffect(() => {
        const loadResumes = async () => {
            // Set loading state to true to show a loading indicator
            setLoadingResumes(true);

            // Fetch all items from KV storage with keys starting with 'resume:'
            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            // Parse the JSON string value of each fetched item into a Resume object
            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            // Update the resumes state with the parsed data or an empty array
            setResumes(parsedResumes || []);
            // Set loading state to false once data is fetched and processed
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);


    return (
        // Main container with a custom SVG background that covers the area
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            {/* Section for the main heading and the resume cards */}
            <section className="main-section">
                <div className="page-heading">
                    <h1>Track Your Applications & Resume Ratings</h1>
                    {/* Conditionally render a subtitle based on loading state and if resumes exist */}
                    {!loadingResumes && resumes?.length === 0 ? (
                        <h2>No resumes found. Upload your first resume to get feedback.</h2>
                    ): (
                        <h2>Review your submissions and check AI-powered feedback.</h2>
                    )}
                </div>
                {/* Show a loading animation while resumes are being fetched */}
                {loadingResumes && (
                    <div className="flex flex-col items-center justify-center">
                        <img src="/images/resume-scan-2.gif" alt="Loading resumes" className="w-[200px]" />
                    </div>
                )}
                {/* Conditionally render the resumes section only if not loading and resumes exist */}
                {!loadingResumes && resumes.length > 0 && (
                    <div className="resumes-section">
                        {/* Map over the resumes state and render a ResumeCard for each */}
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}

                {/* If not loading and no resumes are found, show an "Upload Resume" button */}
                {!loadingResumes && resumes?.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-10 gap-4">
                        <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
                            Upload Resume
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}