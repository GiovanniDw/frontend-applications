import {
	useEffect,
	useState,
	useRef,
	useLayoutEffect,
	useCallback,
} from 'react';

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

// export const useObserver = ({ callback, element }) => {
// 	const current = element && element.current;

// 	const observer = useRef(null);

// 	useEffect(() => {
// 		// if we are already observing old element
// 		if (observer && observer.current && current) {
// 			observer.current.unobserve(current);
// 		}
// 		const resizeObserverOrPolyfill = ResizeObserver;
// 		observer.current = new resizeObserverOrPolyfill(callback);
// 		observe();

// 		return () => {
// 			if (observer && observer.current && element && element.current) {
// 				observer.current.unobserve(element.current);
// 			}
// 		};
// 	}, [current]);

// 	const observe = () => {
// 		if (element && element.current && observer.current) {
// 			observer.current.observe(element.current);
// 		}
// 	};
// };

export const useRect = (ref) => {
	const [rect, setRect] = useState(getRect(ref ? ref.current : null));

	const handleResize = useCallback(() => {
		if (!ref.current) {
			return;
		}

		// Update client rect
		setRect(getRect(ref.current));
	}, [ref]);

	useLayoutEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}

		handleResize();

		if (typeof ResizeObserver === 'function') {
			let resizeObserver = new ResizeObserver(() => handleResize());
			resizeObserver.observe(element);

			return () => {
				if (!resizeObserver) {
					return;
				}

				resizeObserver.disconnect();
				resizeObserver = null;
			};
		} else {
			// Browser support, remove freely
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [ref, handleResize]);

	return rect;
};

function getRect(element) {
	if (!element) {
		return {
			bottom: 0,
			height: 0,
			left: 0,
			right: 0,
			top: 0,
			width: 0,
		};
	}

	return element.getBoundingClientRect();
}

export const useBbox = () => {
	const ref = useRef();
	const [bbox, setBbox] = useState({});

	const set = () =>
		setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : {});

	useEffect(() => {
		set();
		window.addEventListener('resize', set);
		return () => window.removeEventListener('resize', set);
	}, []);

	return [bbox, ref];
};
