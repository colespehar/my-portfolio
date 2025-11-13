// IMPORT ALL ASSETS (Vite will now include them in dist/assets/)
import advisorPic from "../assets/advisorpicture.png";
import advisorVid from "../assets/advisorvideo.mp4";

import awsImg from "../assets/aws.png";

import retireImg from "../assets/retire.png";

import interviewImg from "../assets/interview-prep-img.png";

import snapmixImg from "../assets/snapnmix.png";
import snapmixVid from "../assets/SnapMix.mp4";

import minimapImg from "../assets/minimaptrack.png";

export const PROJECTS = [
	{
		id: 1,
		title: "Centralized Advisor Dashboard",
		category: "work",
		categoryGroup: "Frontend & UI",
		tags: ["React", "JavaScript", "Bootstrap", "Chart.js", "UI/UX"],
		blurb:
			"A centralized advisor hub built with React, JavaScript, CSS, and Bootstrap to streamline access to onboarding trackers, advisor leaderboards, and hierarchy views. Includes interactive Chart.js performance visualizations, AOS.js animations, and a fully responsive design backed by SQL-driven dashboards.",
		img: advisorPic,
		media: {
			type: "video",
			preview: advisorVid,
			poster: advisorPic,
			modal: advisorVid,
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
		img: awsImg,
		media: {
			type: "video",
			preview: awsImg,
			poster: awsImg,
			modal: awsImg,
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
		img: retireImg,
		media: {
			type: "video",
			preview: retireImg,
			poster: retireImg,
			modal: retireImg,
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
		img: interviewImg,
		media: {
			type: "video",
			preview: interviewImg,
			poster: interviewImg,
			modal: interviewImg,
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
		img: snapmixImg,
		media: {
			type: "video",
			preview: snapmixVid,
			poster: snapmixImg,
			modal: snapmixVid,
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
		img: minimapImg,
		media: {
			type: "video",
			preview: minimapImg,
			poster: minimapImg,
			modal: minimapImg,
		},
		links: {
			github: "https://github.com/colespehar/ai-minimap-tracker",
			demo: "https://cdn.pixabay.com/photo/2020/07/08/13/54/coming-soon-5383990_1280.jpg",
		},
	},
];

export const ALL_TAG = "All";
