// ✅ ХОРОШО: Соблюдение SRP - каждый метод делает что-то одно
class GoodShapeProcessor {
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
        return this.radius !== undefined && this.radius > 0;
    }

    // Только валидация прямоугольника
    private isValidRectangle(): boolean {
        return this.width !== undefined && this.height !== undefined && 
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
        return this.width! * this.height!;
    }

    // Только расчет периметра прямоугольника
    private calculateRectanglePerimeter(): number {
        return 2 * (this.width! + this.height!);
    }

    // Только сохранение круга
    private saveCircle(area: number, perimeter: number): void {
        console.log(`Saving circle: radius=${this.radius}, area=${area.toFixed(2)}, perimeter=${perimeter.toFixed(2)}`);
    }

    // Только сохранение прямоугольника
    private saveRectangle(area: number, perimeter: number): void {
        console.log(`Saving rectangle: width=${this.width}, height=${this.height}, area=${area}, perimeter=${perimeter}`);
    }

    // Только отображение круга
    private displayCircle(area: number, perimeter: number): void {
        console.log(`Circle: radius=${this.radius} -> Area: ${area.toFixed(2)}, Perimeter: ${perimeter.toFixed(2)}`);
    }

    // Только отображение прямоугольника
    private displayRectangle(area: number, perimeter: number): void {
        console.log(`Rectangle: ${this.width}x${this.height} -> Area: ${area}, Perimeter: ${perimeter}`);
    }

    // Координатор для круга
    public processCircle(): void {
        if (!this.isValidCircle()) {
            throw new Error('Invalid circle radius');
        }

        const area = this.calculateCircleArea();
        const perimeter = this.calculateCirclePerimeter();
        
        this.saveCircle(area, perimeter);
        this.displayCircle(area, perimeter);
    }

    // Координатор для прямоугольника
    public processRectangle(): void {
        if (!this.isValidRectangle()) {
            throw new Error('Invalid rectangle dimensions');
        }

        const area = this.calculateRectangleArea();
        const perimeter = this.calculateRectanglePerimeter();
        
        this.saveRectangle(area, perimeter);
        this.displayRectangle(area, perimeter);
    }
}

// Использование
const goodCircle = new GoodShapeProcessor(5);
goodCircle.processCircle();

const goodRectangle = new GoodShapeProcessor(undefined, 4, 6);
goodRectangle.processRectangle(); 