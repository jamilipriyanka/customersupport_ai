import React, { useState } from 'react';

interface StoreInfo {
  name: string;
  address: string;
  distance: string;
  hours: string;
  services: string[];
}

// Mock store locations (in real app, this would come from an API)
const storeDatabase: Record<string, StoreInfo[]> = {
  '33617': [
    {
      name: 'Walmart Supercenter',
      address: '2701 E Fletcher Ave, Tampa, FL 33612',
      distance: '2.3 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Vision Center', 'Auto Care', 'Grocery Pickup', 'MoneyCenter']
    },
    {
      name: 'Walmart Supercenter',
      address: '15302 N Nebraska Ave, Tampa, FL 33613',
      distance: '3.7 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Deli', 'Bakery', 'Grocery Pickup', 'Garden Center']
    },
    {
      name: 'Walmart Neighborhood Market',
      address: '1505 N Dale Mabry Hwy, Tampa, FL 33607',
      distance: '5.1 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Grocery Pickup']
    }
  ],
  '10001': [
    {
      name: 'Walmart Supercenter',
      address: '300 W 34th St, New York, NY 10001',
      distance: '0.5 miles',
      hours: '7:00 AM - 12:00 AM',
      services: ['Pharmacy', 'Vision Center', 'Grocery Pickup', 'MoneyCenter']
    },
    {
      name: 'Walmart Neighborhood Market',
      address: '140 W 23rd St, New York, NY 10011',
      distance: '1.2 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Grocery Pickup']
    }
  ],
  '90210': [
    {
      name: 'Walmart Supercenter',
      address: '8500 Washington Blvd, Pico Rivera, CA 90660',
      distance: '15.7 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Vision Center', 'Auto Care', 'Grocery Pickup', 'Garden Center']
    },
    {
      name: 'Walmart Supercenter',
      address: '1600 Mountain Ave, Duarte, CA 91010',
      distance: '18.3 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Deli', 'Bakery', 'Grocery Pickup', 'Garden Center']
    }
  ],
  '60601': [
    {
      name: 'Walmart Supercenter',
      address: '4650 W North Ave, Chicago, IL 60639',
      distance: '5.8 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Vision Center', 'Grocery Pickup', 'MoneyCenter']
    },
    {
      name: 'Walmart Neighborhood Market',
      address: '2551 W Cermak Rd, Chicago, IL 60608',
      distance: '4.3 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Grocery Pickup']
    },
    {
      name: 'Walmart Supercenter',
      address: '8331 S Stewart Ave, Chicago, IL 60620',
      distance: '9.2 miles',
      hours: '6:00 AM - 11:00 PM',
      services: ['Pharmacy', 'Vision Center', 'Auto Care', 'Grocery Pickup', 'Garden Center']
    }
  ]
};

