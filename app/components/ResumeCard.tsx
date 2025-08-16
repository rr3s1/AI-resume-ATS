import React, { useEffect, useState } from 'react'
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { usePuterStore } from '~/lib/puter';

// Define the ResumeCard component, destructuring props for easy access
const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {

    // Access Puter's file system API
    const { fs } = usePuterStore();
    // State to store the blob URL for the resume image
    const [resumeUrl, setResumeUrl] = useState('');

    // Effect to load the resume image when the imagePath changes
    useEffect(() => {
        const loadResume = async () => {
            // Read the image file as a blob from the file system using its path
            const blob = await fs.read(imagePath);
            if(!blob) return; // Exit if the blob is not found
            // Create a temporary URL for the blob object
            let url = URL.createObjectURL(blob);
            // Set the generated URL to the state to trigger a re-render
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        // The entire card is a link to the detailed resume feedback page
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            {/* Container for the resume's text-based information */}
            <div className="resume-card-header">
            <div className="flex flex-col gap-2">
                {/* Conditionally render company name if it exists */}
                {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                {/* Conditionally render job title if it exists */}
                {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                {/* If both are missing, show a generic "Resume" title */}
                {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
            </div>
            {/* Container for the visual score circle */}
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore} />
            </div>
            </div>
            {/* Wrapper for the resume image, rendered only if resumeUrl is available */}
            {resumeUrl && (
                <div className="gradient-border animate-in fade-in duration-1000">
                    <div className="w-full h-full">
                        <img
                            src={resumeUrl} // Use the blob URL from state as the image source
                            alt="resume"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                    </div>
                </div>
            )}
        </Link>
    )
}
export default ResumeCard;


