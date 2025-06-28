import React, { useState } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
}

const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design & Development",
    description: "Custom websites that look great and perform even better. We build with modern tech and focus on user experience.",
    color: "#008CFF"
  },
  {
    id: "branding",
    title: "Branding & Identity",
    description: "Create a memorable brand that stands out. We help you develop your visual identity and brand guidelines.",
    color: "#FFCC00"
  },
  {
    id: "content",
    title: "Content Creation",
    description: "Engaging content that tells your story. From copywriting to video production, we've got you covered.",
    color: "#FF1493"
  },
  {
    id: "ai",
    title: "AI & Automation",
    description: "Leverage the power of AI to streamline your business. We implement smart solutions that save time and money.",
    color: "#00CC66"
  },
  {
    id: "social",
    title: "Social Media",
    description: "Build your presence on social media. We create and manage content that engages your audience.",
    color: "#9933FF"
  },
  {
    id: "growth",
    title: "Growth Strategy",
    description: "Scale your business with data-driven strategies. We help you identify and capture new opportunities.",
    color: "#FF6600"
  }
];

const ServiceCard: React.FC<{ service: Service; onLearnMore: () => void }> = ({ service, onLearnMore }) => {
  return (
    <div 
      className="win95-card"
      style={{
        border: '2px solid #c0c0c0',
        backgroundColor: '#ffffff',
        padding: '12px',
        margin: '8px',
        borderRadius: '0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <h3 
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000000',
            fontFamily: 'MS Sans Serif, Arial, sans-serif'
          }}
        >
          {service.title}
        </h3>
        <p 
          style={{
            fontSize: '11px',
            margin: '0 0 12px 0',
            color: '#000000',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            lineHeight: '1.3'
          }}
        >
          {service.description}
        </p>
      </div>
      <button
        onClick={onLearnMore}
        className="win95-button"
        style={{
          backgroundColor: service.color,
          color: '#ffffff',
          border: '2px solid #ffffff',
          padding: '4px 12px',
          fontSize: '11px',
          fontWeight: 'bold',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
          cursor: 'pointer',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
          alignSelf: 'flex-start'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000';
        }}
      >
        Learn More
      </button>
    </div>
  );
};

const ServicesWindow: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  return (
    <div style={{ 
      padding: '8px', 
      height: '100%', 
      backgroundColor: '#c0c0c0',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      overflow: 'auto'
    }}>
      <h2 style={{
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        color: '#000000',
        textAlign: 'center'
      }}>
        Our Services
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '8px',
        padding: '8px'
      }}>
        {services.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onLearnMore={() => handleLearnMore(service)}
          />
        ))}
      </div>

      {/* Service Details Popup */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#c0c0c0',
          border: '2px solid #ffffff',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 2px 2px 0px #000000',
          padding: '16px',
          minWidth: '300px',
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            borderBottom: '1px solid #808080',
            paddingBottom: '8px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'bold',
              margin: 0,
              color: '#000000'
            }}>
              {selectedService.title}
            </h3>
            <button
              onClick={closeServiceDetails}
              className="win95-button"
              style={{
                backgroundColor: '#c0c0c0',
                border: '2px solid #ffffff',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
              }}
            >
              ✕
            </button>
          </div>
          <p style={{
            fontSize: '12px',
            margin: '0 0 16px 0',
            color: '#000000',
            lineHeight: '1.4'
          }}>
            {selectedService.description}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px'
          }}>
            <button
              onClick={closeServiceDetails}
              className="win95-button"
              style={{
                backgroundColor: '#c0c0c0',
                border: '2px solid #ffffff',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesWindow;