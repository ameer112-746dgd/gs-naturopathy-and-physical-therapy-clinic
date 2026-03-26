const ServiceCard = ({ service, onBook }) => (
  <div className="card">
    <h3>{service.name}</h3>
    <p>{service.description}</p>
    <button className="btn btn-primary" onClick={() => onBook(service.name)}>Book Now</button>
  </div>
);
export default ServiceCard;