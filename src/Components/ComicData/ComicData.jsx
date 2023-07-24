import "./comicdata.css";

const ComicData = ({ comicData }) => {
  if (!comicData) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const { title, dates, creators, description, thumbnail } = comicData;

  const writer = creators.items.find((item) => item.role === "writer")?.name;
  const penciler = creators.items.find(
    (item) => item.role === "penciler"
  )?.name;
  const coverArtist = creators.items.find(
    (item) => item.role === "cover artist"
  )?.name;

  return (
    <div className="comic-data-container">
      <div className="comic-image-container">
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={title}
          className="comic-image"
        />
      </div>
      <div className="comic-info-container">
        <h2 className="comic-title">{title}</h2>
        <p>
          <strong>Published:</strong>{" "}
          {formatDate(dates.find((date) => date.type === "onsaleDate")?.date)}
        </p>
        <p>
          <strong>Writer:</strong> {writer}
        </p>
        <p>
          <strong>Penciler:</strong> {penciler}
        </p>
        <p>
          <strong>Cover Artist:</strong> {coverArtist}
        </p>
        <p className="comic-description">{description}</p>
      </div>
    </div>
  );
};

export default ComicData;

// const ComicData = ({ comicData }) => {
//   if (!comicData) {
//     return null;
//   }

//   const { title, thumbnail, description, dates } = comicData;

//   return (
//     <div className="comic-data">
//       <img
//         src={`${thumbnail.path}.${thumbnail.extension}`}
//         alt={title}
//         className="comic-image"
//       />
//       <h2>{title}</h2>
//       {description && <p>{description}</p>}
//       <div className="comic-dates">
//         {dates.map((date) => (
//           <div key={date.type}>
//             <p>{date.type}</p>
//             <p>{new Date(date.date).toDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ComicData;
