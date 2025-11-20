"use client";

import { courses } from "@/lib/data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Custom Hooks
const useTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
};

const useSectionObserver = () => {
  const [activeSection, setActiveSection] = useState("");
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return { activeSection, sectionsRef };
};

// Navigation Components
const NavigationDots = ({
  activeSection,
  sections,
}: {
  activeSection: string;
  sections: string[];
}) => (
  <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() =>
            document
              .getElementById(section)
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className={`w-2 h-8 rounded-full transition-all duration-500 ${
            activeSection === section
              ? "bg-foreground"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`}
          aria-label={`Navigate to ${section}`}
        />
      ))}
    </div>
  </nav>
);

const ThemeToggle = ({
  isDark,
  toggleTheme,
}: {
  isDark: boolean;
  toggleTheme: () => void;
}) => (
  <button
    onClick={toggleTheme}
    className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
    aria-label="Toggle theme"
  >
    {isDark ? (
      <svg
        className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
);

// Section Components
const HeaderSection = ({
  refCallback,
}: {
  refCallback: (el: HTMLElement | null) => void;
}) => (
  <header
    id="intro"
    ref={refCallback}
    className="min-h-screen flex items-center opacity-0"
  >
    <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
      <div className="lg:col-span-3 space-y-6 sm:space-y-8">
        <div className="space-y-3 sm:space-y-2">
          <div className="text-sm text-muted-foreground font-mono tracking-wider">
            CONSULTORÍA TECNOLÓGICA / 2025
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
            Espacio
            <br />
            <span className="text-muted-foreground">Digital</span>
          </h1>
        </div>

        <div className="space-y-6 max-w-md">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Aprendemos haciendo: todos podemos aprender a crear
            <span className="text-foreground"> productos digitales</span>,
            <span className="text-foreground"> experiencias web</span> y Cursos
            prácticos y proyectos reales para aplicar lo aprendido y obtener
            resultados tangibles.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Disponible para proyectos
            </div>
            <div>Consultoría remota</div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-mono">
            SERVICIOS PRINCIPALES
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="text-foreground">Desarrollo Web</div>
              <div className="text-xs text-muted-foreground">
                Aplicaciones modernas y escalables
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-foreground">Consultoría Técnica</div>
              <div className="text-xs text-muted-foreground">
                Arquitectura y mejores prácticas
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-foreground">Mentoría</div>
              <div className="text-xs text-muted-foreground">
                Formación de equipos y desarrolladores
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground font-mono">
            TECNOLOGÍAS PRINCIPALES
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "TypeScript",
              "Next.js",
              "Node.js",
              "AWS",
              "PostgreSQL",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </header>
);

const CoursesSection = ({
  refCallback,
}: {
  refCallback: (el: HTMLElement | null) => void;
}) => {
  return (
    <section
      id="courses"
      ref={refCallback}
      className="min-h-screen py-20 sm:py-32 opacity-0"
    >
      <div className="space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-light">
            Cursos Disponibles
          </h2>
          <div className="text-sm text-muted-foreground font-mono">2025</div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {courses.map((course, index) => (
            <Link
              href={`/courses/${course.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              key={index}
              className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 px-2 sm:px-4 hover:bg-accent/50 rounded-lg"
            >
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                    {course.year}
                  </div>
                  <div className="text-xs text-muted-foreground px-4 py-1 border border-border rounded-full w-fit">
                    {course.level}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium  group-hover:text-muted-foreground transition-colors duration-300 group-hover:underline">
                    {course.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                    <span>{course.duration}</span>
                    <span>{course.students}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-lg">
                  {course.description}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                {course.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({
  refCallback,
}: {
  refCallback: (el: HTMLElement | null) => void;
}) => (
  <section id="contact" ref={refCallback} className="py-20 sm:py-32 opacity-0">
    <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl font-light">Conectemos</h2>

        <div className="space-y-6">
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            ¿Tienes un proyecto en mente o quieres colaborar? Estoy siempre
            abierto a conversar sobre nuevas oportunidades y ideas innovadoras.
          </p>

          <div className="space-y-4">
            <Link
              href="mailto:daylersan@gmail.com"
              className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
            >
              <span className="text-base sm:text-lg">daylersan@gmail.com</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8">
        <div className="text-sm text-muted-foreground font-mono">
          ENCUÉNTRAME EN
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: "GitHub",
              handle: "@daylerjeff199906",
              url: "https://github.com/daylerjeff199906",
              description: "Proyectos y código",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" />
                </svg>
              ),
            },
            {
              name: "LinkedIn",
              handle: "José Jefferson Santos Panaifo",
              url: "https://www.linkedin.com/in/jos%C3%A9-jefferson-santos-panaifo-3668a7246/",
              description: "Experiencia profesional",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 11v5" />
                  <path d="M8 8v.01" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                  <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
                </svg>
              ),
            },
          ].map((social) => (
            <Link
              key={social.name}
              href={social.url}
              className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{social.svg}</span>
                  <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                    {social.name}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {social.handle}
                </div>
                <div className="text-xs text-muted-foreground/70">
                  {social.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({
  toggleTheme,
  isDark,
}: {
  toggleTheme: () => void;
  isDark: boolean;
}) => (
  <footer className="py-12 sm:py-16 border-t border-border">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          © 2025 Academia Digital. Todos los derechos reservados.
        </div>
        <div className="text-xs text-muted-foreground">
          Desarrollado con Next.js y TypeScript
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

        <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
          <svg
            className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  </footer>
);

// Main Component
export default function CoursesPage() {
  const { isDark, toggleTheme } = useTheme();
  const { activeSection, sectionsRef } = useSectionObserver();

  const sections = ["intro", "courses", "contact"];

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <NavigationDots activeSection={activeSection} sections={sections} />

      <main className="max-w-4xl mx-auto px-6 ">
        <HeaderSection refCallback={(el) => (sectionsRef.current[0] = el)} />
        <CoursesSection refCallback={(el) => (sectionsRef.current[1] = el)} />
        <ContactSection refCallback={(el) => (sectionsRef.current[2] = el)} />
        <Footer toggleTheme={toggleTheme} isDark={isDark} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
