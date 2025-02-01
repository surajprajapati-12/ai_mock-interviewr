export const MarqueImg = ({ img }: { img: string }) => {
    return (
      <img
        src={img}
        className="object-contain mx-12 w-44 h-44 xl:w-52 xl:h-52 grayscale xl:mx-16"
        alt=""
      />
    );
  };