interface Star {
	x: number;
	y: number;
	z: number;
}

export const clear = (context: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement) => {
	if (context) context.fillStyle = '#04000d';
	context?.fillRect(0, 0, canvas.width, canvas.height);
};

export const drawPixel = (
	context: CanvasRenderingContext2D | null,
	x: number,
	y: number,
	brightness: number
) => {
	const intensity = brightness * 255;
	if (context) context.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
	context?.fillRect(x, y, 2, 2);
};

export const moveStars = (stars: Star[], distance: number) => {
	stars.forEach((star) => {
		star.z = star.z <= 1 ? star.z + 1000 : star.z - distance;
	});
};
