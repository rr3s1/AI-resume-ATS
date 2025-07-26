import React from 'react'
import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

// Define the ResumeCard component, destructuring props for easy access
const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    return (
        // The entire card is a link to the detailed resume feedback page
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            {/* Container for the resume's text-based information */}
            <div className="flex flex-col gap-2">
                <h2 className="!text-black font-bold break-words">{companyName}</h2>
                <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
            </div>
            {/* Container for the visual score circle */}
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore} />
            </div>
            {/* Wrapper for the resume image with a decorative gradient border */}
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    {/* The resume preview image */}
                    <img
                        src={imagePath}
                        alt="resume"
                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                    />
                </div>
            </div>
        </Link>
    )
}

export default ResumeCard