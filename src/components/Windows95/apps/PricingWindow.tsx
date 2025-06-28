import React, { useState } from 'react';

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  color: string;
}

interface SubscriptionService {
  name: string;
  price: number;
  category: string;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "Basic",
    price: "$999",
    description: "Perfect for small businesses looking to establish their digital presence.",
    features: [
      "Custom Website Design",
      "Mobile Responsive",
      "Contact Form",
      "Basic SEO Setup",
      "1 Month Support"
    ],
    color: "#008CFF"
  },
  {
    title: "Pro",
    price: "$2,499",
    description: "Ideal for growing businesses ready to expand their digital footprint.",
    features: [
      "Everything in Basic",
      "E-commerce Integration",
      "Content Management System",
      "Advanced SEO",
      "3 Months Support",
      "Social Media Setup"
    ],
    color: "#FFCC00"
  },
  {
    title: "Enterprise",
    price: "$4,999",
    description: "Comprehensive solution for established businesses seeking digital excellence.",
    features: [
      "Everything in Pro",
      "Custom Features",
      "API Integration",
      "Performance Optimization",
      "6 Months Support",
      "Analytics Setup",
      "Training & Documentation"
    ],
    color: "#00CC66"
  }
];

const subscriptionServices: SubscriptionService[] = [
  { name: "Website Hosting", price: 29, category: "websites" },
  { name: "SSL Certificate", price: 15, category: "websites" },
  { name: "Daily Backups", price: 19, category: "websites" },
  { name: "24/7 Support", price: 49, category: "websites" },
  { name: "Content Updates", price: 149, category: "content" },
  { name: "Blog Writing", price: 199, category: "content" },
  { name: "Social Media Management", price: 299, category: "content" },
  { name: "Email Marketing", price: 99, category: "content" },
  { name: "AI Chatbot", price: 199, category: "ai" },
  { name: "AI Content Generation", price: 149, category: "ai" },
  { name: "AI Analytics", price: 99, category: "ai" },
  { name: "AI Automation", price: 249, category: "ai" }
];

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  return (
    <div 
      className="win95-card"
      style={{
        border: '2px solid #c0c0c0',
        backgroundColor: '#ffffff',
        padding: '16px',
        margin: '8px',
        borderRadius: '0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h3 
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          color: '#000000',
          fontFamily: 'MS Sans Serif, Arial, sans-serif'
        }}
      >
        {plan.title}
      </h3>
      <div 
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 12px 0',
          color: plan.color,
          fontFamily: 'MS Sans Serif, Arial, sans-serif'
        }}
      >
        {plan.price}
      </div>
      <p 
        style={{
          fontSize: '11px',
          margin: '0 0 16px 0',
          color: '#000000',
          fontFamily: 'MS Sans Serif, Arial, sans-serif',
          lineHeight: '1.3'
        }}
      >
        {plan.description}
      </p>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        flex: 1
      }}>
        {plan.features.map((feature, index) => (
          <li 
            key={index}
            style={{
              fontSize: '11px',
              margin: '4px 0',
              color: '#000000',
              fontFamily: 'MS Sans Serif, Arial, sans-serif',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ marginRight: '6px', color: plan.color }}>•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SubscriptionServiceItem: React.FC<{ 
  service: SubscriptionService; 
  isSelected: boolean; 
  onToggle: () => void 
}> = ({ service, isSelected, onToggle }) => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        margin: '4px 0',
        backgroundColor: isSelected ? '#008CFF' : '#ffffff',
        border: '2px solid #c0c0c0',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        cursor: 'pointer'
      }}
      onClick={onToggle}
    >
      <span style={{
        fontSize: '12px',
        color: isSelected ? '#ffffff' : '#000000',
        fontFamily: 'MS Sans Serif, Arial, sans-serif'
      }}>
        {service.name}
      </span>
      <span style={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: isSelected ? '#ffffff' : '#000000',
        fontFamily: 'MS Sans Serif, Arial, sans-serif'
      }}>
        ${service.price}/mo
      </span>
    </div>
  );
};

const PricingWindow: React.FC = () => {
  const [pricingType, setPricingType] = useState<'packages' | 'subscription'>('packages');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const calculateTotal = () => {
    return subscriptionServices
      .filter(service => selectedServices.includes(service.name))
      .reduce((total, service) => total + service.price, 0);
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName) 
        ? prev.filter(name => name !== serviceName)
        : [...prev, serviceName]
    );
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
        Pricing
      </h2>

      {/* Toggle Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '16px',
        backgroundColor: '#c0c0c0',
        border: '2px solid #ffffff',
        boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
        width: 'fit-content',
        margin: '0 auto 16px auto'
      }}>
        <button
          onClick={() => setPricingType('packages')}
          style={{
            backgroundColor: pricingType === 'packages' ? '#008CFF' : '#c0c0c0',
            color: pricingType === 'packages' ? '#ffffff' : '#000000',
            border: 'none',
            padding: '6px 16px',
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            cursor: 'pointer'
          }}
        >
          Packages
        </button>
        <button
          onClick={() => setPricingType('subscription')}
          style={{
            backgroundColor: pricingType === 'subscription' ? '#008CFF' : '#c0c0c0',
            color: pricingType === 'subscription' ? '#ffffff' : '#000000',
            border: 'none',
            padding: '6px 16px',
            fontSize: '11px',
            fontWeight: 'bold',
            fontFamily: 'MS Sans Serif, Arial, sans-serif',
            cursor: 'pointer'
          }}
        >
          Subscription
        </button>
      </div>

      {pricingType === 'packages' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '8px',
          padding: '8px'
        }}>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      ) : (
        <div style={{ padding: '8px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {['websites', 'content', 'ai'].map((category) => (
              <div key={category}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  margin: '0 0 12px 0',
                  color: '#000000',
                  textTransform: 'capitalize'
                }}>
                  {category} Services
                </h3>
                {subscriptionServices
                  .filter(service => service.category === category)
                  .map((service) => (
                    <SubscriptionServiceItem
                      key={service.name}
                      service={service}
                      isSelected={selectedServices.includes(service.name)}
                      onToggle={() => toggleService(service.name)}
                    />
                  ))}
              </div>
            ))}
          </div>
          
          {selectedServices.length > 0 && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#ffffff',
              border: '2px solid #c0c0c0',
              boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #808080, 1px 1px 0px #000000',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#000000',
                marginBottom: '4px'
              }}>
                Total Monthly: ${calculateTotal()}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#666666'
              }}>
                {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PricingWindow;