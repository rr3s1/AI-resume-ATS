import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

// SEO metadata for the page
export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams(); // Hook to get the dynamic ':id' from the URL
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    // Effect to handle authentication check
    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, auth.isAuthenticated, id, navigate]);

    // Effect to load the resume data when the component mounts or ID changes
    useEffect(() => {
        const loadResume = async () => {
            // Fetch the resume metadata from the key-value store
            const resume = await kv.get(`resume:${id}`);
            if(!resume) return;

            const data = JSON.parse(resume);

            // Read the stored PDF file as a blob from the filesystem
            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            // Create a temporary URL for the PDF blob to be used in the <a> tag
            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            // Read the stored image file as a blob
            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;

            // Create a temporary URL for the image blob to be used in the <img> tag
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            // Set the feedback data into state
            setFeedback(data.feedback);
        }

        if(id) {
            loadResume();
        }
    }, [id, fs, kv]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            {/* Main container with responsive layout: row on desktop, reversed column on mobile */}
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                {/* Left section for the resume image preview */}
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-2xl:h-fit w-fit">
                            {/* Link opens the full PDF in a new tab */}
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                {/* Right section for the AI feedback */}
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        // If feedback data is loaded, render the analysis components
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        // Otherwise, show a loading/scanning animation
                        <img src="/images/resume-scan-2.gif" className="w-full" />
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume