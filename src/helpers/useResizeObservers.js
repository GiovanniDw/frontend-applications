import { useEffect, useState, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Hook, that returns the current dimensions of an HTML element.
 * Doesn't play well with SVG.
 */

// export const useResizeObserver = (ref) => {
// 	const [dimensions, setDimensions] = useState(null);
// 	useEffect(() => {
// 		const observeTarget = ref;
// 		const ro = new ResizeObserver((entries, observer) => {
// 			for (const entry of entries) {
// 				const { width, height } = entry.contentRect;
// 				console.log('Element:', entry.target);
// 				setDimensions(entry.contentRect);
// 			}
// 		});
// 		ro.observe(observeTarget.current);
// 	}, [ref.current]);
// 	return dimensions;
// };

// export const useResizeObserver;

export const useObserver = ({ callback, element }) => {
	const current = element && element.current;

	const observer = useRef(null);

	useEffect(() => {
		// if we are already observing old element
		if (observer && observer.current && current) {
			observer.current.unobserve(current);
		}
		const resizeObserverOrPolyfill = ResizeObserver;
		observer.current = new resizeObserverOrPolyfill(callback);
		observe();

		return () => {
			if (observer && observer.current && element && element.current) {
				observer.current.unobserve(element.current);
			}
		};
	}, [current]);

	const observe = () => {
		if (element && element.current && observer.current) {
			observer.current.observe(element.current);
		}
	};
};
