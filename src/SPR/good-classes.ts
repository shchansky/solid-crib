// ✅ ХОРОШО: Соблюдение SRP - каждый метод делает что-то одно
class ShapeProcessor {
    radius?: number;
    width?: number;
    height?: number;

    constructor(radius?: number, width?: number, height?: number) {
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    // Только валидация круга
    private isValidCircle(): boolean {
        return !!this.radius && this.radius > 0;
    }

    // Только валидация прямоугольника
    private isValidRectangle(): boolean {
        return !!this.width  && !!this.height && 
               this.width > 0 && this.height > 0;
    }

    // Только расчет площади круга
    private calculateCircleArea(): number {
        return Math.PI * this.radius! * this.radius!;
    }

    // Только расчет периметра круга
    private calculateCirclePerimeter(): number {
        return 2 * Math.PI * this.radius!;
    }

    // Только расчет площади прямоугольника
    private calculateRectangleArea(): number {
        return (this.width ?? 0) * (this.height ?? 0);
    }

    // Только расчет периметра прямоугольника
    private calculateRectanglePerimeter(): number {
        return 2 * ((this.width ?? 0) + (this.height ?? 0));
    }

    // Координатор для круга
    public processCircle(): {area: number, perimeter: number} {
        if (!this.isValidCircle()) {
            throw new Error('Invalid circle radius');
        }

        return {area: this.calculateCircleArea() , perimeter: this.calculateCirclePerimeter()};        
    }

    // Координатор для прямоугольника
    public processRectangle(): {area: number, perimeter: number} {
        if (!this.isValidRectangle()) {
            throw new Error('Invalid rectangle dimensions');
        }

        return {area: this.calculateRectangleArea(), perimeter: this.calculateRectanglePerimeter()};        
    }
}

// Использование
const circleParams = new ShapeProcessor(5).processCircle;
const rectangleParams = new ShapeProcessor(undefined, 4, 6).processRectangle;

export {}