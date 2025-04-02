import Link from "next/link";

const clubs = [
  {
    name: "NYP Technopreneurs",
    description: "Inspiring the next generation of technopreneurs.",
    logo: "/clubs/nyptech.png",
    url: "https://nyptech.club",
  },
  {
    name: "NYP Cloud",
    description: "Discover cloud and grow with us.",
    logo: "/clubs/nypcloud.png",
    url: "https://nypcloud.netlify.app",
  },
  {
    name: "NYP Blockchain",
    description: "Join the us within the new web!",
    logo: "/placeholder.webp",
    url: "#",
  },
  {
    name: "NYP LIT",
    description: "Empowering women of our generation.",
    logo: "/clubs/nyplit.jpg",
    url: "https://nyp-lit.github.io",
  },
  {
    name: "Google Developer Student Club",
    description: "Learn Together, Build Together.",
    logo: "/clubs/gdsc.jpg",
    url: "#",
  },
];

export default function Page() {
  return (
    <main className={"grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
      {clubs.map((club, index) => (
        <Link key={index} className={"card bg-base-300 hover:bg-base-200 transition"} target={"_blank"} href={club.url}>
          <figure>
            <img className={"aspect-square object-cover"} src={club.logo} />
          </figure>
          <div className={"card-body"}>
            <h2 className={"card-title"}>{club.name}</h2>
            <p className={"text-current/50"}>{club.description}</p>
          </div>
        </Link>
      ))}
    </main>
  );
}