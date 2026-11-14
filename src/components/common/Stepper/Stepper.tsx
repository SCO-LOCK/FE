import type { ComponentPropsWithoutRef } from 'react';
import StepperItem from './StepperItem';

interface StepperProps extends ComponentPropsWithoutRef<'div'> {
  steps: string[];
  currentStep: number;
  direction?: 'vertical' | 'horizontal';
}

export default function Stepper({
  steps,
  currentStep,
  direction = 'vertical',
  className = '',
  ...rest
}: StepperProps) {
  const isVertical = direction === 'vertical';

  return (
    <div
      className={`flex gap-[var(--gap-xsmall)] ${isVertical ? 'flex-col' : 'flex-row'} ${className}`}
      {...rest}
    >
      {steps.map((label, index) => (
        <StepperItem
          key={label}
          step={index + 1}
          label={label}
          selected={index + 1 === currentStep}
          className={isVertical ? 'w-full' : ''}
        />
      ))}
    </div>
  );
}