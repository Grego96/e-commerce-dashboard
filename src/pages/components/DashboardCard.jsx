function DashboardCard({ text, quantity, svg }) {
  return (
    <>
      <div className="col-sm-6 col-xl-3">
        <div className="bg-main dashboard-card rounded d-flex align-items-center justify-content-between p-4">
          <img src={svg} alt="svg" />
          <div className="ms-3">
            <p className="mb-2">{text}</p>
            <h6 className="mb-0">${quantity}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardCard;