const StoreLocator: React.FC = () => {
  const handleOptionClick = (option: string) => {
    let response = '';
    
    switch (option) {
      case 'zip':
        response = `To find stores by ZIP code:

• Enter your 5-digit ZIP code in the chat
• For example, type "33617" or "Find stores near 10001"
• I'll show you the closest Walmart locations
• You'll see store addresses, hours, and available services
• You can filter results by specific services if needed

Please enter your ZIP code now to find nearby stores.`;
        break;
        
      case 'city':
        response = `To find stores by city and state:

• Provide your city and state in the chat
• For example, type "Tampa, FL" or "Chicago, IL"
• Include both city and state for more accurate results
• I'll display Walmart locations in that area
• Results include store type, address, and available services
• You can get more details about any specific location

Please enter your city and state to find stores.`;
        break;
        
      case 'hours':
        response = `Walmart store hours information:

• Most Walmart Supercenters are open 6:00 AM to 11:00 PM daily
• Some Supercenters are open 24 hours (varies by location)
• Neighborhood Markets typically open 6:00 AM to 11:00 PM
• Pharmacy hours are generally 9:00 AM to 9:00 PM weekdays
• Vision Centers usually operate 9:00 AM to 8:00 PM weekdays
• Auto Care Centers often open 8:00 AM to 8:00 PM
• Holiday hours may vary at all locations
• Senior shopping hours may be available (typically Tuesday mornings)
• Store hours can be confirmed on Walmart.com or the Walmart app

Would you like to check hours for a specific store?`;
        break;
        
      case 'services':
        response = `Services available at Walmart stores:

• Pharmacy: Prescription filling, vaccinations, health screenings
• Vision Center: Eye exams, glasses, contacts, adjustments
• Auto Care Center: Tire services, oil changes, battery installation
• MoneyCenter: Check cashing, money transfers, bill payments
• Photo Center: Prints, photo gifts, passport photos
• Garden Center: Plants, outdoor furniture, gardening supplies
• Grocery Pickup: Online ordering with curbside pickup
• Grocery Delivery: Home delivery from selected stores
• Cell Phone Services: Phone sales and wireless plans
• Walmart+: Membership program with delivery benefits

Services vary by location. Would you like to check which services are available at a specific store?`;
        break;
    }
    
    // Create and dispatch a custom event
    const event = new CustomEvent('storeLocatorResult', {
      detail: { response }
    });
    window.dispatchEvent(event);
  };
  
  const [zipInput, setZipInput] = useState('');
  
  const handleZipSubmit = () => {
    if (!zipInput || zipInput.length !== 5 || !/^\d+$/.test(zipInput)) {
      const invalidZipResponse = `Please provide a valid 5-digit ZIP code:

• ZIP codes should contain exactly 5 digits
• Do not include spaces or special characters
• For example: 33617, 10001, or 90210`;

      const event = new CustomEvent('storeLocatorResult', {
        detail: { response: invalidZipResponse }
      });
      window.dispatchEvent(event);
      return;
    }
    
    // Simulate loading
    setTimeout(() => {
      const stores = storeDatabase[zipInput] || [];
      
      let response = '';
      if (stores.length > 0) {
        response = `Walmart stores near ${zipInput}:

${stores.map((store, index) => 
`• ${store.name}
  • Address: ${store.address}
  • Distance: ${store.distance}
  • Hours: ${store.hours}
  • Services: ${store.services.join(', ')}`).join('\n\n')}

• For directions, call the store, or get specific department hours, visit Walmart.com
• You can filter stores by services like Pharmacy, Auto Care, or Grocery Pickup
• Store hours may vary during holidays`;
      } else {
        response = `I couldn't find Walmart stores in ZIP code ${zipInput}:

• Try searching with a different ZIP code
• Check if your ZIP code is formatted correctly (5 digits)
• Try searching by city and state instead
• Use the store locator on Walmart.com for more options
• The Walmart app provides a map view of all locations`;
      }
      
      // Create and dispatch a custom event
      const event = new CustomEvent('storeLocatorResult', {
        detail: { response }
      });
      window.dispatchEvent(event);
    }, 1000);
  };

  return (
    <>
      <p className="font-medium mb-3">Store Locator</p>
      <p className="mb-3">I can help you find Walmart stores in your area. Please provide one of the following:</p>
      <div className="space-y-2 mb-3">
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('zip')}
        >
          Find stores by ZIP code
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('city')}
        >
          Find stores by city and state
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('hours')}
        >
          Store hours information
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('services')}
        >
          Services available in stores
        </div>
      </div>
      <div className="mt-4 mb-4">
        <p className="mb-2">Enter a ZIP code to find nearby stores:</p>
        <div className="flex">
          <input
            type="text"
            placeholder="5-digit ZIP code"
            className="flex-1 p-2 border border-gray-300 rounded-l"
            value={zipInput}
            onChange={(e) => setZipInput(e.target.value.slice(0, 5))}
            maxLength={5}
          />
          <button 
            className="bg-[#0071dc] text-white px-4 py-2 rounded-r"
            onClick={handleZipSubmit}
          >
            Search
          </button>
        </div>
      </div>
      <p className="text-sm">You can also ask about specific services like Pharmacy, Auto Care, Vision Center, or Grocery Pickup.</p>
    </>
  );
};

export default StoreLocator;
