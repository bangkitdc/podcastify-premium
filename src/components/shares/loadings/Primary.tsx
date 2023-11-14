import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 w-full h-full flex items-center justify-center bg-clr-background-base-one">
        <ReactLoading type="spin" color="#f9f9f9f9" height={100} width={100} />
      </div>
    </>
  );
};

export default Loading;
