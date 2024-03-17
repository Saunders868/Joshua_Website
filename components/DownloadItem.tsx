import Link from "next/link";

const DownloadItem = ({ item }: { item: string }) => {
  const itemLink = item.replace(/\s+/g, "-").toLowerCase();
  return (
    <>
      <li className="download__item">
        <Link href={itemLink}>{item}</Link>
      </li>
      <div className="line" />
    </>
  );
};

export default DownloadItem;
