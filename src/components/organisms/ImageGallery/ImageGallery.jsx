import React from 'react';
import Image from '@atoms/Image';
import './ImageGallery.css';

/**
 * ImageGallery component - A simple 3-image gallery
 * @param {Object} props
 * @param {string[]} props.images - Array of image URLs
 */
const ImageGallery = ({ images = [] }) => {
    if (!images || images.length === 0) return null;

    // Take the first 3 images as requested
    const galleryImages = images.slice(0, 3);

    return (
        <section className="image-gallery">
            <div className="image-gallery__grid">
                {galleryImages.map((src, index) => (
                    <div key={index} className="image-gallery__item">
                        <Image src={src} alt={`Gallery image ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ImageGallery;
