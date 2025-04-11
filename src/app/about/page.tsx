import ArticleRenderer from "@/components/article-renderer";
import { aboutPageId } from "@/lib/constants";
import { getArticleContent } from "@/lib/database";

export default async function Page() {
  const content = await getArticleContent(aboutPageId);

  return (
    <main>
      <div className={"grid lg:grid-cols-[800px_1fr] gap-2"}>
        {/* Left Column */}
        <div>
          {/* Article */}
          <div className={"mockup-window bg-base-300 pb-8"}>
            <ArticleRenderer content={content!} />
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Team */}
          <div className={"lg:sticky lg:top-4 mockup-window bg-base-300 pb-8"}>
            <div className={"p-4 px-8"}>
              <h2 className={"font-bold text-4xl"}>Meet the Team</h2>
              <div className={"mt-6 grid grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-1 gap-8"}>
                {/* Keshu */}
                <div className={"flex items-center gap-4"}>
                  <div className={"avatar"}>
                    <div className={"size-18 rounded-full"}>
                      <img src={"/avatars/keshu.jpg"} alt={"avatar"} />
                    </div>
                  </div>
                  <div>
                    <h3 className={"font-medium text-xl"}>Keshuram</h3>
                    <p className={"text-current/80"}>Initiative Co-Lead</p>
                    <p className={"text-current/50 text-xs"}>President @ NYP Technopreneurship Club</p>
                  </div>
                </div>

                {/* Iqbal */}
                <div className={"flex items-center gap-4"}>
                  <div className={"avatar"}>
                    <div className={"size-18 rounded-full"}>
                      <img src={"/avatars/iqbal.jpg"} alt={"avatar"} />
                    </div>
                  </div>
                  <div>
                    <h3 className={"font-medium text-xl"}>Iqbal</h3>
                    <p className={"text-current/80"}>Initiative Co-Lead</p>
                    <p className={"text-current/50 text-xs"}>Vice-President @ NYP Technopreneurship Club</p>
                  </div>
                </div>

                {/* Dennise */}
                <div className={"flex items-center gap-4"}>
                  <div className={"avatar"}>
                    <div className={"size-18 rounded-full"}>
                      <img src={"/avatars/dennise.jpg"} alt={"avatar"} />
                    </div>
                  </div>
                  <div>
                    <h3 className={"font-medium text-xl"}>Dennise Catolos</h3>
                    <p className={"text-current/80"}>Web Developer</p>
                    <p className={"text-current/50 text-xs"}>Operations Director @ NYP Technopreneurship Club</p>
                  </div>
                </div>

                {/* Nathan */}
                <div className={"flex items-center gap-4"}>
                  <div className={"avatar"}>
                    <div className={"size-18 rounded-full"}>
                      <img src={"/avatars/nathan.jpg"} alt={"avatar"} />
                    </div>
                  </div>
                  <div>
                    <h3 className={"font-medium text-xl"}>Nathan Heng</h3>
                    <p className={"text-current/80"}>Web Designer</p>
                    <p className={"text-current/50 text-xs"}>Operations Secretary @ NYP Technopreneurship Club</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}