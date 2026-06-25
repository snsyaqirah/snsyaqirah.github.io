// Project Data
export const projects = [
    {
        id: 1,
        slug: "travelluhh",
        title: "TravelLuhh",
        series: "Luhh Series",
        description: "Plan trips, track expenses, and manage budgets either solo or with your travel genk.",
        tech: ["React 18", "TypeScript", "Spring Boot", "Java 17", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Docker", "JWT", "TanStack Query"],
        category: "Full Stack",
        featured: true,
        liveUrl: null,
        githubUrl: "https://github.com/snsyaqirah/travelluhh",
        readmeFile: "travelluhh.md",
        highlights: [
            "JWT auth and OTP email verification",
            "Multi-currency support with live Frankfurter exchange rates",
            "Greedy debt simplification algorithm for group Settle Up",
            "Analytics bento dashboard with expense charts",
            "Travel portfolio with Year in Review, Timeline, and Map views"
        ]
    },
    {
        id: 2,
        slug: "planluhh",
        title: "PlanLuhh",
        series: "Luhh Series",
        description: "A one-stop solution for managing weddings and celebrations with ease and digitalization",
        tech: ["React", "TypeScript", "Python", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Docker", "JWT"],
        category: "Full Stack",
        featured: true,
        liveUrl: null,
        githubUrl: "https://github.com/snsyaqirah/planluhh",
        readmeFile: "planluhh.md",
        highlights: [
            "Full-stack planning and task management system",
            "Part of the Luhh Series ecosystem",
            "Built with Python backend and React frontend"
        ]
    },
    {
        id: 3,
        slug: "singgahluhh",
        title: "SinggahLuhh",
        series: "Luhh Series",
        description: "Discover and check in to masjid & surau near you. Community-driven info for every Muslim traveller.",
        tech: ["React", "TypeScript", "Python", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Docker", "JWT"],
        category: "Full Stack",
        featured: false,
        liveUrl: "https://singgahluhh.vercel.app/",
        githubUrl: "https://github.com/snsyaqirah/singgahluhh",
        readmeFile: "singgahluhh.md",
        highlights: [
            "Local place discovery and check-in system",
            "Part of the Luhh Series ecosystem",
            "Built with Python backend and React frontend"
        ]
    },
    {
        id: 4,
        slug: "redahluhh",
        title: "RedahLuhh",
        series: "Luhh Series",
        description: "Real time weather and route map for bikers.",
        tech: ["React", "TypeScript", "Python", "PostgreSQL", "Tailwind CSS", "shadcn/ui", "Docker", "JWT"],
        category: "Full Stack",
        featured: false,
        liveUrl: "https://redahluhh.vercel.app/",
        githubUrl: "https://github.com/snsyaqirah/redahluhh",
        readmeFile: "redahluhh.md",
        highlights: [
            "Challenge and streak tracking system",
            "Part of the Luhh Series ecosystem",
            "Built with Python backend and React frontend"
        ]
    },
    {
        id: 5,
        slug: "surveyluhh",
        title: "SurveyLuhh",
        series: "Luhh Series",
        description: "Scrape, compare, and share property listings with your house-hunting squad. No more juggling tabs.",
        tech: ["React", "TypeScript", "Python", "MongoDB", "Tailwind CSS", "shadcn/ui", "Docker", "BeautifulSoup4"],
        category: "Full Stack",
        featured: false,
        liveUrl: "https://surveyluhh.vercel.app/",
        githubUrl: "https://github.com/snsyaqirah/surveyluhh",
        readmeFile: "surveyluhh.md",
        highlights: [
            "Challenge and streak tracking system",
            "Part of the Luhh Series ecosystem",
            "Built with Python backend and React frontend"
        ]
    },
    {
        id: 6,
        slug: "momentous-foto",
        title: "Momentous Foto",
        series: "Client",
        description: "A frontend photography portfolio and gallery showcase. Clean, minimal, and immersive — built to let the photos do the talking.",
        tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "GitHub Pages"],
        category: "Frontend",
        featured: false,
        liveUrl: "https://momentous-foto.github.io/",
        githubUrl: "https://github.com/snsyaqirah/momentous-foto",
        readmeFile: "momentous-foto.md",
        highlights: [
            "Immersive photo gallery with smooth animations",
            "Responsive and minimal UI design",
            "Built with Framer Motion for fluid transitions"
        ]
    },
    {
        id: 7,
        slug: "momentous-studio-raya",
        title: "Momentous Studio Raya",
        series: "Client",
        description: "A full-stack studio booking and management app built for the Raya season. Manage photoshoot slots, client bookings, and packages — keeping the studio organised when it matters most.",
        tech: ["React", "TypeScript", "React Router", "Google Sheets API", "Tailwind CSS", "react-hook-form", "GitHub Pages"],
        category: "Full Stack",
        featured: true,
        liveUrl: "https://momentous-foto.github.io/momentous-studio-raya/",
        githubUrl: "https://github.com/snsyaqirah/momentous-studio-raya",
        readmeFile: "momentous-studio-raya.md",
        highlights: [
            "Studio booking and slot management system",
            "Client and package management",
            "Built for high-traffic seasonal use"
        ]
    },
];

// Filter projects by category
export const getProjectsByCategory = (category) => {
    if (category === "All") return projects;
    return projects.filter(project => project.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
    return projects.filter(project => project.featured);
};

// Get project by ID
export const getProjectById = (id) => {
    return projects.find(project => project.id === id);
};

// Get all unique categories
export const getCategories = () => {
    const categories = ["All", ...new Set(projects.map(project => project.category))];
    return categories;
};
