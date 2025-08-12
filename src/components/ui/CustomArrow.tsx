'use client';
import { CaretLeftIcon } from '@phosphor-icons/react';

const arrowStyle = {
  color: 'var(--c-text)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--c-input)',
  borderRadius: '50%',
  width: 41,
  height: 41,
  zIndex: 2,
};
const CustomArrow = (
  props: React.HTMLAttributes<HTMLDivElement> & { direction: 'left' | 'right' }
) => {
  const { style, className, onClick, direction } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        ...arrowStyle,
      }}
      onClick={onClick}
    >
      <CaretLeftIcon
        style={{ fontSize: 16 }}
        className={direction === 'left' ? '' : 'rotate-180'}
      />
    </div>
  );
};

export default CustomArrow;
