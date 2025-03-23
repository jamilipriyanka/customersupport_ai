import React from 'react';

const ReturnPolicy: React.FC = () => {
  const handlePolicyClick = (policyType: string) => {
    let response = '';
    
    switch(policyType) {
      case 'standard':
        response = `Walmart standard return policy:

• Most items can be returned within 90 days of purchase
• Original packaging is preferred but not required for most items
• Returns with receipt will be refunded to the original payment method
• Without a receipt, you may receive a store credit based on the lowest selling price
• You can look up receipts with the credit card used for purchase
• Walmart+ members can access digital receipts for easier returns
• You may be asked for government-issued photo ID for returns without receipt
• Returns can be made at any Walmart store regardless of purchase location
• Online purchases can be returned in-store or by mail
• Return shipping is free for most items purchased online`;
        break;
        
      case 'exceptions':
        response = `Walmart return policy exceptions:

• Electronics: 30-day return period from date of purchase
• Cell phones: 14-day return period (may vary by carrier)
• Prescription medications: Cannot be returned once dispensed
• Opened software, video games, movies: Can only be exchanged for identical item
• Perishable groceries: Must be returned within 7 days (if applicable)
• Airbeds: Must be returned within 15 days
• Firearms and ammunition: Special return requirements apply
• Pre-paid wireless phones: Cannot be returned once activated
• Major appliances: 90 days, but must contact for pickup of large items
• Plants and trees: Most have a 1-year guarantee with receipt
• Holiday seasonal items: Cannot be returned after the holiday`;
        break;
        
      case 'methods':
        response = `Walmart return methods:

• In-store returns: Bring items to the customer service desk at any Walmart
• Online returns through Walmart.com: Log into your account and start the return process
• Mail-back returns: Print a free return shipping label from your account
• Mobile Express Returns: Use the Walmart app to start return before coming to store
• Curbside returns: Available at some locations for contact-free returns
• Return bars: Self-service kiosks available at select stores
• Home pickup: Available for some large items purchased online
• Third-party items: May have different return processes (check item details)
• Gift returns: Can be processed with or without receipt
• Digital items: Contact Customer Service for digital purchases`;
        break;
        
      case 'refused':
        response = `Reasons a return might be refused:

• Return is outside the allowed time window
• Item shows excessive wear, damage, or signs of use
• Item is prohibited from return (certain personal care items, hazardous materials)
• Return patterns that violate our return abuse policy
• Missing parts or accessories from the original package
• Items that pose a health or safety risk
• Custom-made or personalized items
• Final sale items clearly marked as non-returnable
• Damaged items where damage wasn't due to manufacturer defect
• Digital content that has been accessed or downloaded
• Missing receipt for items with receipt-required policies`;
        break;
        
      case 'refunds':
        response = `How Walmart processes refunds:

• Returns with receipt are refunded to the original payment method
• Credit/debit card refunds: 3-5 business days to process
• Cash refunds: Immediate for amounts under $10, optional for larger amounts
• Check refunds: Cash or new check, may be subject to waiting period
• Walmart gift card refunds: Immediate to the gift card if available
• Online purchase refunds: Processed when return is received at warehouse
• Partial refunds may be issued for incomplete or damaged returns
• Original shipping costs may not be refundable
• Promotional discounts may affect refund amount
• Gift returns are typically issued as a gift card
• Tax is refunded based on local regulations and original payment method`;
        break;
    }
    
    // Create a custom event with the response
    const event = new CustomEvent('returnPolicyResponse', {
      detail: { response }
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <p className="font-medium mb-3">Return Policy</p>
      <p className="mb-3">I can help with information about Walmart's return policy. What would you like to know?</p>
      <div className="space-y-2 mb-3">
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handlePolicyClick('standard')}
        >
          Standard return policy
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handlePolicyClick('exceptions')}
        >
          Items with special return policies
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handlePolicyClick('methods')}
        >
          Ways to return items
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handlePolicyClick('refused')}
        >
          When returns might be refused
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handlePolicyClick('refunds')}
        >
          How refunds are processed
        </div>
      </div>
      <p className="text-sm">For specific questions about a return or to start a return, please have your receipt or order number ready.</p>
    </>
  );
};

export default ReturnPolicy;
