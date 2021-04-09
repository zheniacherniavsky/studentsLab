import loadingImage from "@/assets/images/loading.svg";

const Loading = ({ hook, className: style }: { hook: boolean; className: string }) => {
  if (hook) {
    return (
      <>
        {style ? (
          <div className={style}>
            <img src={loadingImage} alt="loading" />
          </div>
        ) : (
          <img src={loadingImage} alt="loading" />
        )}
      </>
    );
  }
  return null;
};

export default Loading;
