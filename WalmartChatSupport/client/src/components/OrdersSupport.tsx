import React from 'react';

const OrdersSupport: React.FC = () => {
  const handleOptionClick = (optionName: string) => {
    // Create a custom event to inform the parent component about the selected option
    let response = '';
    
    switch(optionName) {
      case 'track':
        response = `Order tracking information:

• You can track orders by entering your order number
• Order numbers are typically formatted as WM-12345678
• Track orders through your Walmart account online
• The Walmart app provides real-time tracking updates
• Email notifications are sent at each stage of delivery
• Most orders show estimated delivery dates
• Tracking details include shipping carrier information
• Package location updates are provided when available

Please provide your order number to check specific status.`;
        break;
        
      case 'cancel':
        response = `Order cancellation instructions:

• Orders can only be cancelled before they ship
• Cancel through your Walmart account online
• Select the order and click "Cancel Items"
• The Walmart app also supports order cancellation
• Some items may process too quickly to be cancelled
• Cancellations are typically processed within 30 minutes
• You'll receive an email confirmation of cancellation
• Refunds for cancelled orders typically take 3-5 business days

Would you like to cancel a specific order?`;
        break;
        
      case 'missing':
        response = `Reporting missing items:

• Check your packing slip to confirm items are missing
• Contact Walmart Customer Care within 90 days of purchase
• Have your order number ready when reporting
• Take photos of the package as received if possible
• Missing items are investigated within 24-48 hours
• Replacements or refunds are processed after verification
• High-value items may require additional verification steps
• Digital gift cards may be in your spam/junk email folder

To report a specific missing item, please provide your order details.`;
        break;
        
      case 'start-return':
        response = `Starting a return:

• Returns can be initiated through your Walmart account
• Select the order and item(s) you wish to return
• Choose your preferred return method
• Print a return label if returning by mail
• In-store returns require receipt or order information
• Most items have a 90-day return window
• Electronics have a 30-day return window
• Some items may have different return policies
• Return authorization is required for all returns

Would you like to start a return for a specific item?`;
        break;
        
      case 'check-return':
        response = `Return status information:

• Return status can be checked in your Walmart account
• Look under "Order History" for return status
• Processing typically takes 7-10 business days
• Mail-in returns take 3-5 days to reach our facility
• Refunds are issued to original payment method
• Return status shows as "Pending," "In Transit," or "Completed"
• Email notifications are sent at each stage
• Contact Customer Service if status hasn't updated in 10+ days

To check a specific return, please provide your return ID or order number.`;
        break;
        
      case 'receipt':
        response = `Finding receipts:

• Digital receipts are available in your Walmart account
• Look under "Purchase History" for past receipts
• Receipts can be filtered by date or purchase type
• Email receipts are sent for all online purchases
• In-store purchases can be found with your payment card
• Walmart+ members have all receipts stored automatically
• Receipts can be printed or forwarded as needed
• Receipt lookup is available at store customer service

Would you like help locating a specific receipt?`;
        break;
        
      case 'history':
        response = `Purchase history information:

• Full purchase history is available in your Walmart account
• History shows both online and in-store purchases (if linked)
• Filter by date, store, or product category
• Download history reports for your records
• History is typically available for up to 2 years
• Returns and exchanges are marked in your history
• Item details include prices and tax information
• Reorder directly from your purchase history

Is there a specific purchase you're trying to locate?`;
        break;
        
      default:
        response = `I'd be happy to help with your ${optionName} request. What specific details do you need?`;
    }
    
    const event = new CustomEvent('orderOptionSelected', { 
      detail: { response } 
    });
    window.dispatchEvent(event);
  };

  React.useEffect(() => {
    // Set up listener for the custom event
    const handleOrderOption = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log("Order option selected:", customEvent.detail.response);
      // The parent component will handle this event
    };
    
    window.addEventListener('orderOptionSelected', handleOrderOption);
    
    // Clean up
    return () => {
      window.removeEventListener('orderOptionSelected', handleOrderOption as EventListener);
    };
  }, []);

  return (
    <>
      <p className="font-medium mb-3">Order & Return Support</p>
      <p className="mb-3">I can help you with orders and returns. What would you like assistance with?</p>
      <div className="space-y-2 mb-3">
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('track')}
        >
          Track an existing order
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('cancel')}
        >
          Cancel an order
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('missing')}
        >
          Report a missing item
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('start-return')}
        >
          Start a return
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('check-return')}
        >
          Check return status
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('receipt')}
        >
          Find a receipt
        </div>
        <div 
          className="bg-[#f0f8ff] p-2 rounded cursor-pointer hover:bg-[#e0f0ff]"
          onClick={() => handleOptionClick('history')}
        >
          Purchase history
        </div>
      </div>
      <p>To check an order status, please provide your order number (e.g., WM-12345678) or the email address used for the order.</p>
    </>
  );
};

export default OrdersSupport;
