"use client";

// Import necessary types, components, and data
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";

// Function to set metadata for the page (title, description)
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind" },
    { name: "description", content: "Ultimate feedback for your dream role" },
  ];
}

// The main component for the home page
export default function Home() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])
  return (
      // Main container with a custom SVG background that covers the area
      <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar />
        {/* Section for the main heading and the resume cards */}
        <section className="main-section">
          <div className="page-heading">
            <h1>Track Your Applications & Resume Ratings</h1>
            <h2>Review your submissions and check AI-powered feedback.</h2>
          </div>
          {/* Conditionally render the resumes section only if there are resumes */}
          {resumes.length > 0 && (
              // Container for all resume cards
              <div className="resumes-section py-10">
                {/* Map over the resumes array to render a card for each one */}
                {resumes.map((resume) => (
                    <ResumeCard key={resume.id} resume={resume}/>
                ))}
              </div>
          )}
        </section>
      </main>
  );
}