"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { courses, sessions } from "@/lib/data";

export default function CourseSessionsPage() {
  const params = useParams();
  const courseId = params.course_id?.toString();
  const [expandedSession, setExpandedSession] = useState<number | null>(null);

  const toggleSession = (id: number) => {
    setExpandedSession(expandedSession === id ? null : id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const courseData = courses.find(
    (course) => course.title.toLowerCase().replace(/\s+/g, "-") === courseId
  );

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl">Curso no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-2">
              <div className="text-sm text-muted-foreground font-mono tracking-wider">
                CURSO / {courseData.duration}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight">
                {courseData.title}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground">
                {courseData.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {courseData.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  {courseData.students}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      INSTRUCTOR
                    </div>
                    <div className="text-foreground">
                      {courseData.instructor}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      NIVEL
                    </div>
                    <div className="text-foreground">{courseData.level}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      INICIO
                    </div>
                    <div className="text-foreground">
                      {courseData.startDate}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-mono">
                      HORARIO
                    </div>
                    <div className="text-foreground">{courseData.schedule}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section className="py-20 sm:py-32 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">
                Plan de Sesiones
              </h2>
              <div className="text-sm text-muted-foreground font-mono">
                {sessions.length} sesiones • {courseData.duration}
              </div>
            </div>

            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 group cursor-pointer"
                >
                  <button
                    onClick={() => toggleSession(session.id)}
                    className="w-full p-6 sm:p-8 text-left"
                  >
                    <div className="grid lg:grid-cols-12 gap-4 sm:gap-8 items-start">
                      <div className="lg:col-span-2">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground font-mono">
                            Sesión {session.id}
                          </div>
                          <div className="text-xs text-muted-foreground px-2 py-1 border border-border rounded-full">
                            {session.duration}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-8 space-y-3">
                        <div>
                          <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                            {session.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mt-1">
                            <span>{formatDate(session.date)}</span>
                            <span>•</span>
                            <span>Docente: {session.instructor}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {session.description}
                        </p>
                      </div>

                      <div className="lg:col-span-2 flex justify-end">
                        <svg
                          className={`w-5 h-5 text-muted-foreground transform transition-transform duration-300 ${
                            expandedSession === session.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {expandedSession === session.id && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-border">
                      <div className="pt-6 space-y-4">
                        <div className="text-sm text-muted-foreground font-mono">
                          TEMAS A ABORDAR
                        </div>
                        <ul className="space-y-2">
                          {session.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 shrink-0"></div>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
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
              ¿Listo para comenzar?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Únete al curso y comienza tu journey en el desarrollo web full
              stack
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-3 border border-border text-muted-foreground rounded-lg hover:border-muted-foreground/50 hover:text-foreground transition-all duration-300"
              >
                Proximamente
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
