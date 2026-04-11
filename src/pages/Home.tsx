import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-section home-page">
      <section className="hero-card">
        <div>
          <span className="eyebrow">Welcome to Dwud Interiors</span>
          <h2 className="home-title shimmer-text">
            <span>Designing Spaces.</span>
            <span>Defining Lifestyles.</span>
          </h2>
          <div className="service-tags shimmer-text">
            <span>INTERIOR WORKS</span>
            <span className="divider">|</span>
            <span>RENOVATION</span>
            <span className="divider">|</span>
            <span>WORK PERMIT</span>
          </div>
        </div>
      </section>
    </div>
  );
}
