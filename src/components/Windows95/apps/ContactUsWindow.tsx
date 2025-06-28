import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { posthog } from '../../../lib/posthog';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUsWindow: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Track form submission with PostHog
      posthog.capture('win95_contact_form_submitted', {
        name_provided: !!formData.name.trim(),
        email_provided: !!formData.email.trim(),
        message_length: formData.message.length
      });

      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString()
        }
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Track successful submission
      posthog.capture('win95_contact_form_success');
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
      
      // Track error
      posthog.capture('win95_contact_form_error', {
        error: err instanceof Error ? err.message : 'Unknown error'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ 
      padding: '16px', 
      height: '100%', 
      backgroundColor: '#c0c0c0',
      fontFamily: 'MS Sans Serif, Arial, sans-serif',
      overflow: 'auto'
    }}>
      <h2 style={{
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '0 0 20px 0',
        color: '#000000',
        textAlign: 'center'
      }}>
        Contact Us
      </h2>

      {status === 'success' ? (
        <div style={{
          backgroundColor: '#90EE90',
          border: '2px solid #2E8B57',
          padding: '16px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '0 0 8px 0',
            color: '#000000'
          }}>
            Message Sent!
          </h3>
          <p style={{
            fontSize: '12px',
            margin: 0,
            color: '#000000'
          }}>
            Thank you for reaching out. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          {status === 'error' && (
            <div style={{
              backgroundColor: '#FFB6C1',
              border: '2px solid #DC143C',
              padding: '12px',
              marginBottom: '16px',
              fontSize: '12px',
              color: '#000000'
            }}>
              {errorMessage}
            </div>
          )}
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '6px',
              color: '#000000'
            }}>
              Name
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                border: '2px solid #ffffff',
                boxShadow: 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '6px',
              color: '#000000'
            }}>
              Email
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                border: '2px solid #ffffff',
                boxShadow: 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '6px',
              color: '#000000'
            }}>
              Message
            </label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                border: '2px solid #ffffff',
                boxShadow: 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              type="submit"
              disabled={status === 'submitting'}
              className="win95-button"
              style={{
                backgroundColor: status === 'submitting' ? '#c0c0c0' : '#008CFF',
                color: '#ffffff',
                border: '2px solid #ffffff',
                padding: '8px 24px',
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'MS Sans Serif, Arial, sans-serif',
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
                opacity: status === 'submitting' ? 0.6 : 1
              }}
              onMouseDown={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff';
                }
              }}
              onMouseUp={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000';
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000';
                }
              }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      )}

      <div style={{
        marginTop: '24px',
        padding: '12px',
        backgroundColor: '#ffffff',
        border: '2px solid #c0c0c0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000'
      }}>
        <h3 style={{
          fontSize: '12px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          color: '#000000'
        }}>
          Get in Touch
        </h3>
        <p style={{
          fontSize: '11px',
          margin: '0 0 6px 0',
          color: '#000000',
          lineHeight: '1.3'
        }}>
          Ready to start your project? Fill out the form above and we'll get back to you within 24 hours.
        </p>
        <p style={{
          fontSize: '11px',
          margin: 0,
          color: '#666666'
        }}>
          Or email us directly at: info@flashforward.com
        </p>
      </div>
    </div>
  );
};

export default ContactUsWindow;