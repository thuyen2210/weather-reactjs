import React from 'react';

function WindDirection({ deg }) {
  // Hàm chuyển đổi góc thành hướng gió
  const getWindDirection = (deg) => {
    const directions = [
      'Bắc',
      'Đông Bắc',
      'Đông',
      'Đông Nam',
      'Nam',
      'Tây Nam',
      'Tây',
      'Tây Bắc',
      'Bắc'
    ];

    const index = Math.round((deg % 360) / 45);
    return directions[index];
  };

  return (
    <div>
      <p>Hướng gió: {getWindDirection(deg)}</p>
    </div>
  );
}

export default WindDirection;
