import React from 'react';
import { PortableText } from '@portabletext/react';
import Label from '@atoms/Label';
import Heading from '@atoms/Heading';
import Text from '@atoms/Text';
import Image from '@atoms/Image';
import './BehindTheBuild.css';

/**
 * BehindTheBuild component - Image left, Content right
 * @param {Object} props
 * @param {Object} props.data - Section data
 */
const BehindTheBuild = ({ data = {} }) => {
    if (!data) return null;

    const {
        label = 'MEET THE TEAM',
        title = 'BEHIND THE BUILD',
        description = '',
        image = ''
    } = data;

    return (
        <section className="behind-build section">
            <div className="container">
                <div className="behind-build__container">
                    {/* Left - Image */}
                    <div className="behind-build__image">
                        {image && <Image src={image} alt={title} />}
                    </div>

                    {/* Right - Content */}
                    <div className="behind-build__content">
                        <Label>{label}</Label>
                        <Heading level={2} variant="section" className="behind-build__title">
                            {title}
                        </Heading>
                        <div className="behind-build__description">
                            {Array.isArray(description) ? (
                                description.length > 0 && typeof description[0] === 'string' ? (
                                    description.map((para, index) => (
                                        <Text key={index} size="lg" color="dark">{para}</Text>
                                    ))
                                ) : (
                                    <div className="rich-text">
                                        <PortableText value={description} />
                                    </div>
                                )
                            ) : typeof description === 'object' && description !== null ? (
                                <div className="rich-text">
                                    <PortableText value={[description]} />
                                </div>
                            ) : (
                                <Text size="lg" color="dark">
                                    {description}
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BehindTheBuild;
