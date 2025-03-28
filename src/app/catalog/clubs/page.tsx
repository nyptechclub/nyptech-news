import Link from "next/link";

const clubs = [
  {
    name: "Technopreneurship Club",
    description: "Learn to be a technopreneur!",
    logo: "/clubs/nyptech.png",
    url: "https://nyptech.club",
  },
  {
    name: "Google Developer Student Club",
    description: "Be part of the innovation!",
    logo: "/placeholder.webp",
    url: "https://nyptech.club",
  },
  {
    name: "NYP Cloud",
    description: "Learning to power the world!",
    logo: "/placeholder.webp",
    url: "https://nyptech.club",
  },
  {
    name: "NYP Blockchain",
    description: "Join the us within the new web!",
    logo: "/placeholder.webp",
    url: "https://nyp-lit.github.io",
  },
  {
    name: "NYP LIT",
    description: "Join the ladies in tech!",
    logo: "/placeholder.webp",
    url: "https://nyp-lit.github.io",
  },
];

export default function Page() {
  return (
    <main className={"p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
      {clubs.map((club, index) => (
        <Link key={index} className={"card bg-base-300 hover:bg-base-200 transition"} href={"#"}>
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