const DownloadItem = ({ item }: { item: string }) => {
  const itemLink = "/api/downloads";
  return (
    <>
      <li className="download__item">
        <a download href={itemLink}>
          {item} - Download{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11.5V20m0 0l3-3m-3 3l-3-3M8 7.036a3.5 3.5 0 0 1 1.975.99M17.5 14c1.519 0 2.5-1.231 2.5-2.75a2.75 2.75 0 0 0-2.016-2.65A5 5 0 0 0 8.37 7.108a3.5 3.5 0 0 0-1.87 6.746"
            />
          </svg>
        </a>
      </li>
      <div className="line" />
    </>
  );
};

export default DownloadItem;
