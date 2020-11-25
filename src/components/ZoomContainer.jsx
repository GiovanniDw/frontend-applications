import { select, zoom } from 'd3';
import React, { useState, useEffect } from 'react'

import { useSvg } from './SVGContainer';

export const ZoomContainer = ({ children }) => {
    const svgElement = useSvg()
    const [{ x, y, k }, setTransform] = useState({ x: 0, y: 0, k: 1 })

    const zoomed = (event) => setTransform(event.transform)

    useEffect(() => {
        if (!svgElement) return
        const selection = select(svgElement)
        const zoomMap = zoom().on('zoom', zoomed)
        selection.call(zoomMap)
        return () => selection.on(".zoom", null)
    }, [svgElement])

    return <g transform={`translate(${x}, ${y}) scale(${k})`}>{children}</g>
}
