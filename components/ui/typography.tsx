import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

type TypographyProps<T extends React.ElementType> = {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 't1'
    | 't2'
    | 't3'
    | 't4'
    | 't5'
    | 't6'
    | 't7';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export const Typography = <T extends React.ElementType = 'p'>({
  variant = 't1',
  weight = 'regular',
  className = '',
  children,
  ...restProps
}: TypographyProps<T>) => {
  const typographyVariants = cva('not-italic text-white', {
    variants: {
      variant: {
        h1: 'text-white text-xl sm:text-4xl md:text-6xl',
        h2: 'text-white text-xl sm:text-3xl md:text-5xl',
        h3: 'text-white text-lg sm:text-2xl md:text-4xl',
        h4: 'text-white text-lg sm:text-xl md:text-3xl',
        h5: 'text-white text-lg sm:text-xl md:text-2xl',
        t1: 'text-white text-lg md:text-xl',
        t2: 'text-white text-base md:text-lg',
        t3: 'text-white text-base',
        t4: 'text-white text-sm',
        t5: 'text-white text-xs',
        t6: 'text-white text-[0.625rem] leading-[0.75rem]',
        t7: 'text-white text-[0.5rem] leading-[0.5rem]'
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semiBold: 'font-semibold',
        bold: 'font-bold'
      }
    },
    defaultVariants: {
      variant: 't1',
      weight: 'regular'
    }
  });
  const Component = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(variant)
    ? (variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5')
    : 'p';

  return (
    <Component
      className={cn(typographyVariants({ variant, weight, className }))}
      {...restProps}
    >
      {children}
    </Component>
  );
};
