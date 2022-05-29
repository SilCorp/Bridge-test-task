const numberWithDivider = (number, divider = ',') => {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, divider);
  return parts.join('.');
};

export default numberWithDivider;
