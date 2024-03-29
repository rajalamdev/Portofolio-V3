import Image from "next/image";
import DynamicSvgIcon from "../../svg/DynamicSvgIcon";
import BioCode from "./BioCode.mdx"
import Me from "../../../../public/me.jpeg"

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
      </div>
    </div>
  );
};

export default Bio;
