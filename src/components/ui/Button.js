// src/components/Button.js
import React from 'react';

export const Button = ({ onClick, children, className }) => (
  <Button className="w-full bg-white text-green-600 hover:bg-gray-100" onClick={handleStartChat}>
  Start
</Button>
);

export default Button;