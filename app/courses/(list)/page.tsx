"use client";

import { Course, courses } from "@/lib/data";
import Link from "next/link";

// Componente Card reutilizable
const CourseCard = ({
  course,
  variant = "grid",
}: {
  course: Course;
  variant?: "grid" | "list";
}) => {
  if (variant === "list") {
    return (
      <Link
        href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
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
            <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300 group-hover:underline">
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
          {course.tech.map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    );
  }

  // Variante grid para el hero
  return (
    <Link
      href={`/courses/${course.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer bg-background/50 backdrop-blur-sm"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground font-mono">
              {course.year}
            </div>
            <div className="text-xs text-muted-foreground px-3 py-1 border border-border rounded-full">
              {course.level}
            </div>
          </div>
          <svg
            className="w-5 h-5 text-muted-foreground transform group-hover:translate-x-1 transition-transform duration-300"
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
        </div>

        <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed text-sm">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {course.tech.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs text-muted-foreground rounded border border-border"
            >
              {tech}
            </span>
          ))}
          {course.tech.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{course.tech.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>{course.duration}</span>
          <span>{course.students}</span>
        </div>
      </div>
    </Link>
  );
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-8 sm:space-y-12 text-center">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground font-mono tracking-wider">
                CATÁLOGO DE CURSOS / 2025
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                Nuestros Cursos
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Programas especializados diseñados para llevarte de principiante
                a desarrollador profesional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="py-20 sm:py-32 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">
                Todos los Cursos
              </h2>
              <div className="text-sm text-muted-foreground font-mono">
                {courses.length} cursos disponibles
              </div>
            </div>

            <div className="space-y-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 text-center">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-light">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Contáctanos para cursos personalizados o programas corporativos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3 border border-foreground text-foreground rounded-lg hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Contactar ahora
              </Link>
              <Link
                href="/"
                className="px-8 py-3 border border-border text-muted-foreground rounded-lg hover:border-muted-foreground/50 hover:text-foreground transition-all duration-300"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
