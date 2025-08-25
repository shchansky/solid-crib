// ❌ ПЛОХО: Нарушение SRP - один метод делает всё для всех фигур
class ShapeProcessor {
    radius?: number;
    width?: number;
    height?: number;

    constructor(radius?: number, width?: number, height?: number) {
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    // Плохой метод - делает всё для всех фигур
    processShape(shapeType: 'circle' | 'rectangle'): {area: number, perimeter: number} {
        if (shapeType === 'circle') {
            // Валидация круга
            if (!this.radius || this.radius <= 0) {
                throw new Error('Invalid circle radius');
            }

            // Расчет площади круга
            const area = Math.PI * this.radius * this.radius;
            
            // Расчет периметра круга
            const perimeter = 2 * Math.PI * this.radius; 

            return {area, perimeter};

        } else if (shapeType === 'rectangle') {
            // Валидация прямоугольника
            if (!this.width || !this.height || this.width <= 0 || this.height <= 0) {
                throw new Error('Invalid rectangle dimensions');
            }

            // Расчет площади прямоугольника
            const area = this.width * this.height;
            
            // Расчет периметра прямоугольника
            const perimeter = 2 * (this.width + this.height);

            return {area, perimeter};
        }

        throw new Error('Invalid shape type')
    }
}

// Использование
const circleParams = new ShapeProcessor(5).processShape('circle'); 
const rectangleParams = new ShapeProcessor(undefined, 4, 6).processShape('rectangle'); 

export {};