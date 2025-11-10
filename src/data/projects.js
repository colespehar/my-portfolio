export const PROJECTS = [
	{
		id: 1,
		title: "Centralized Advisor Dashboard",
		category: "work",
		categoryGroup: "Frontend & UI",
		tags: ["React", "JavaScript", "Bootstrap", "Chart.js", "UI/UX"],
		blurb:
			"A centralized advisor hub built with React, JavaScript, CSS, and Bootstrap to streamline access to onboarding trackers, advisor leaderboards, and hierarchy views. Includes interactive Chart.js performance visualizations, AOS.js animations, and a fully responsive design backed by SQL-driven dashboards.",
		img: "././advisorpicture.png",
		media: {
			type: "video",
			preview: "././advisorvideo.mp4",
			poster: "././advisorpicture.png",
			modal: "././advisorvideo.mp4",
		},
		links: { github: "https://github.com/", demo: "#" },
	},
	{
		id: 2,
		title: "AWS Glue ETL for Trade Data",
		category: "work",
		categoryGroup: "Backend & Cloud",
		tags: ["AWS Glue", "Python", "S3", "Lambda", "Redshift"],
		blurb:
			"A fully automated ETL pipeline for processing NBIN trade data, using AWS Glue, S3, Lambda, Athena, and Redshift. Integrated validation logic ensured accurate and reliable delivery of clean trade data to advisor dashboards.",
		img: "././aws.png",
		media: {
			type: "video",
			preview: "././aws.png",
			poster: "././aws.png",
			modal: "././aws.png",
		},
		links: { demo: "#" },
	},
	{
		id: 3,
		title: "Retirement Decumulation App",
		category: "work",
		categoryGroup: "Frontend & UI",
		tags: ["React", "Bootstrap", "Chart.js", "Finance"],
		blurb:
			"An interactive platform built with React, Bootstrap, and Chart.js to help advisors manage retirement portfolios. Features data-driven fund visualizations, permission-based access controls, and responsive layouts for desktop and mobile.",
		img: "././retire.png",
		media: {
			type: "video",
			preview: "././retire.png",
			poster: "././retire.png",
			modal: "././retire.png",
		},
		links: { github: "https://github.com/", demo: "#" },
	},
	{
		id: 4,
		title: "AI Interview Platform",
		category: "personal",
		categoryGroup: "AI & Data",
		tags: ["Next.js", "Firebase", "AI", "Google Gemini"],
		blurb:
			"An AI-powered interview preparation platform simulating real job interviews using Vapi voice agents and Google Gemini. Built with Next.js, Firebase, and Tailwind CSS for responsive design and integrated with shadcn/ui for a polished UI experience.",
		img: "././interview-prep-img.png",
		media: {
			type: "video",
			preview: "././interview-prep-img.png",
			poster: "././interview-prep-img.png",
			modal: "././interview-prep-img.png",
		},
		links: {
			github: "https://github.com/colespehar/preppal_ai_interview",
			demo: "#",
		},
	},
	{
		id: 5,
		title: "AI Cocktail Generator",
		category: "personal",
		categoryGroup: "AI & Data",
		tags: ["JavaScript", "MongoDB", "Google Cloud Vision", "AI"],
		blurb:
			"A full-stack web app that generates custom cocktail recipes using AI-based image recognition and ingredient parsing. Built with JavaScript, MongoDB, and Google Cloud Vision API, and recognized with 1st place at Engineering Capstone Day for innovation and execution.",
		img: "././public/snapnmix.png",
		media: {
			type: "video",
			preview: "././SnapMix.mp4",
			poster: "././snapnmix.png",
			modal: "././SnapMix.mp4",
		},
		links: {
			github: "https://github.com/colespehar/snapnmix",
			demo: "https://snapnmix.com/",
		},
	},
	{
		id: 6,
		title: "AI Mini-map Arrow Tracker",
		category: "personal",
		categoryGroup: "AI & Data",
		tags: ["Python", "Computer Vision", "Analytics", "AI"],
		blurb:
			"A real-time minimap tracking system for Call of Duty gameplay, built with Python and computer vision. Detects player movement, death events, and objectives for advanced analytics and team performance review.",
		img: "././minimaptrack.png",
		media: {
			type: "video",
			preview: "././minimaptrack.png",
			poster: "././minimaptrack.png",
			modal: "././minimaptrack.png",
		},
		links: {
			github: "https://github.com/colespehar/ai-minimap-tracker",
			demo: "https://your-demo-link.com",
		},
	},
];

export const ALL_TAG = "All";
