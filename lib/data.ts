export interface Course {
    id: number;
    year: string;
    level: string;
    title: string;
    description: string;
    tech: string[];
    duration: string;
    students: string;
    instructor: string;
    startDate?: string;
    schedule?: string;
}

export const courses: Course[] = [
    {
        id: 1,
        year: "2025",
        level: "Básico",
        title: "Desarrollo Web con Python",
        description:
            "Domina hooks personalizados, patrones de renderizado y optimización de performance en aplicaciones React de gran escala.",
        tech: ["TypeScript", "HTML", "CSS", "React", "Python"],
        duration: "4 semanas",
        students: "Limitado",
        instructor: "Desarrollador Web Jose Santos",
        startDate: "18 de Noviembre de 2025",
        schedule: "Martes y Jueves de 7:00 PM a 10:00 PM",
    },
];

export interface Session {
    id: number;
    date: string;
    duration: string;
    title: string;
    description: string;
    instructor: string;
    topics: string[];
}

export const sessions: Session[] = [
  {
    id: 1,
    date: "2025-01-15",
    duration: "2 horas",
    title: "Fundamentos del Desarrollo Web",
    description: "Introducción a las principales tecnologías y funcionamiento de aplicaciones web modernas.",
    instructor: "Ing. José",
    topics: [
      "Principales tecnologías web: HTML, CSS, Frameworks",
      "Frameworks de Backend y Frontend",
      "Herramientas en la nube",
      "Funcionamiento de las aplicaciones web"
    ]
  },
  {
    id: 2,
    date: "2025-01-17",
    duration: "2 horas",
    title: "Python - Fundamentos",
    description: "Lenguaje de programación versátil para desarrollo web, ciencia de datos y machine learning.",
    instructor: "Ing. José",
    topics: [
      "Introducción a Python",
      "Principales estructuras en Python",
      "Programación orientada a objetos",
      "Módulos y librerías"
    ]
  },
  {
    id: 3,
    date: "2025-01-22",
    duration: "2 horas",
    title: "Control de Versiones con Git",
    description: "Herramientas esenciales para documentar proyectos y colaborar en equipos.",
    instructor: "Ing. José",
    topics: [
      "Control de versiones con Git",
      "Trabajo con ramas",
      "Repositorios en la nube: Github",
      "Integración Git/Github"
    ]
  },
  {
    id: 4,
    date: "2025-01-24",
    duration: "2 horas",
    title: "CSS y Estilos Web",
    description: "Fundamentos de diseño y estilos para interfaces web modernas.",
    instructor: "Ing. José",
    topics: [
      "Estilos en CSS",
      "Selectores y prioridad en CSS",
      "Bootstrap y clases CSS",
      "Diseño responsive"
    ]
  },
  {
    id: 5,
    date: "2025-01-29",
    duration: "2 horas",
    title: "CSS Avanzado y Frameworks",
    description: "Profundización en técnicas avanzadas de CSS y uso de frameworks.",
    instructor: "Ing. José",
    topics: [
      "CSS Grid y Flexbox",
      "Animaciones y transiciones",
      "Frameworks CSS modernos",
      "Buenas prácticas en CSS"
    ]
  },
  {
    id: 6,
    date: "2025-01-31",
    duration: "2 horas",
    title: "Django - Backend con Python",
    description: "Framework robusto para desarrollo de aplicaciones escalables.",
    instructor: "Ing. José",
    topics: [
      "Estructura y configuración de Django",
      "Aplicaciones básicas y renderizado HTML",
      "Archivos estáticos y estilos",
      "Contexto en vistas y flujo de datos"
    ]
  },
  {
    id: 7,
    date: "2025-02-05",
    duration: "2 horas",
    title: "Bases de Datos con MySQL",
    description: "Integración de bases de datos SQL con aplicaciones Django.",
    instructor: "Ing. José",
    topics: [
      "Sentencias SQL fundamentales",
      "Configuración de BD en Django",
      "Django ORM y queries",
      "Modelos y migraciones"
    ]
  },
  {
    id: 8,
    date: "2025-02-07",
    duration: "2 horas",
    title: "JavaScript y React",
    description: "Desarrollo frontend moderno con JavaScript y React.",
    instructor: "Ing. José",
    topics: [
      "JavaScript: variables y estructuras",
      "Manipulación del DOM",
      "Conceptos de React: estados y componentes",
      "Integración React con Django"
    ]
  }
]