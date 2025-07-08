import Image from "next/image";
import DynamicSvgIcon from "../../svg/DynamicSvgIcon";
import BioCode from "./BioCode.mdx"
import Me from "../../../../public/me.jpg"

const experiences = [
  {
    year: "2025",
    title: "Internship Backend Developer ",
    company: "PT. Eka Abhipraya Semesta",
    period: "March - July 2025",
    details: [
      "Developed and maintained backend services using Express.js for a government information system called SIDATA, designed for the city of South Tangerang (Tangsel).",
      "Designed and implemented RESTful APIs to handle community service data and generate QR codes for simplified access to public services.",
    ],
    icon: "react",
    color: "bg-[#61DAFB]",
  },
  {
    year: "2024",
    title: "Internship Fullstack Developer",
    company: "PT. Radar Teknologi Komputer",
    period: "September - December 2024",
    icon: "nodejs",
    details: [
      "Worked on and managed several real projects for clients.",
      "Contributed to the development of various web projects using modern technologies such as Laravel, Filament, and TailwindCSS."
    ],
    color: "bg-[#3c873a]",
  },
  {
    year: "2024",
    title: "Reasearch and Development",
    company: "Informatics Engineering Student Association (HMIF) ",
    period: "February 2024 - Present",
    icon: "typescript",
    color: "bg-[#3178C6]",
    details: [
      "Responsible for teaching full-stack web development through workshops and bootcamps organized by HMIF.",
      "Developed full-stack training modules that mirror industry practices by integrating collaboration between frontend and backend teams. "
    ]
  },
  {
    title: "Presenter PMB",
    company: "Indonesian Institute of Technology",
    period: "January 2024 - Present",
    details: [
      "Representing the university at strategic event booths to promote academic programs to prospective students.",
      "Delivering engaging presentations about study programs, campus facilities, and the institution's key advantages. ",
    ],
  },
  {
    title: "Computer Science Lab Assistant",
    company: "Indonesian Institute of Technology",
    period: "September 2023 - Present",
    details: [
      "Delivering guidance to students to enhance their understanding of fundamental and advanced programming concepts.",
      "Assessing and grading students based on their performance in tasks and projects.",
    ],
  },
  // Tambahkan pengalaman lain sesuai kebutuhan
];

const Bio =  () => {
  const currentFavoriteTechStack = [
    { name: "NextJS", icon: "nextjs", color: "fill-secondary" },
    { name: "React.js", icon: "react", color: "fill-[#61dbfb]" },
    { name: "TypeScript", icon: "typescript", color: "fill-[#007ACC]" },
    { name: "JavaScript", icon: "javascript", color: "fill-[#f0db4f]" },
    { name: "TailwindCSS", icon: "tailwind", color: "fill-[#3490dc]" },
    { name: "Node.js", icon: "nodejs", color: "fill-[#3c873a]" },
  ];

  return (
    <div className="grid md:grid-cols-2 h-full">
      <div className="overflow-auto border-r border-line md:block hidden">
        <BioCode />
      </div>
      <div className="px-4 pt-4 pb-8 overflow-auto">
        <Image
          src={Me}
          width={140}
          height={140}
          alt="profile picture"
          className="rounded float-left mr-4 mb-1"
          placeholder="blur"
        />
        <div className="space-y-3">
          <p>
            Hey there, I'm Raj Alam, but you can call me Alam. I've got around 4
            years of experience in Web Development. My coding journey began way
            back in my first year of high school. and My first programming
            language was Java, how did that happen? Well, here's the funny
            story: I was curious about Web Development and how websites are
            created. After reading some articles, I found out that JavaScript
            was one of the languages used for web stuff. And guess what? I
            thought Java was shorthand for JavaScript LOL. As a result, I began
            searching for Java programming tutorials on YouTube.
          </p>
          <p>
            After studying Java for a few months, I finally realized that Java
            and JavaScript are actually different programming languages LOL!
            Once I understood this distinction, I immediately switched to
            JavaScript and started learning a lot about Web Development,
            continuing up until now.
          </p>
        </div>
        <div className="mt-6">
          <h5 className="text-lg text-accent font-semibold mb-4">
            Experiences
          </h5>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-2 top-0 w-1 h-full bg-gradient-to-b from-accent to-primary/30 rounded-full z-0" />
            <div className="flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative flex items-start group">
                  {/* Timeline node */}
                  <div className="absolute -left-4 top-2 flex flex-col items-center z-10">
                    <div className="w-4 h-4 rounded-full bg-accent border-4 border-white dark:border-black shadow-lg transition-transform duration-300 group-hover:scale-110" />
                    {/* Line to next node */}
                    {idx < experiences.length - 1 && (
                      <div className="w-1 h-24 bg-gradient-to-b from-accent/80 to-primary/30 mx-auto"></div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="ml-4 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 mb-1 justify-between">
                      <span className="font-bold text-lg text-accent">{exp.title}</span>
                      <span className="text-secondary text-xs md:ml-3">{exp.period}</span>
                    </div>
                    <div className="mb-2 text-secondary">
                      {exp.company}
                    </div>
                      <ul className="list-disc list-outside text-textiary space-y-1 pl-5">
                        {exp.details.map((detail, i) => (
                          <li
                            key={i}
                            className="text-base ml-0"
                            dangerouslySetInnerHTML={{ __html: detail }}
                          />
                        ))}
                      </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h5 className="text-lg text-accent font-semibold mb-2">
            Current favorite tech stack
          </h5>
          <div className="flex gap-4 flex-wrap">
            {currentFavoriteTechStack.map((stack) => {
              return (
                <div key={stack.icon} className="relative">
                  <DynamicSvgIcon
                    name={stack.icon}
                    className={`w-10 ${stack.color}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-start mt-10">
          <a
            href="/cv.pdf" // Ganti dengan path CV kamu
            download
            className="group inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-accent text-black font-bold shadow-lg hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary transition-all"
          >
            {/* Icon Download */}
            <svg
              className="w-5 h-5 text-black transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"
              />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Bio;
