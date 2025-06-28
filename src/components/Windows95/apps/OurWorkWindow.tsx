import React, { useState } from 'react';

interface Work {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  color: string;
}

const workItems: Work[] = [
  { 
    id: 'websites', 
    title: 'Websites', 
    imageUrl: '/WEBSITES.png',
    description: 'Custom websites built with modern technology and optimized for performance. From simple landing pages to complex e-commerce solutions.',
    color: '#008CFF'
  },
  { 
    id: 'videos', 
    title: 'Videos', 
    imageUrl: '/VIDEOS.png',
    description: 'Professional video production services including promotional videos, product demos, and brand storytelling content.',
    color: '#FF1493'
  },
  { 
    id: 'branding', 
    title: 'Branding', 
    imageUrl: '/BRANDING.png',
    description: 'Complete branding solutions including logo design, brand guidelines, and visual identity development.',
    color: '#FFCC00'
  },
  { 
    id: 'design', 
    title: 'Design', 
    imageUrl: '/DESIGN.png',
    description: 'Creative design services for print and digital media including graphics, layouts, and visual assets.',
    color: '#00CC66'
  },
  { 
    id: 'ai', 
    title: 'AI', 
    imageUrl: '/AI.png',
    description: 'AI-powered solutions including chatbots, automation tools, and intelligent business systems.',
    color: '#9933FF'
  },
  { 
    id: 'growth', 
    title: 'Growth', 
    imageUrl: '/GROWTH.png',
    description: 'Data-driven growth strategies and marketing campaigns designed to scale your business.',
    color: '#FF6600'
  }
];

const WorkCard: React.FC<{ work: Work; onClick: () => void }> = ({ work, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onClick={onClick}
      style={{
        border: '2px solid #c0c0c0',
        backgroundColor: '#ffffff',
        padding: '12px',
        margin: '8px',
        borderRadius: '0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <img 
          src={work.imageUrl}
          alt={work.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      ) : (
        <h3 
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            margin: 0,
            color: work.color,
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            textAlign: 'center',
            zIndex: 2,
            position: 'relative'
          }}
        >
          {work.title}
        </h3>
      )}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          padding: '8px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
          zIndex: 3
        }}
      >
        <p style={{
          fontSize: '10px',
          color: '#ffffff',
          margin: 0,
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
          textAlign: 'center'
        }}>
          Click to view details
        </p>
      </div>
    </div>
  );
};

const OurWorkWindow: React.FC = () => {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work);
  };

  const closeWorkDetails = () => {
    setSelectedWork(null);
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
        Our Work
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '8px',
        padding: '8px'
      }}>
        {workItems.map((work) => (
          <WorkCard 
            key={work.id} 
            work={work} 
            onClick={() => handleWorkClick(work)}
          />
        ))}
      </div>

      {/* Work Details Popup */}
      {selectedWork && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#c0c0c0',
          border: '2px solid #ffffff',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 2px 2px 0px #000000',
          padding: '20px',
          minWidth: '400px',
          maxWidth: '500px',
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderBottom: '1px solid #808080',
            paddingBottom: '12px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: 0,
              color: selectedWork.color
            }}>
              {selectedWork.title}
            </h3>
            <button
              onClick={closeWorkDetails}
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
          
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <img 
              src={selectedWork.imageUrl}
              alt={selectedWork.title}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                border: '2px solid #c0c0c0',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: '12px',
                margin: 0,
                color: '#000000',
                lineHeight: '1.4',
                fontFamily: 'MS Sans Serif, Arial, sans-serif'
              }}>
                {selectedWork.description}
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #c0c0c0',
            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
            padding: '12px',
            marginBottom: '16px'
          }}>
            <h4 style={{
              fontSize: '12px',
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              color: '#000000'
            }}>
              What We Deliver
            </h4>
            <ul style={{
              fontSize: '11px',
              margin: 0,
              paddingLeft: '16px',
              color: '#000000',
              fontFamily: 'MS Sans Serif, Arial, sans-serif'
            }}>
              <li>Professional quality work</li>
              <li>Fast turnaround times</li>
              <li>Ongoing support</li>
              <li>Custom solutions</li>
            </ul>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px'
          }}>
            <button
              onClick={closeWorkDetails}
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
            <button
              className="win95-button"
              style={{
                backgroundColor: selectedWork.color,
                color: '#ffffff',
                border: '2px solid #ffffff',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
              }}
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurWorkWindow;