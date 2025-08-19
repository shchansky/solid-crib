// ✅ ХОРОШО: Соблюдение ISP - тонкие интерфейсы, которые содержат только нужные методы
//
// ПРЕИМУЩЕСТВА:
// 1. Тонкие интерфейсы - содержат только необходимые методы
// 2. Добровольная реализация - классы реализуют только нужные интерфейсы
// 3. Соблюдение принципа единственной ответственности - каждый интерфейс отвечает за одну область
// 4. Легкость тестирования - тестируем только нужные методы
// 5. Гибкость - классы могут реализовывать только нужные интерфейсы

// ✅ ISP: Базовый интерфейс для всех фигур - только основные методы
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}

// ✅ ISP: Интерфейс для рисования - только методы рисования
interface Drawable {
    draw(): void;
    draw3D(): void;
    animate(): void;
}

// ✅ ISP: Интерфейс для сохранения - только методы сохранения
interface Saveable {
    saveToFile(): void;
    saveToDatabase(): void;
    exportToPDF(): void;
}

// ✅ ISP: Интерфейс для валидации - только методы валидации
interface Validatable {
    validate(): boolean;
    validateDimensions(): boolean;
    validateColor(): boolean;
}

// ✅ ISP: Интерфейс для трансформации - только методы трансформации
interface Transformable {
    rotate(angle: number): void;
    scale(factor: number): void;
    translate(x: number, y: number): void;
}

// ✅ ISP: Круг реализует только нужные интерфейсы
class Circle implements Shape, Validatable, Transformable {
    constructor(private radius: number) {}

    // Методы интерфейса Shape
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }

    // Методы интерфейса Validatable
    validate(): boolean {
        return this.radius > 0;
    }

    validateDimensions(): boolean {
        return this.radius <= 1000; // Максимальный радиус
    }

    validateColor(): boolean {
        return true; // Круг может быть любого цвета
    }

    // Методы интерфейса Transformable
    rotate(angle: number): void {
        console.log(`Rotating circle by ${angle} degrees...`);
    }

    scale(factor: number): void {
        this.radius *= factor;
        console.log(`Circle scaled by factor ${factor}, new radius: ${this.radius}`);
    }

    translate(x: number, y: number): void {
        console.log(`Circle translated to position (${x}, ${y})`);
    }
}

// ✅ ISP: Прямоугольник реализует только нужные интерфейсы
class Rectangle implements Shape, Drawable, Validatable, Transformable {
    constructor(private width: number, private height: number) {}

    // Методы интерфейса Shape
    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    getInfo(): string {
        return `Rectangle: ${this.width}x${this.height}`;
    }

    // Методы интерфейса Drawable
    draw(): void {
        console.log(`Drawing rectangle with dimensions ${this.width}x${this.height}`);
    }

    draw3D(): void {
        console.log(`Drawing 3D rectangle with dimensions ${this.width}x${this.height}`);
    }

    animate(): void {
        console.log(`Animating rectangle with dimensions ${this.width}x${this.height}`);
    }

    // Методы интерфейса Validatable
    validate(): boolean {
        return this.width > 0 && this.height > 0;
    }

    validateDimensions(): boolean {
        return this.width <= 1000 && this.height <= 1000; // Максимальные размеры
    }

    validateColor(): boolean {
        return true; // Прямоугольник может быть любого цвета
    }

    // Методы интерфейса Transformable
    rotate(angle: number): void {
        console.log(`Rotating rectangle by ${angle} degrees...`);
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
        console.log(`Rectangle scaled by factor ${factor}, new dimensions: ${this.width}x${this.height}`);
    }

    translate(x: number, y: number): void {
        console.log(`Rectangle translated to position (${x}, ${y})`);
    }
}

// ✅ ISP: Треугольник реализует только нужные интерфейсы
class Triangle implements Shape, Saveable, Validatable, Transformable {
    constructor(private side1: number, private side2: number, private side3: number) {}

    // Методы интерфейса Shape
    getArea(): number {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    getPerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }

    getInfo(): string {
        return `Triangle: sides=${this.side1},${this.side2},${this.side3}`;
    }

    // Методы интерфейса Saveable
    saveToFile(): void {
        console.log(`Saving triangle data to file: ${this.getInfo()}`);
    }

    saveToDatabase(): void {
        console.log(`Saving triangle data to database: ${this.getInfo()}`);
    }

    exportToPDF(): void {
        console.log(`Exporting triangle data to PDF: ${this.getInfo()}`);
    }

    // Методы интерфейса Validatable
    validate(): boolean {
        return this.side1 > 0 && this.side2 > 0 && this.side3 > 0;
    }

    validateDimensions(): boolean {
        // Проверка неравенства треугольника
        return this.side1 + this.side2 > this.side3 &&
               this.side2 + this.side3 > this.side1 &&
               this.side1 + this.side3 > this.side2;
    }

    validateColor(): boolean {
        return true; // Треугольник может быть любого цвета
    }

    // Методы интерфейса Transformable
    rotate(angle: number): void {
        console.log(`Rotating triangle by ${angle} degrees...`);
    }

    scale(factor: number): void {
        this.side1 *= factor;
        this.side2 *= factor;
        this.side3 *= factor;
        console.log(`Triangle scaled by factor ${factor}, new sides: ${this.side1},${this.side2},${this.side3}`);
    }

    translate(x: number, y: number): void {
        console.log(`Triangle translated to position (${x}, ${y})`);
    }
}

// ✅ ISP: Функции работают только с нужными интерфейсами

// Функция для расчета свойств - работает только с Shape
function calculateShapeProperties(shape: Shape): void {
    console.log('Calculating shape properties...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
}

// Функция для рисования - работает только с Drawable
function drawShape(drawable: Drawable): void {
    console.log('Drawing shape...');
    drawable.draw();
    drawable.draw3D();
    drawable.animate();
}

// Функция для сохранения - работает только с Saveable
function saveShape(saveable: Saveable): void {
    console.log('Saving shape...');
    saveable.saveToFile();
    saveable.saveToDatabase();
    saveable.exportToPDF();
}

// Функция для валидации - работает только с Validatable
function validateShape(validatable: Validatable): void {
    console.log('Validating shape...');
    console.log('Basic validation:', validatable.validate());
    console.log('Dimensions validation:', validatable.validateDimensions());
    console.log('Color validation:', validatable.validateColor());
}

// Функция для трансформации - работает только с Transformable
function transformShape(transformable: Transformable): void {
    console.log('Transforming shape...');
    transformable.rotate(45);
    transformable.scale(2);
    transformable.translate(10, 20);
}

// Использование - демонстрация правильного применения ISP
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const triangle = new Triangle(3, 4, 5);

console.log('=== Circle (Shape + Validatable + Transformable):');
calculateShapeProperties(circle);
validateShape(circle);
transformShape(circle);

console.log('\n=== Rectangle (Shape + Drawable + Validatable + Transformable):');
calculateShapeProperties(rectangle);
drawShape(rectangle);
validateShape(rectangle);
transformShape(rectangle);

console.log('\n=== Triangle (Shape + Saveable + Validatable + Transformable):');
calculateShapeProperties(triangle);
saveShape(triangle);
validateShape(triangle);
transformShape(triangle); 