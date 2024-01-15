interface PageWrapperProps {
  children: JSX.Element;
}

const PageWrapper = (props: PageWrapperProps): JSX.Element => {
  return (
    <>
      <div className="flex bg-black">
        <div className="flex-col w-3/12 space-y-6 pt-3 px-4 border-r h-dvh fixed">
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
        <div className="w-4/12 text-white border-l">right</div>
      </div>
    </>
  );
};

export default PageWrapper;
