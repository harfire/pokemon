import React from 'react';

export default function Loading() {
	return (
		<>
			<span>Loading... </span>
			<span className="icon has-text-grey">
				<i className="fas fa-spinner fa-pulse" />
			</span>
		</>
	);
}
