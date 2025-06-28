import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center h-[35vh] px-4 text-center">
        <div className="font-bold text-5xl flex justify-center items-center gap-3">
          Buy me a chai{" "}
          <Image
            src="/Hot Beverage.gif"
            alt="chai gif"
            width={70}
            height={70}
            unoptimized
          />
        </div>
        <p className="text-center text-gray-700">
          A crowdfunding platform for creators. Get funded by your fans and followers. Start Now!
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
          >
            Start Here
          </button>
          <button
            type="button"
            className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
          >
            Read Here
          </button>
        </div>
      </div>

      <div className="bg-black h-[1px] opacity-10 my-16 w-full" />

      <div className="px-6 md:px-10 text-center">
        <h1 className="text-2xl font-bold mb-16">Your Fans Can Buy You a Chai</h1>
        <div className="flex justify-around items-center flex-wrap gap-6">
          {[1, 2, 3].map((_, index) => {
            const src =
              index === 0
                ? "/Man repairing motherboard.gif"
                : index === 1
                ? "/coin.gif"
                : "/Business Team.gif";

            return (
              <div key={index} className="flex flex-col items-center gap-2 w-[150px]">
                <div className="bg-slate-700 hover:bg-slate-800 p-4 rounded-full shadow-md transition duration-300">
                  <Image
                    src={src}
                    alt="feature gif"
                    width={90}
                    height={90}
                    className="mx-auto"
                  />
                </div>
                <p className="font-bold text-gray-800 text-sm">Fund Yourself</p>
                <p className="text-gray-600 text-xs font-extrabold text-center">
                  Your fans are available for you to help you
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-black h-[1px] opacity-10 my-16 w-full" />

      <div className="flex flex-col items-center mb-16 px-4 text-center">
        <p className="text-2xl font-bold mb-8">Learn More About Us</p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/unTus4ukPB0?si=tVtoBe9AKAXe9iWk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg shadow-lg w-full max-w-2xl"
        ></iframe>
      </div>

      <div className="bg-black h-[1px] opacity-10 my-16 w-full" />
    </>
  );
}
