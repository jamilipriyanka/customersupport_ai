import React from 'react';
import { faqs } from '../lib/faqData';

interface FAQListProps {
  onSelectFAQ: (faqId: string) => void;
}

const FAQList: React.FC<FAQListProps> = ({ onSelectFAQ }) => {
  return (
    <>
      <p className="mb-2">Frequently Asked Questions</p>
      <p className="mb-3">Here are some common questions Walmart customers ask:</p>
      <ul className="space-y-3">
        {faqs.map((faq) => (
          <li 
            key={faq.id}
            className="bg-white p-3 rounded cursor-pointer hover:bg-gray-50 transition"
            onClick={() => onSelectFAQ(faq.id)}
          >
            <a href="#" className="text-[#0071dc]" onClick={(e) => e.preventDefault()}>
              {faq.question}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FAQList;
