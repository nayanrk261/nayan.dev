import type { TechCategory } from "@/types";

import reactIcon from "@/assets/logos/tech_stack/react.svg";
import tailwindIcon from "@/assets/logos/tech_stack/tailwindcss.svg";
import pythonIcon from "@/assets/logos/tech_stack/python.svg";
import javaIcon from "@/assets/logos/tech_stack/java.svg";
import cppIcon from "@/assets/logos/tech_stack/cpp.svg";
import jsIcon from "@/assets/logos/tech_stack/javascript.svg";
import nextjsIcon from "@/assets/logos/tech_stack/nextjs.svg";
import nodejsIcon from "@/assets/logos/tech_stack/nodejs.svg";
import expressIcon from "@/assets/logos/tech_stack/express.svg";

import mysqlIcon from "@/assets/logos/tech_stack/mysql.svg";
import mongodbIcon from "@/assets/logos/tech_stack/mongodb.svg";

import gitIcon from "@/assets/logos/tech_stack/git.svg";
import githubDarkIcon from "@/assets/logos/tech_stack/github-dark.svg";
import githubWhiteIcon from "@/assets/logos/tech_stack/github-white.svg";
import vercelDarkIcon from "@/assets/logos/tech_stack/vercel-dark.svg";
import vercelWhiteIcon from "@/assets/logos/tech_stack/vercel-white.svg";
import canvaIcon from "@/assets/logos/tech_stack/canva.svg";
import vscodeIcon from "@/assets/logos/tech_stack/vscode.svg";
import railwayIcon from "@/assets/logos/tech_stack/railway.svg";
import postmanIcon from "@/assets/logos/tech_stack/postman.svg";

export function getTechCategories(darkMode: boolean): TechCategory[] {
  const githubIcon = darkMode ? githubWhiteIcon : githubDarkIcon;
  const vercelIcon = darkMode ? vercelWhiteIcon : vercelDarkIcon;

  return [
    {
      label: "Languages & Frameworks",
      items: [
        { name: "C++", icon: cppIcon },
        { name: "JavaScript", icon: jsIcon },
        { name: "Python", icon: pythonIcon },
        { name: "Java", icon: javaIcon },
        { name: "React.js", icon: reactIcon },
        { name: "Next.js", icon: nextjsIcon },
        { name: "Node.js", icon: nodejsIcon },
        { name: "Express.js", icon: expressIcon },
        { name: "Tailwind CSS", icon: tailwindIcon },
      ],
    },
    {
      label: "Databases",
      items: [
        { name: "MySQL", icon: mysqlIcon },
        { name: "MongoDB", icon: mongodbIcon },
      ],
    },
    {
      label: "Tools & Platforms",
      items: [
        { name: "Git", icon: gitIcon },
        { name: "GitHub", icon: githubIcon },
        { name: "Vercel", icon: vercelIcon },
        { name: "Canva", icon: canvaIcon },
        { name: "VS Code", icon: vscodeIcon },
        { name: "Railway", icon: railwayIcon },
        { name: "Postman", icon: postmanIcon },
      ],
    },
  ];
}
