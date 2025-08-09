import React from "react";

interface ScoreBadgeProps {
    score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    let badgeColor = '';
    let badgeText = '';

    // Conditionally set the badge's style and text based on the score
    if (score > 70) {
        badgeColor = 'bg-badge-green text-green-600';
        badgeText = 'Strong';
    } else if (score > 49) {
        badgeColor = 'bg-badge-yellow text-yellow-600';
        badgeText = 'Good Start';
    } else {
        badgeColor = 'bg-badge-red text-red-600';
        badgeText = 'Needs Work';
    }

    return (
        // The container div applies the dynamic background color
        <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
            {/* The paragraph element displays the dynamic text */}
            <p className="text-sm font-medium">{badgeText}</p>
        </div>
    );
};

export default ScoreBadge;