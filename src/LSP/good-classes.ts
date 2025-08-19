// ✅ ХОРОШО: Соблюдение LSP - подклассы могут заменить базовый класс
//
// ПРЕИМУЩЕСТВА:
// 1. Соблюдение контракта - подклассы выполняют все обещания базового класса
// 2. Предсказуемое поведение - код работает одинаково с любым подклассом
// 3. Истинная подстановка - подклассы являются истинными подтипами
// 4. Легкость тестирования - можно тестировать с любым подклассом
// 5. Полиморфизм - код работает с базовым типом, не зная конкретный подкласс

// Базовый интерфейс - определяет контракт для всех фигур
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}

// ✅ LSP: Rectangle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Rectangle implements Shape {
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

    // ✅ LSP: Дополнительные методы не нарушают контракт
    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}

// ✅ LSP: Circle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Circle implements Shape {
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

    // ✅ LSP: Дополнительные методы не нарушают контракт
    getRadius(): number {
        return this.radius;
    }

    getDiameter(): number {
        return 2 * this.radius;
    }
}

// ✅ LSP: Triangle - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Triangle implements Shape {
    constructor(private side1: number, private side2: number, private side3: number) {}

    getArea(): number {
        // Формула Герона для треугольника
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    getPerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }

    getInfo(): string {
        return `Triangle: sides=${this.side1},${this.side2},${this.side3}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    isEquilateral(): boolean {
        return this.side1 === this.side2 && this.side2 === this.side3;
    }

    isRightAngled(): boolean {
        const sides = [this.side1, this.side2, this.side3].sort((a, b) => a - b);
        return Math.abs(sides[0] * sides[0] + sides[1] * sides[1] - sides[2] * sides[2]) < 0.001;
    }
}

// ✅ LSP: Square - истинный подтип Shape
// Выполняет все обещания интерфейса Shape
class Square implements Shape {
    constructor(private side: number) {}

    getArea(): number {
        return this.side * this.side;
    }

    getPerimeter(): number {
        return 4 * this.side;
    }

    getInfo(): string {
        return `Square: side=${this.side}`;
    }

    // ✅ LSP: Дополнительные методы не нарушают контракт
    getSide(): number {
        return this.side;
    }

    getDiagonal(): number {
        return this.side * Math.sqrt(2);
    }
}

// ✅ LSP: Функция работает с любым подтипом Shape
// Не нужно знать конкретный тип - полиморфизм работает
function processShape(shape: Shape): void {
    console.log('Processing shape...');
    console.log('Info:', shape.getInfo());
    console.log('Area:', shape.getArea().toFixed(2));
    console.log('Perimeter:', shape.getPerimeter().toFixed(2));
}

// ✅ LSP: Функция для множественной обработки
// Работает с массивом любых подтипов Shape
function processShapes(shapes: Shape[]): void {
    shapes.forEach((shape, index) => {
        console.log(`\n--- Shape ${index + 1} ---`);
        processShape(shape);
    });
}

// ✅ LSP: Функция для сравнения фигур
// Работает с любыми подтипами Shape
function compareShapes(shape1: Shape, shape2: Shape): void {
    console.log('Comparing shapes:');
    console.log('Shape 1:', shape1.getInfo());
    console.log('Shape 2:', shape2.getInfo());
    console.log('Area difference:', Math.abs(shape1.getArea() - shape2.getArea()).toFixed(2));
    console.log('Perimeter difference:', Math.abs(shape1.getPerimeter() - shape2.getPerimeter()).toFixed(2));
}

// Использование - демонстрация правильной подстановки
const rectangle = new Rectangle(4, 6);
const circle = new Circle(5);
const triangle = new Triangle(3, 4, 5);
const square = new Square(5);

console.log('=== Individual processing:');
processShape(rectangle);
processShape(circle);
processShape(triangle);
processShape(square);

console.log('\n=== Batch processing:');
processShapes([rectangle, circle, triangle, square]);

console.log('\n=== Shape comparison:');
compareShapes(rectangle, circle);
compareShapes(square, triangle); 