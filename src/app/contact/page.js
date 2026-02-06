export default function ContactPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Contact Us</h1>
      <p className="lead">Have questions or need support? Fill out the form below and our team will get back to you soon.</p>
      <form className="row g-3" style={{ maxWidth: 600 }}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Your Name" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="you@email.com" required />
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea className="form-control" id="message" rows="4" placeholder="How can we help you?" required></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Send Message</button>
        </div>
      </form>
    </div>
  );
}
