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
                          className={`w-5 h-5 text-muted-foreground transform transition-transform duration-300 ${expandedSession === session.id ? "rotate-180" : ""
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

                      {session.resources && session.resources.length > 0 && (
                        <div className="pt-6 space-y-4 border-t border-border mt-6">
                          <div className="text-sm text-muted-foreground font-mono">
                            RECURSOS ADJUNTOS
                          </div>
                          <div className="grid sm:grid-cols-2 gap-4">
                            {session.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.url}
                                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group/resource"
                              >
                                <div className="p-2 rounded-md bg-muted group-hover/resource:bg-background transition-colors">
                                  {resource.type === "pdf" && (
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                      />
                                    </svg>
                                  )}
                                  {resource.type === "github" && (
                                    <svg
                                      className="w-4 h-4"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                  )}
                                  {(resource.type === "video" ||
                                    resource.type === "link") && (
                                      <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                      </svg>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">
                                    {resource.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground capitalize">
                                    {resource.type}
                                  </div>
                                </div>
                                <svg
                                  className="w-4 h-4 text-muted-foreground group-hover/resource:translate-x-0.5 transition-transform"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
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
