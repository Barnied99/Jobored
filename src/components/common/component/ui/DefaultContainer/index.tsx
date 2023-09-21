import { Container } from '@mantine/core';
import React from 'react';

interface DefaultContainerProps {
	className?: string;
	small?: boolean;
	children: React.ReactNode;
}

const DEFAULT_SIZE = '1116px';
const SMALL_SIZE = '773px';

const DefaultContainer: React.FC<DefaultContainerProps> = ({
	className,
	small,
	children,
}) => {
	return (
		<Container
			size={small ? SMALL_SIZE : DEFAULT_SIZE}
			className={className}
			px="0"
		>
			{children}
		</Container>
	);
};

export default DefaultContainer;
