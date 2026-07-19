import React from 'react';

const ContactLink = ({ type, value, className = "" }) => {
  if (!value) return null;

  let href = value;
  let displayValue = value;

  if (type === 'email') {
    href = `mailto:${value}`;
  } else if (type === 'phone') {
    href = `tel:${value}`;
  } else if (type === 'url') {
    // Prepend https:// if not present
    if (!/^https?:\/\//i.test(value)) {
      href = `https://${value}`;
    }
  }

  const isExternal = type === 'url';

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`hover:underline transition-colors duration-200 ${className}`}
    >
      {displayValue}
    </a>
  );
};

export default ContactLink;
