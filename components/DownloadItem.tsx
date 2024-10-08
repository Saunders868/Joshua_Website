import Link from "next/link";

const DownloadItem = ({ item }: { item: string }) => {
  // const itemLink = `/profile/downloads/${item
  //   .replace(/\s+/g, "-")
  //   .toLowerCase()}`;
  const itemLink = "/api/downloads";
  return (
    <>
      <li className="download__item">
        <a download href={itemLink}>
          {item}
        </a>
      </li>
      <div className="line" />
    </>
  );
};

export default DownloadItem;
