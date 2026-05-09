import { PROCESS_STEPS, OFFERS, TESTIMONIALS, SHOWROOMS, PROJECTS } from '../data/constants';

export default function Home() {
  return (
    <div className="page-section home-page">
      {/* Hero Section */}
      <section className="hero-card home-hero">
        <div className="hero-copy">
          <span className="eyebrow">Interior Designers in Kochi</span>
          <h1 className="hero-title">DWUD INTERIORS</h1>
          <p className="hero-subtitle">Home Interiors in Kochi</p>
          <div className="hero-actions">
            <button className="cta-button">Free Estimate</button>
            <a href="tel:+917012444932" className="cta-button-secondary">Call Now</a>
          </div>
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Our Process</span>
          <h2>Interior Design & Execution Process</h2>
        </div>
        <div className="process-grid">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="process-item">
              <div className="process-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section with Images */}
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Special Offers</span>
          <h2>Choose Your Perfect Package</h2>
          <p className="offer-discount">Avail 30% Discount on Retail Price</p>
        </div>
        <div className="offers-grid">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image-container">
                <img src={offer.image} alt={offer.name} className="offer-image" />
              </div>
              <h3>{offer.name}</h3>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-pricing">
                <span className="original-price">{offer.price}</span>
                <span className="discounted-price">{offer.discountedPrice}</span>
              </div>
              <button className="cta-button-secondary">Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery/Projects Section */}
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Our Work</span>
          <h2>Completed Projects</h2>
        </div>
        <div className="gallery-grid">
          {PROJECTS.map((project) => (
            <div key={project.id} className="gallery-item">
              <div className="gallery-image-container">
                <img src={project.image} alt={project.title} className="gallery-image" />
                <div className="gallery-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section with Image */}
      <section className="content-card about-section">
        <div className="about-content">
          <div className="about-text">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Creating Exceptional Experiences Through Home Interiors</h2>
            <p>
              As seasoned interior designers, we have completed an extensive library of contemporary designs with truly opulent interior decoration. Our team works with clients from concept to installation, providing comprehensive design services.
            </p>
            <ul className="features-list">
              <li>✓ Expert Design Team</li>
              <li>✓ Quality Craftsmanship</li>
              <li>✓ Timely Execution</li>
              <li>✓ 24/7 Support</li>
            </ul>
            <button className="cta-button">Start Your Project</button>
          </div>
          <div className="about-image">
            <img src="https://via.placeholder.com/500x400/2596BE/FFFFFF?text=Why+Choose+Us" alt="Our Team" className="section-image" />
          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Visit Us</span>
          <h2>Our Showrooms</h2>
        </div>
        <div className="showrooms-grid">
          {SHOWROOMS.map((showroom, index) => (
            <div key={index} className="showroom-item">
              <div className="showroom-image-placeholder">
                <img src={`https://via.placeholder.com/300x250/2596BE/FFFFFF?text=${showroom.city}`} alt={showroom.city} />
              </div>
              <h3>{showroom.city}</h3>
              <p className="showroom-address">{showroom.address}</p>
              <a href={`tel:${showroom.phone}`} className="showroom-phone">
                📞 {showroom.phone}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section with Avatars */}
      <section className="content-card">
        <div className="section-header">
          <span className="eyebrow">Success Stories</span>
          <h2>Client Testimonials</h2>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">— {testimonial.name}</p>
              <p className="testimonial-project">{testimonial.project}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section with Background Image */}
      <section className="content-card stats-section">
        <div className="section-header">
          <h2>By The Numbers</h2>
        </div>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">14000+</div>
            <p>Satisfied Customers</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <p>Quality Guaranteed</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="content-card cta-section">
        <div className="section-header">
          <h2>Ready to Transform Your Space?</h2>
          <p>Let's create something beautiful together</p>
        </div>
        <button className="cta-button">Get a Free Estimate</button>
      </section>
    </div>
  );
}
