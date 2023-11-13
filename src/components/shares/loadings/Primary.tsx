import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-clr-background-base-one">
        <ReactLoading
          type="spin"
          color="#f9f9f9f9"
          height={100}
          width={100}
        />
      </div>
    </>
  );
};

export default Loading;
