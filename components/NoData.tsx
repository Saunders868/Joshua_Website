const NoData = ({ text }: { text: string }) => {
  return (
    <div className="no-data">
      <p>No {text} has be created yet...</p>
    </div>
  );
};

export default NoData;
