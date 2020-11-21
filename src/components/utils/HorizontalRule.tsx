import * as React from 'react';

interface HorizontalRuleOptions {
  color?: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  verticalSpacing?: string;
}

export const HorizontalRule = (options?: HorizontalRuleOptions) => {
  const opts = {
    color: "rgba(255, 255, 255, 0.65)",
    align: 'center',
    width: "80%",
    verticalSpacing: "1em",
    ...options,
  };

  let marginLeft = "10%";
  let marginRight = "10%";
  let width = opts.width;

  if (opts.align === 'left') {
    marginLeft = "0%";
    width = "90%";
  } else if (opts.align === 'right') {
    marginRight = "0%";
    width = "90%";
  }

  // if width was specified, then go with that
  // otherwise go with a derived width
  width = options?.width || width;

  return (
    <div style={{
      width,
      marginLeft,
      marginRight,
      marginTop: opts.verticalSpacing,
      marginBottom: opts.verticalSpacing,
      borderBottom: '1px solid ' + opts.color,
    }} />
  )
};;
