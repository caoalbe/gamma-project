interface PageWrapperProps {
  children: JSX.Element;
}

const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  return (
    <>
      <div className="flex bg-black">
        <div className="flex-col w-3/12 space-y-6 pt-3 px-4 border-r border-neutral-700 h-dvh fixed">
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Home</span>
          </div>
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Button 2</span>
          </div>
          <div className="w-5/12 ml-auto">
            <span className="text-white text-2xl">Other</span>
          </div>
        </div>
        {/* TODO: replace same width hack to workaorund fixed position  */}
        <div
          id="spacing-hack"
          className="flex-col w-3/12 space-y-6 pt-3 px-4 border-r h-dvh"
        />

        <div className="w-5/12 text-white">{props.children}</div>

        <div className="w-4/12 text-white border-l border-neutral-700 flex-col space-y-4 pl-10 pt-4">
          <div className="w-8/12 bg-zinc-900 rounded-full py-2 pl-4">
            <span className="text-md text-neutral-500">Fake Search Bar</span>
          </div>
          <div className="w-8/12 bg-zinc-900 rounded-xl pl-4 pt-3 pb-3 flex-col space-y-4">
            <div>
              <span className="text-xl font-bold">What's happening</span>
            </div>
            {/* cards */}
            {/* TODO: implement hover css */}
            <div className="flex">
              <div id="text" className="w-9/12">
                <span className="text-neutral-500 text-sm">
                  Sports · Trending
                </span>
                <br />
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
            <div className="flex">
              <div id="text" className="w-9/12">
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
            <div className="flex">
              <div id="text" className="w-9/12">
                <span className="font-bold">Clippers at Timberwolves</span>
                <br />
                <span className="text-neutral-500 text-sm">
                  NBA · 4 hours ago
                </span>
              </div>
              <div id="img" className="w-3/12">
                picture of ANT <br />
                dddd
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWrapper;
