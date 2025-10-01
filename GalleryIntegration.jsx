import React from 'react';
import ImageGallery from './ImageGallery';

// Integration component that matches your existing website styling
const GalleryIntegration = () => {
  // Your existing 8 photos
  const existingPhotos = [
    'https://i.imgur.com/ipft6ZJ.jpg',
    'https://i.imgur.com/TkAn1cL.jpg',
    'https://i.imgur.com/Zc1fHlC.jpg',
    'https://i.imgur.com/AUVtMhG.jpg',
    'https://i.imgur.com/y1p5DUA.jpg',
    'https://i.imgur.com/Nkgtbyg.jpg',
    'https://i.imgur.com/knoJbh9.jpg',
    'https://i.imgur.com/hqXGLbS.jpg'
  ];

  // TODO: Replace with your 30 new photo URLs
  const newPhotos = [
    // Add your 30 new photo URLs here
    // Example format:
    // 'https://i.imgur.com/your-photo1.jpg',
    // 'https://i.imgur.com/your-photo2.jpg',
    // ... continue for all 30 photos
  ];

  // Combine all photos
  const allPhotos = [...existingPhotos, ...newPhotos];

  return (
    <section id="gallery" className="card parallax-medium" style={{position:'relative', zIndex:1}}>
      <h3 style={{marginTop:0, fontFamily:'Quicksand, Raleway, sans-serif', fontWeight:600}}>Gallery</h3>
      <p className="sub" style={{color:'var(--muted)', marginBottom:'20px'}}>
        Explore our portfolio of beautiful hair transformations and styling work.
      </p>
      
      <div className="gallery-container" style={{marginTop:'16px'}}>
        <ImageGallery photos={allPhotos} />
      </div>
    </section>
  );
};

export default GalleryIntegration;




