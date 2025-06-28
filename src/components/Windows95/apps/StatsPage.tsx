import React, { useEffect, useState } from 'react';
import { getSessionDurationFormatted, getClickCount } from '../../../utils/analytics';

interface StatsPageProps {
  onContinue: () => void;
}

// All statistics to display at once
const STATS_DATA = [
  {
    title: 'Session Duration',
    value: '2-3 minutes',
    description: 'Optimal engagement time',
    color: '#008CFF',
    icon: '⏱️'
  },
  {
    title: 'Engagement Rate',
    value: '60%+',
    description: 'High performance threshold',
    color: '#00CC66',
    icon: '📈'
  },
  {
    title: 'Conversion Boost',
    value: '50%',
    description: 'With high engagement',
    color: '#FFCC00',
    icon: '💰'
  },
  {
    title: 'Bounce Rate',
    value: '< 40%',
    description: 'Target for success',
    color: '#FF6600',
    icon: '🎯'
  },
  {
    title: 'Click Through Rate',
    value: '2.5%',
    description: 'Industry average',
    color: '#9933FF',
    icon: '🖱️'
  },
  {
    title: 'Customer Satisfaction',
    value: '95%',
    description: 'With engaged users',
    color: '#FF1493',
    icon: '😊'
  }
];

const StatsPage: React.FC<StatsPageProps> = ({ onContinue }) => {
  const [duration, setDuration] = useState<string>(getSessionDurationFormatted());
  const [clicks, setClicks] = useState<number>(getClickCount());
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Update session duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getSessionDurationFormatted());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll click count every 500ms
  useEffect(() => {
    const poll = setInterval(() => setClicks(getClickCount()), 500);
    return () => clearInterval(poll);
  }, []);

  const handleContinue = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Simulate loading progress over 3 seconds
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Redirect to modern site
          window.location.href = '/modern';
          return 100;
        }
        return prev + 3.33; // 100% over 3 seconds
      });
    }, 100);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#c0c0c0',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      padding: '16px',
      overflow: 'auto'
    }}>
      <h1 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
        color: '#000000',
        textAlign: 'center',
        borderBottom: '2px solid #808080',
        paddingBottom: '12px'
      }}>
        Website Performance Statistics
      </h1>

      {/* Live Stats Section */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #c0c0c0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0 0 12px 0',
          color: '#000000'
        }}>
          Your Current Session
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{
            backgroundColor: '#e6f7e6',
            border: '2px solid #b2e6b2',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#008CFF',
              marginBottom: '4px'
            }}>
              {duration}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000000'
            }}>
              Session Time
            </div>
          </div>
          <div style={{
            backgroundColor: '#fffbe6',
            border: '2px solid #ffe6b2',
            padding: '12px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#FF6600',
              marginBottom: '4px'
            }}>
              {clicks}
            </div>
            <div style={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#000000'
            }}>
              Total Clicks
            </div>
          </div>
        </div>
      </div>

      {/* Industry Statistics List */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #c0c0c0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        padding: '16px',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0 0 12px 0',
          color: '#000000'
        }}>
          Industry Performance Metrics
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {STATS_DATA.map((stat, index) => (
            <div 
              key={index}
              style={{
                border: '2px solid #c0c0c0',
                backgroundColor: '#ffffff',
                padding: '12px',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{
                fontSize: '24px',
                marginRight: '12px'
              }}>
                {stat.icon}
              </div>
              <div style={{
                flex: 1
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: stat.color,
                  marginBottom: '2px'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#000000',
                  marginBottom: '2px'
                }}>
                  {stat.title}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#666666'
                }}>
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button Section */}
      <div style={{
        textAlign: 'center',
        padding: '16px'
      }}>
        {!isLoading ? (
          <button
            onClick={handleContinue}
            className="win95-button"
            style={{
              backgroundColor: '#008CFF',
              color: '#ffffff',
              border: '2px solid #ffffff',
              padding: '12px 32px',
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'MS Sans Serif, Arial, sans-serif',
              cursor: 'pointer',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
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
            Continue to Modern Site
          </button>
        ) : (
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #c0c0c0',
            boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#000000',
              marginBottom: '12px',
              textAlign: 'center'
            }}>
              Loading Modern Site...
            </div>
            <div style={{
              backgroundColor: '#c0c0c0',
              border: '2px solid #808080',
              height: '20px',
              position: 'relative',
              marginBottom: '8px'
            }}>
              <div style={{
                backgroundColor: '#008CFF',
                height: '100%',
                width: `${loadingProgress}%`,
                transition: 'width 0.1s ease-in-out'
              }} />
            </div>
            <div style={{
              fontSize: '11px',
              color: '#666666',
              textAlign: 'center'
            }}>
              {Math.round(loadingProgress)}% Complete
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '2px solid #c0c0c0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        padding: '12px',
        marginTop: '16px'
      }}>
        <p style={{
          fontSize: '11px',
          color: '#000000',
          margin: 0,
          textAlign: 'center',
          lineHeight: '1.3'
        }}>
          <strong>Engagement = Conversions:</strong> Higher engagement rates lead to increased conversion rates and business growth. 
          Your current session metrics are being tracked to optimize performance.
        </p>
      </div>
    </div>
  );
};

export default StatsPage;