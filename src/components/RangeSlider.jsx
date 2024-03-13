import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';

const StyledSlider = styled(Slider)`
  width: 300px;
  margin: 20px auto;
`;

const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ItemLabel = styled.label`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: ${props => (props.active ? '#333' : '#666')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

const RangeSlider = ({ clickFunc }) => {
  const [value, setValue] = useState(1);

  const handleSliderChange = newValue => {
    setValue(newValue);
  };



  return (
    <div>
      <StyledSlider min={1} max={3} value={value} onChange={handleSliderChange} />
      <SliderWrapper>
        <ItemLabel active={value === 1}>Item 1</ItemLabel>
        <ItemLabel active={value === 2}>Item 2</ItemLabel>
        <ItemLabel active={value === 3}>Item 3</ItemLabel>
      </SliderWrapper>
      <input type="text" value={value} readOnly />
      <button onClick={clickFunc}>Submit</button> {/* Ensure onClick handler is set */}
    </div>
  );
};

export default RangeSlider;
