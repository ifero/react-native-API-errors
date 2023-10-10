import { forwardRef, FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';

import { theme } from '../utils/theme';

const DEFAULT_SIZE = theme.space16;

export type IconProps = {
  size?: number;
  color?: string;
};

export const NearFormLogo = forwardRef<Svg, IconProps>(
  ({ size = DEFAULT_SIZE, color = theme.colorWhite }, ref) => (
    <Svg width={size} height={size} viewBox="0 0 300 300" fill="none" ref={ref}>
      <Path
        fill={color}
        fillRule="evenodd"
        d="m267.598 221.747-66.446-89.968v-93.24h54.844c6.328 0 11.602 5.453 11.602 11.996v171.212Zm-10.547 38.169h-49.57c-11.075 0-21.622-5.453-28.477-14.722L36.621 52.716c-4.219-5.998-.527-14.177 6.856-14.177h49.57c11.074 0 21.621 5.453 28.476 14.722l142.911 192.478c3.691 5.998-.528 14.177-7.383 14.177Zm-158.731 0H43.477c-6.328 0-11.602-5.453-11.602-11.996V76.162l66.445 90.514v93.24ZM255.996 20h-62.754c-4.746 0-8.965 4.362-8.965 9.27v79.608L135.234 41.81C125.215 28.18 109.395 20 92.52 20H44.004C27.656 20 15 33.632 15 49.99v198.475c0 16.903 13.184 29.99 29.004 29.99h62.754c4.746 0 8.965-4.362 8.965-9.27v-80.153l49.043 67.612C174.785 270.821 190.606 279 207.481 279h48.515C272.344 279 285 265.368 285 249.011V50.535C285 33.632 271.816 20 255.996 20Z"
        clipRule="evenodd"
      />
    </Svg>
  ),
);

export const Chevron: FC<
  IconProps & { direction: 'up' | 'right' | 'down' | 'left' } & {
    strokeWidth?: number;
  }
> = ({
  size = DEFAULT_SIZE,
  color = theme.colorBlack,
  direction,
  strokeWidth = 2,
}) => {
  const d = {
    up: 'M4.5 15.75l7.5-7.5 7.5 7.5',
    right: 'm8.25 4.5 7.5 7.5-7.5 7.5',
    down: 'M19.5 8.25l-7.5 7.5-7.5-7.5',
    left: 'M15.75 19.5L8.25 12l7.5-7.5',
  }[direction];

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      stroke={color}
    >
      <Path d={d} />
    </Svg>
  );
};
