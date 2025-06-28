import React, { useState, useEffect } from 'react';

const Voicebot: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startListening = () => {
    setIsListening(true);
    setError(null);
    setCountdown(3);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          simulateVoiceRecognition();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const simulateVoiceRecognition = () => {
    // Simulate voice recognition with random phrases
    const possiblePhrases = [
      "How can AI help improve my business?",
      "What services does Flash Forward offer?",
      "Tell me about your web design process.",
      "How much does a website cost?",
      "Can you help with social media marketing?"
    ];
    
    const randomPhrase = possiblePhrases[Math.floor(Math.random() * possiblePhrases.length)];
    
    setTimeout(() => {
      setIsListening(false);
      setTranscript(randomPhrase);
      
      // Simulate response
      setTimeout(() => {
        if (randomPhrase.includes("business")) {
          setResponse('AI can help your business by automating repetitive tasks, providing data-driven insights, enhancing customer experiences through chatbots, optimizing operations, and creating personalized marketing campaigns.');
        } else if (randomPhrase.includes("services")) {
          setResponse('Flash Forward offers web design and development, branding and identity, content creation, AI integration, social media management, and growth strategy services.');
        } else if (randomPhrase.includes("web design")) {
          setResponse('Our web design process involves discovery, planning, design, development, testing, and launch phases. We focus on creating responsive, user-friendly websites that convert visitors into customers.');
        } else if (randomPhrase.includes("cost")) {
          setResponse('Website costs vary based on your specific needs. Our basic package starts at $999, while more complex sites with e-commerce or custom functionality range from $2,499 to $4,999.');
        } else if (randomPhrase.includes("social media")) {
          setResponse('Yes, we offer comprehensive social media marketing services including strategy development, content creation, community management, paid advertising, and performance analytics.');
        }
      }, 1500);
    }, 2000);
  };

  const handleOpenElevenLabs = () => {
    window.open('https://elevenlabs.io/app/talk-to?agent_id=agent_01jx7mn98qeptva88351xa9rty', '_blank');
  };

  return (
    <div style={{ 
      padding: '20px', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#c0c0c0',
      overflow: 'auto'
    }}>
      <div style={{ 
        backgroundColor: '#000080',
        padding: '5px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <img 
          src="/callagent.png" 
          alt="Voice Agent" 
          style={{ width: '24px', height: '24px', marginRight: '10px' }} 
        />
        <h2 style={{ fontSize: '16px', margin: 0 }}>90s Voice Assistant</h2>
      </div>
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div 
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: isListening ? '#ff0000' : '#808080',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
        >
          <img 
            src="/callagent.png" 
            alt="Microphone" 
            style={{ 
              width: '60px', 
              height: '60px',
              filter: isListening ? 'brightness(1.2)' : 'brightness(0.8)'
            }} 
          />
          
          {countdown !== null && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 2px black'
            }}>
              {countdown}
            </div>
          )}
        </div>
        
        <button 
          className="win95-button"
          style={{ padding: '10px 20px', fontSize: '14px' }}
          onClick={startListening}
          disabled={isListening}
        >
          {isListening ? 'Listening...' : 'Start Speaking'}
        </button>
        
        <div style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <p style={{ fontSize: '14px', marginBottom: '15px' }}>
            Want to use the full ElevenLabs voice assistant?
          </p>
          <button 
            className="win95-button"
            style={{ padding: '10px 20px', fontSize: '14px' }}
            onClick={handleOpenElevenLabs}
          >
            Open ElevenLabs Voice Agent
          </button>
        </div>
        
        {transcript && (
          <div style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'white',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            marginTop: '20px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '5px' }}>You said:</h3>
            <p style={{ margin: 0, fontFamily: 'monospace' }}>{transcript}</p>
          </div>
        )}
        
        {response && (
          <div style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#e0f0ff',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            marginTop: '10px'
          }}>
            <h3 style={{ fontSize: '14px', marginBottom: '5px' }}>Response:</h3>
            <p style={{ margin: 0, fontFamily: 'monospace' }}>{response}</p>
          </div>
        )}
        
        {error && (
          <div style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#ffeeee',
            border: '1px solid red',
            marginTop: '10px',
            color: 'red'
          }}>
            {error}
          </div>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#555' }}>
        <p>Due to security restrictions, the ElevenLabs voice agent cannot be embedded directly.</p>
        <p>Click the button above to open it in a new window.</p>
      </div>
    </div>
  );
};

export default Voicebot;