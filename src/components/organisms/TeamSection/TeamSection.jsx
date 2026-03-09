import React from 'react';
import './TeamSection.css';

/**
 * TeamSection Component
 * Displays a grid of team members with images, names, roles, and bios.
 */
const TeamSection = ({ data }) => {
    if (!data || !data.members) return null;

    return (
        <section className="team-section">
            <div className="container">
                <div className="team-section__header">
                    {data.label && <span className="team-section__label">{data.label}</span>}
                    {data.title && <h2 className="team-section__title">{data.title}</h2>}
                    {data.description && <p className="team-section__description">{data.description}</p>}
                </div>

                <div className="team-section__grid">
                    {data.members.map((member, index) => (
                        <div key={index} className="team-card">
                            <div className="team-card__image-container">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="team-card__image"
                                    loading="lazy"
                                />
                            </div>
                            <div className="team-card__content">
                                <h3 className="team-card__name">{member.name}</h3>
                                <span className="team-card__role">{member.role}</span>
                                <p className="team-card__bio">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
