import React from 'react';

interface GeneralSupportProps {
  onSelectService: (serviceId: string) => void;
}

const GeneralSupport: React.FC<GeneralSupportProps> = ({ onSelectService }) => {
  const handleServiceClick = (serviceId: string) => {
    let response = '';
    
    switch(serviceId) {
      case 'walmart-plus':
        response = `Walmart+ membership benefits:

• $98/year or $12.95/month membership program
• Free same-day delivery from your local store (on orders $35+)
• Free shipping with no order minimum (excludes Marketplace items)
• Fuel discounts - save up to 10¢ per gallon at participating stations
• Mobile scan & go technology for faster in-store shopping
• Early access to special promotions and events
• Streaming benefits with Paramount+ Essential included
• Member prices on select prescriptions
• Free 30-day trial available for new members
• Sign up online at walmart.com/plus or through the Walmart app`;
        break;
        
      case 'pickup-delivery':
        response = `Walmart pickup and delivery options:

• Free curbside pickup available at most Walmart stores
• Reserve a pickup time slot when placing your order online
• Most pickup orders are ready within 4 hours
• Same-day delivery available in many areas
• Express delivery gets items to you in as little as 2 hours
• Standard delivery typically arrives in 2-3 days
• Delivery fees vary based on time slot and delivery speed
• Walmart+ members get free delivery on orders $35+
• Grocery items are hand-selected by trained personal shoppers
• Temperature-sensitive items are properly stored until pickup/delivery
• Substitutions can be approved or declined when ordering`;
        break;
        
      case 'pharmacy':
        response = `Walmart pharmacy services:

• Prescription filling at competitive prices
• $4 generic medication program for select prescriptions
• Automatic refills available with enrollment
• Prescription transfers from other pharmacies
• Immunizations including flu shots, COVID-19 vaccines, shingles, etc.
• Mobile app for managing prescriptions and refills
• Text alerts when prescriptions are ready
• Walmart+ members receive member-only prescription prices
• Drive-thru pharmacy available at select locations
• Free prescription delivery from select stores
• Health screenings and wellness resources at pharmacy`;
        break;
        
      case 'financial':
        response = `Walmart financial services:

• Money transfers through MoneyGram and Western Union
• Check cashing services (payroll, government, tax refund checks)
• Bill payment services for hundreds of companies
• Money orders available for purchase
• Walmart Pay mobile payment system for contactless checkout
• Walmart MoneyCard - reloadable prepaid debit card
• Walmart Rewards Mastercard credit options
• Tax preparation services (seasonal)
• Coin exchange machines at select locations
• Gift card purchases and reloads`;
        break;
        
      case 'gift-cards':
        response = `Walmart gift cards and registries:

• Physical and digital gift cards available
• Gift cards never expire and have no fees
• Check balance online, in-store, or through the Walmart app
• Wedding registry with universal scanning capability
• Baby registry with free welcome box for expecting parents
• Special occasion gift cards for birthdays, holidays, etc.
• Corporate gift card programs available for businesses
• Gift cards redeemable online or in any Walmart store
• Registry users get price matching for items on their list
• Group gifting allows friends to contribute together on larger items
• Registry completion discount after event date`;
        break;
        
      case 'credit-card':
        response = `Walmart credit card information:

• Two options: Walmart Rewards Card and Capital One Walmart Rewards® Mastercard®
• No annual fee for either card
• Walmart Rewards Card can only be used at Walmart stores and Walmart.com
• Capital One Walmart Rewards® Mastercard® can be used anywhere Mastercard is accepted
• Earn 5% cash back on Walmart.com purchases (including pickup & delivery)
• Earn 2% cash back in Walmart stores and at Walmart & Murphy USA fuel stations
• Mastercard earns 1% everywhere else Mastercard is accepted
• Apply online, in-store, or through the Walmart app
• Digital card access immediately upon approval
• Manage account online or through the Capital One mobile app`;
        break;
        
      case 'price-match':
        response = `Walmart price matching policies:

• Walmart matches Walmart.com prices in physical stores
• The item must be identical (same brand, size, model, color, etc.)
• The item must be in stock at the online price when requested
• Price matches are limited to one per customer per day
• Walmart does NOT match competitor prices (in-store or online)
• Marketplace or third-party seller prices are not eligible
• Special event prices (Black Friday, Cyber Monday) are excluded
• Bundle offers, instant rebates, or mail-in offers cannot be matched
• Request price matches at checkout or customer service desk
• Manager approval may be required for certain price match requests`;
        break;
        
      case 'careers':
        response = `Walmart career opportunities:

• Entry-level, management, and corporate positions available
• In-store roles include cashiers, stockers, department managers
• Supply chain positions in distribution and fulfillment centers
• Corporate roles at Bentonville, AR headquarters and other locations
• Digital and tech positions for Walmart's e-commerce expansion
• Healthcare roles in Walmart Health centers and pharmacies
• Benefits include healthcare coverage, 401(k) with company match
• Associate stock purchase plan with company match
• Educational assistance through Live Better U program
• Paid time off and parental leave
• Apply online at careers.walmart.com`;
        break;
        
      case 'corporate':
        response = `Walmart corporate information:

• Founded by Sam Walton in 1962
• Headquartered in Bentonville, Arkansas
• World's largest retailer with over 10,500 stores globally
• Operates under various banners including Walmart, Sam's Club, Flipkart
• Employs approximately 2.3 million associates worldwide
• Listed on the New York Stock Exchange (NYSE: WMT)
• Mission: "Save people money so they can live better"
• Committed to environmental sustainability goals
• Community giving through Walmart Foundation
• Investing in American manufacturing and job creation
• Working toward becoming a regenerative company`;
        break;
        
      default:
        response = `I'd be happy to help with information about ${serviceId}. Please let me know what specific details you're looking for.`;
    }
    
    // Create and dispatch a custom event with the response
    const event = new CustomEvent('generalSupportResponse', {
      detail: { response }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <p className="font-medium mb-3">Walmart Assistant</p>
      <p className="mb-3">General Support</p>
      <p className="mb-3">I can help with various Walmart services and information:</p>
      
      <div className="space-y-2">
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('walmart-plus')}
        >
          Walmart+ membership benefits and enrollment
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('pickup-delivery')}
        >
          Pickup and delivery options
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('pharmacy')}
        >
          Pharmacy services
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('financial')}
        >
          Financial services (Money Center, Walmart Pay)
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('gift-cards')}
        >
          Gift cards and registries
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('credit-card')}
        >
          Walmart credit card
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('price-match')}
        >
          Price matching policies
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('careers')}
        >
          Career opportunities
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleServiceClick('corporate')}
        >
          Corporate information
        </div>
      </div>
      
      <p className="mt-3">What specific information can I provide for you today?</p>
    </>
  );
};

export default GeneralSupport;
