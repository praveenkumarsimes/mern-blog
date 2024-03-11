import React from 'react';
import MahatmaGandhiImage from '../../images/mahatmaGandhiImage.png';

export default function Mision() {
  const pageStyle = {
    border: '2px solid #007bff', // Border color
    borderRadius: '10px', // Border radius for rounded corners
    margin: '50px auto', // Center the content
    maxWidth: '800px', // Set a maximum width for the content
    padding: '20px', // Add padding for better aesthetics
  };

  const titleStyle = {
    color: '#007bff',
    fontSize: '2.2em',
    marginBottom: '20px',
  };

  const contentStyle = {
    marginBottom: '20px',
    lineHeight: '1.6',
  };

  const sectionTitleStyle = {
    color: '#28a745',
    fontSize: '2.2em',
    marginBottom: '15px',
  };

  const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const gandhiImageStyle = {
    width: '200px', // Adjust the size as needed
    height: 'auto',
  };

  const quotesStyle = {
    width: '60%', // Adjust the width as needed
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>
        Thai Meera Trust: Illuminating Lives Through Compassion and Care
      </h1>

      <p style={contentStyle}>
        In the heart of benevolence and empathy lies the Thai Meera Trust, a beacon of hope and support
        for those in need. Established with a noble vision, this charitable trust has been actively
        engaged in a myriad of social activities, uplifting the lives of individuals and communities
        across various spheres. From providing affordable food supplies to supporting children's
        education and empowering underprivileged women, the Thai Meera Trust has become a catalyst for
        positive change.
      </p>

      <h2 style={sectionTitleStyle}>Mission and Vision: A Pledge to Make a Difference</h2>

      <p style={contentStyle}>
        At the core of Thai Meera Trust's mission is the unwavering commitment to making a tangible
        impact on society. The trust envisions a world where every individual, regardless of their
        socio-economic background, has access to basic necessities, education, and opportunities for
        economic empowerment. Through its multifaceted initiatives, the trust aims to create a ripple
        effect of positivity that transforms communities and fosters sustainable development.
      </p>

      <div style={imageContainerStyle}>
        <img src={MahatmaGandhiImage} alt="Mahatma Gandhi" style={gandhiImageStyle} />
        <div style={quotesStyle}>
          {/* Insert your Mahatma Gandhi quotes here */}
          <p>Be the change that you wish to see in the world.</p>
          <p>The best way to find yourself is to lose yourself in the service of others.</p>
          {/* Add more quotes as needed */}
        </div>
      </div>

      <h2 style={sectionTitleStyle}>Affordable Food Supply: Nourishing Bodies and Souls</h2>

      <p style={contentStyle}>
        One of the flagship programs of the Thai Meera Trust is its initiative to provide affordable
        and nutritious food supplies to those struggling with financial constraints. By partnering
        with local suppliers and leveraging community networks, the trust ensures that quality food
        reaches those who need it the most. This not only addresses immediate hunger concerns but also
        promotes the overall well-being of individuals and families.
      </p>

      {/* Repeat the pattern for other sections... */}

      <h2 style={sectionTitleStyle}>How You Can Support: Joining Hands for a Better Tomorrow</h2>

      <p style={contentStyle}>
        As a charitable trust, Thai Meera welcomes support from individuals, businesses, and
        organizations who share a common vision for a better world. Whether through donations,
        volunteerism, or collaboration, everyone has a role to play in contributing to the trust's
        impactful initiatives.
      </p>
    </div>
  );
}
