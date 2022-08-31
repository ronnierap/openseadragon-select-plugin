import { Point, Rect } from 'openseadragon';
import { uid } from '../utils';

export interface ShapeConstructor {
	new (
		drawOptions: DrawingOptions,
		viewer: OpenSeadragon.Viewer,
	): BaseShape;
	type: string;
}

export interface DrawingOptions {
	color: string;
	lineWidth: number;
	fill: string;
}

export abstract class BaseShape {
	static type = 'BaseShape';
	protected _isDisposed = false;
	protected _isDrawing = false;

	id: string = uid();
	hidden = false;

	get isDisposed() {
		return this._isDisposed;
	}

	get isDrawing() {
		return this._isDrawing;
	}
	abstract readonly rect: Rect;

	constructor(
		protected drawingOptions: DrawingOptions,
		protected viewer: OpenSeadragon.Viewer,
	) {}

	dispose() {
		this._isDisposed = true;
	}

	updateDrawingOptions(options: Partial<DrawingOptions>) {
		Object.assign(this.drawingOptions, options);
	}

	draw(context2d: CanvasRenderingContext2D): void {
		this.setDrawOptions(context2d);
		const svg = this.createSvgShape();

		context2d.stroke(svg);
		context2d.fill(svg);
		context2d.save();
	}

	protected toViewerCoords(point: Point) {
		return this.viewer.viewport.imageToViewerElementCoordinates(
			point.clone(),
		);
	}

	protected setDrawOptions(
		context2d: CanvasRenderingContext2D,
	) {
		context2d.strokeStyle = this.drawingOptions.color;
		context2d.fillStyle = this.drawingOptions.fill;
		context2d.lineWidth = this.drawingOptions.lineWidth;
	}

	protected finishDrawing() {
		this._isDrawing = false;
	}

	startDrawing(point: Point) {
		this._isDrawing = true;
		this.onMouseDown(point);
	}

	abstract createSvgShape(): Path2D;

	abstract onMouseDown(point: Point): void;
	abstract onMouseMove(point: Point): void;
	abstract onMouseUp(point?: Point): void;
}
