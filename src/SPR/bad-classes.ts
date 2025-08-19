// ❌ ПЛОХО: Нарушение SRP - один метод делает всё для всех фигур
class BadShapeProcessor {
    radius?: number;
    width?: number;
    height?: number;

    constructor(radius?: number, width?: number, height?: number) {
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    // Плохой метод - делает всё для всех фигур
    processShape(shapeType: 'circle' | 'rectangle'): void {
        if (shapeType === 'circle') {
            // Валидация круга
            if (!this.radius || this.radius <= 0) {
                throw new Error('Invalid circle radius');
            }

            // Расчет площади круга
            const area = Math.PI * this.radius * this.radius;
            
            // Расчет периметра круга
            const perimeter = 2 * Math.PI * this.radius; 

        } else if (shapeType === 'rectangle') {
            // Валидация прямоугольника
            if (!this.width || !this.height || this.width <= 0 || this.height <= 0) {
                throw new Error('Invalid rectangle dimensions');
            }

            // Расчет площади прямоугольника
            const area = this.width * this.height;
            
            // Расчет периметра прямоугольника
            const perimeter = 2 * (this.width + this.height);
        }
    }
}

// Использование
const badCircle = new BadShapeProcessor(5);
badCircle.processShape('circle');

const badRectangle = new BadShapeProcessor(undefined, 4, 6);
badRectangle.processShape('rectangle'); 