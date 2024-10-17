const VideoList = ({ videos }) => {
    return (
      <div className="video-list">
        <h2>Playlist Videos</h2>
        <ul>
          {videos.map((video) => (
            <li key={video.id} className="video-item">
              <img src={video.thumbnail} alt={video.title} />
              <span>{video.title}</span>
            </li>
          ))}
        </ul>
        <style jsx>{`
          .video-list {
            overflow-y: auto;
            max-height: 80vh;
            padding: 20px;
            border-right: 1px solid #ddd;
          }
          ul {
            list-style: none;
            padding: 0;
          }
          .video-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
          }
          .video-item img {
            width: 80px;
            height: 45px;
            margin-right: 10px;
          }
        `}</style>
      </div>
    );
  };
  
  export default VideoList;
  