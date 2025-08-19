// ❌ ПЛОХО: Нарушение ISP - толстый интерфейс, который заставляет классы реализовывать ненужные методы
//
// ПРОБЛЕМЫ:
// 1. Толстый интерфейс - содержит слишком много методов
// 2. Принудительная реализация - классы должны реализовывать ненужные методы
// 3. Нарушение принципа единственной ответственности - интерфейс делает всё
// 4. Сложность тестирования - нужно тестировать ненужные методы
// 5. Нарушение принципа подстановки - классы не могут правильно реализовать все методы

// ❌ НАРУШЕНИЕ ISP: Толстый интерфейс, который делает всё
interface BadShape {
    // Основные методы для всех фигур
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
    
    // Методы для рисования (не нужны для всех фигур)
    draw(): void;
    draw3D(): void;
    animate(): void;
    
    // Методы для сохранения (не нужны для всех фигур)
    saveToFile(): void;
    saveToDatabase(): void;
    exportToPDF(): void;
    
    // Методы для валидации (не нужны для всех фигур)
    validate(): boolean;
    validateDimensions(): boolean;
    validateColor(): boolean;
    
    // Методы для трансформации (не нужны для всех фигур)
    rotate(angle: number): void;
    scale(factor: number): void;
    translate(x: number, y: number): void;
}

// ❌ ПРОБЛЕМА: Круг должен реализовывать методы, которые ему не нужны
class BadCircle implements BadShape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }

    // ❌ НАРУШЕНИЕ ISP: Круг не может правильно реализовать эти методы
    draw(): void {
        console.log('Drawing circle...'); // Пустая реализация
    }

    draw3D(): void {
        console.log('Drawing 3D circle...'); // Пустая реализация
    }

    animate(): void {
        console.log('Animating circle...'); // Пустая реализация
    }

    saveToFile(): void {
        console.log('Saving circle to file...'); // Пустая реализация
    }

    saveToDatabase(): void {
        console.log('Saving circle to database...'); // Пустая реализация
    }

    exportToPDF(): void {
        console.log('Exporting circle to PDF...'); // Пустая реализация
    }

    validate(): boolean {
        return this.radius > 0; // Только этот метод имеет смысл
    }

    validateDimensions(): boolean {
        return true; // Пустая реализация
    }

    validateColor(): boolean {
        return true; // Пустая реализация
    }

    rotate(angle: number): void {
        console.log(`Rotating circle by ${angle} degrees...`); // Пустая реализация
    }

    scale(factor: number): void {
        this.radius *= factor; // Только этот метод имеет смысл
    }

    translate(x: number, y: number): void {
        console.log(`Translating circle to (${x}, ${y})...`); // Пустая реализация
    }
}

// ❌ ПРОБЛЕМА: Прямоугольник тоже должен реализовывать ненужные методы
class BadRectangle implements BadShape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    getInfo(): string {
        return `Rectangle: ${this.width}x${this.height}`;
    }

    // ❌ НАРУШЕНИЕ ISP: Прямоугольник не может правильно реализовать эти методы
    draw(): void {
        console.log('Drawing rectangle...'); // Пустая реализация
    }

    draw3D(): void {
        console.log('Drawing 3D rectangle...'); // Пустая реализация
    }

    animate(): void {
        console.log('Animating rectangle...'); // Пустая реализация
    }

    saveToFile(): void {
        console.log('Saving rectangle to file...'); // Пустая реализация
    }

    saveToDatabase(): void {
        console.log('Saving rectangle to database...'); // Пустая реализация
    }

    exportToPDF(): void {
        console.log('Exporting rectangle to PDF...'); // Пустая реализация
    }

    validate(): boolean {
        return this.width > 0 && this.height > 0; // Только этот метод имеет смысл
    }

    validateDimensions(): boolean {
        return true; // Пустая реализация
    }

    validateColor(): boolean {
        return true; // Пустая реализация
    }

    rotate(angle: number): void {
        console.log(`Rotating rectangle by ${angle} degrees...`); // Пустая реализация
    }

    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor; // Только этот метод имеет смысл
    }

    translate(x: number, y: number): void {
        console.log(`Translating rectangle to (${x}, ${y})...`); // Пустая реализация
    }
}

// ❌ ПРОБЛЕМА: Треугольник тоже должен реализовывать ненужные методы
class BadTriangle implements BadShape {
    constructor(private side1: number, private side2: number, private side3: number) {}

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

    // ❌ НАРУШЕНИЕ ISP: Треугольник не может правильно реализовать эти методы
    draw(): void {
        console.log('Drawing triangle...'); // Пустая реализация
    }

    draw3D(): void {
        console.log('Drawing 3D triangle...'); // Пустая реализация
    }

    animate(): void {
        console.log('Animating triangle...'); // Пустая реализация
    }

    saveToFile(): void {
        console.log('Saving triangle to file...'); // Пустая реализация
    }

    saveToDatabase(): void {
        console.log('Saving triangle to database...'); // Пустая реализация
    }

    exportToPDF(): void {
        console.log('Exporting triangle to PDF...'); // Пустая реализация
    }

    validate(): boolean {
        return this.side1 > 0 && this.side2 > 0 && this.side3 > 0; // Только этот метод имеет смысл
    }

    validateDimensions(): boolean {
        return true; // Пустая реализация
    }

    validateColor(): boolean {
        return true; // Пустая реализация
    }

    rotate(angle: number): void {
        console.log(`Rotating triangle by ${angle} degrees...`); // Пустая реализация
    }

    scale(factor: number): void {
        this.side1 *= factor;
        this.side2 *= factor;
        this.side3 *= factor; // Только этот метод имеет смысл
    }

    translate(x: number, y: number): void {
        console.log(`Translating triangle to (${x}, ${y})...`); // Пустая реализация
    }
}

// Функция, которая использует только базовые методы, но вынуждена работать с толстым интерфейсом
function calculateShapeProperties(shape: BadShape): void {
    console.log('Calculating shape properties...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
    
    // ❌ ПРОБЛЕМА: Функция может случайно вызвать ненужные методы
    // shape.draw(); // Это может сломать логику!
    // shape.saveToDatabase(); // Это может сломать логику!
}

// Использование - демонстрация проблем
const badCircle = new BadCircle(5);
const badRectangle = new BadRectangle(4, 6);
const badTriangle = new BadTriangle(3, 4, 5);

console.log('=== BadCircle:');
calculateShapeProperties(badCircle);

console.log('\n=== BadRectangle:');
calculateShapeProperties(badRectangle);

console.log('\n=== BadTriangle:');
calculateShapeProperties(badTriangle); 