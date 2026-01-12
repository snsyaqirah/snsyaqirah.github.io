// Tech Stack / Skills Data
export const skills = {
    languages: [
        { name: "JavaScript", icon: "⚡", proficiency: 90 },
        { name: "TypeScript", icon: "📘", proficiency: 85 },
        { name: "Python", icon: "🐍", proficiency: 75 },
        { name: "Java", icon: "☕", proficiency: 70 },
        { name: "HTML5", icon: "🌐", proficiency: 95 },
        { name: "CSS3", icon: "🎨", proficiency: 90 },
    ],

    frontend: [
        { name: "React", icon: "⚛️", proficiency: 90 },
        { name: "Next.js", icon: "▲", proficiency: 85 },
        { name: "Vue.js", icon: "💚", proficiency: 75 },
        { name: "Tailwind CSS", icon: "🌊", proficiency: 85 },
        { name: "Redux", icon: "🔄", proficiency: 80 },
        { name: "React Native", icon: "📱", proficiency: 75 },
    ],

    backend: [
        { name: "Node.js", icon: "🟢", proficiency: 85 },
        { name: "Express", icon: "🚂", proficiency: 85 },
        { name: "Django", icon: "🎸", proficiency: 70 },
        { name: "GraphQL", icon: "◼️", proficiency: 75 },
        { name: "REST API", icon: "🔌", proficiency: 90 },
    ],

    databases: [
        { name: "MongoDB", icon: "🍃", proficiency: 85 },
        { name: "PostgreSQL", icon: "🐘", proficiency: 80 },
        { name: "MySQL", icon: "🐬", proficiency: 75 },
        { name: "Firebase", icon: "🔥", proficiency: 85 },
        { name: "Redis", icon: "🔴", proficiency: 70 },
    ],

    tools: [
        { name: "Git", icon: "📦", proficiency: 90 },
        { name: "Docker", icon: "🐳", proficiency: 75 },
        { name: "AWS", icon: "☁️", proficiency: 70 },
        { name: "Webpack", icon: "📦", proficiency: 75 },
        { name: "Jest", icon: "🃏", proficiency: 80 },
        { name: "Figma", icon: "🎨", proficiency: 75 },
    ]
};

// Get all skills as a flat array
export const getAllSkills = () => {
    return [
        ...skills.languages,
        ...skills.frontend,
        ...skills.backend,
        ...skills.databases,
        ...skills.tools
    ];
};

// Get skills by category
export const getSkillsByCategory = (category) => {
    return skills[category] || [];
};

// Get top skills (proficiency >= 85)
export const getTopSkills = () => {
    return getAllSkills().filter(skill => skill.proficiency >= 85);
};
