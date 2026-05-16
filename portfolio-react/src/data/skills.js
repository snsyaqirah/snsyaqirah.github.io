// Tech Stack / Skills Data
export const skills = {
    "Languages & Frameworks": [
        { name: "PHP (Yii2)" },
        { name: "Java (Spring Boot)" },
        { name: "React" },
        { name: "Next.js" },
        { name: "Node.js" },
        { name: "React Native (Expo)" },
        { name: "HTML" },
        { name: "CSS" },
        { name: "Bootstrap" },
        { name: "Tailwind" },
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Pandas" },
        { name: "Selenium" },
        { name: "MySQL" },
        { name: "PostgreSQL" },
    ],

    "Tools & Platforms": [
        { name: "Git" },
        { name: "GitHub" },
        { name: "PhpMyAdmin" },
        { name: "WordPress" },
        { name: "Figma" },
        { name: "Google Cloud Console" },
        { name: "Power BI" },
        { name: "Claude AI" },
        { name: "Gemini" },
        { name: "GitHub Copilot" },
        { name: "Docker" },
        { name: "DBeaver" },
    ],
};

// Get all skills as a flat array
export const getAllSkills = () => {
    return Object.values(skills).flat();
};

// Get skills by category
export const getSkillsByCategory = (category) => {
    return skills[category] || [];
};
