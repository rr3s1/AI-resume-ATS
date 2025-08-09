import React from 'react'
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

// A reusable sub-component to display each scoring category
const Category = ({ title, score }: { title: string, score: number }) => {
    // Determine text color based on the score for visual feedback
    const textColor = score > 70 ? 'text-green-600'
        : score > 49
            ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p className="text-xl">{title}</p>
                    {/* Display the qualitative badge next to the title */}
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    {/* Display the score with its dynamic color */}
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

// The main Summary component that aggregates all the feedback
const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full">
            <div className="flex flex-row items-center p-4 gap-8">
                {/* Visual gauge for the overall score */}
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            {/* Render a Category component for each scoring metric */}
            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    )
}
export default Summary