// Project Data
export const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include product management, shopping cart, payment integration, and admin dashboard.",
        image: "/images/projects/ecommerce.jpg",
        tech: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        category: "Full Stack",
        featured: true,
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "Implemented secure payment processing",
            "Built responsive admin dashboard",
            "Optimized database queries for performance"
        ]
    },
    {
        id: 2,
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates using Socket.io. Built with React and Firebase.",
        image: "/images/projects/taskmanager.jpg",
        tech: ["React", "Firebase", "Socket.io", "Tailwind CSS"],
        category: "Frontend",
        featured: true,
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "Real-time collaboration features",
            "Drag-and-drop task organization",
            "User authentication and authorization"
        ]
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "A weather dashboard that displays current weather and forecasts using OpenWeather API. Features location search and favorite locations.",
        image: "/images/projects/weather.jpg",
        tech: ["React", "API Integration", "Chart.js", "CSS Modules"],
        category: "Frontend",
        featured: false,
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "Interactive weather visualizations",
            "Geolocation support",
            "Responsive design"
        ]
    },
    {
        id: 4,
        title: "RESTful API Service",
        description: "A scalable RESTful API built with Node.js and Express, featuring JWT authentication, rate limiting, and comprehensive documentation.",
        image: "/images/projects/api.jpg",
        tech: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"],
        category: "Backend",
        featured: true,
        liveUrl: null,
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "JWT-based authentication",
            "Rate limiting and security measures",
            "Comprehensive API documentation"
        ]
    },
    {
        id: 5,
        title: "Portfolio CMS",
        description: "A headless CMS for managing portfolio content with a custom admin panel. Built with Next.js and Strapi.",
        image: "/images/projects/cms.jpg",
        tech: ["Next.js", "Strapi", "GraphQL", "PostgreSQL"],
        category: "Full Stack",
        featured: false,
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "Custom content types",
            "GraphQL API",
            "Media library management"
        ]
    },
    {
        id: 6,
        title: "Mobile Fitness Tracker",
        description: "A React Native mobile app for tracking workouts and nutrition. Features include workout logging, progress charts, and goal setting.",
        image: "/images/projects/fitness.jpg",
        tech: ["React Native", "Expo", "Firebase", "Redux"],
        category: "Mobile",
        featured: false,
        liveUrl: null,
        githubUrl: "https://github.com/snsyaqirah/project",
        highlights: [
            "Cross-platform mobile app",
            "Offline data synchronization",
            "Push notifications"
        ]
    }
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
