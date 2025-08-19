// ✅ ХОРОШО: Соблюдение OCP - открыт для расширения, закрыт для изменения
//
// ПРЕИМУЩЕСТВА:
// 1. ЗАКРЫТ для изменения - интерфейс и калькулятор не меняются при добавлении новых фигур
// 2. ОТКРЫТ для расширения - новые фигуры добавляются через реализацию интерфейса Shape
// 3. Полиморфизм - один интерфейс, разные реализации
// 4. Легкость тестирования - тестируем только новые классы
// 5. Безопасность - нет риска сломать существующий функционал

// Базовый интерфейс - ЗАКРЫТ для изменения
// ✅ OCP: Этот интерфейс никогда не меняется при добавлении новых фигур
interface Shape {
    calculateArea(): number;
    calculatePerimeter(): number;
}

// Конкретные фигуры - ОТКРЫТЫ для расширения
// ✅ OCP: Каждый класс реализует интерфейс Shape и может быть добавлен без изменения существующего кода
class Circle implements Shape {
    constructor(private radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

// ✅ OCP: Легко добавляем новые фигуры БЕЗ изменения существующего кода!
// Просто создаем новый класс, реализующий интерфейс Shape
class Triangle implements Shape {
    constructor(private base: number, private height: number, private side1: number, private side2: number) {}

    calculateArea(): number {
        return (this.base * this.height) / 2;
    }

    calculatePerimeter(): number {
        return this.base + this.side1 + this.side2;
    }
}

// ✅ OCP: И еще одну фигуру - тоже без изменения существующего кода!
class Square implements Shape {
    constructor(private side: number) {}

    calculateArea(): number {
        return this.side * this.side;
    }

    calculatePerimeter(): number {
        return 4 * this.side;
    }
}

// Калькулятор работает с любыми фигурами - ЗАКРЫТ для изменения
// ✅ OCP: Этот класс НИКОГДА не меняется при добавлении новых фигур!
// Он работает с интерфейсом Shape, а не с конкретными типами
class GoodShapeCalculator {
    calculate(shape: Shape): void {
        console.log(`Area: ${shape.calculateArea().toFixed(2)}`);
        console.log(`Perimeter: ${shape.calculatePerimeter().toFixed(2)}`);
    }
}

// ✅ OCP: Использование - новые фигуры добавляются без изменения существующего кода
// Калькулятор работает с любыми объектами, реализующими интерфейс Shape
const calculator = new GoodShapeCalculator();

const _circle = new Circle(5);
const _rectangle = new Rectangle(4, 6);
const _triangle = new Triangle(4, 6, 5, 7);
const _square = new Square(5);

console.log('Circle:');
calculator.calculate(_circle);

console.log('Rectangle:');
calculator.calculate(_rectangle);

console.log('Triangle:');
calculator.calculate(_triangle);

console.log('Square:');
calculator.calculate(_square); 