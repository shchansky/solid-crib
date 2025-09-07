// ✅ ХОРОШО: Соблюдение OCP - открыт для расширения, закрыт для изменения
//
// 🔓 ОСНОВНАЯ ИДЕЯ OCP:
// 1. ✅ ЗАКРЫТ для изменения - интерфейс и калькулятор не меняются при добавлении новых фигур
// 2. ✅ ОТКРЫТ для расширения - новые фигуры добавляются через реализацию интерфейса Shape
// 3. ✅ ПОЛИМОРФИЗМ - один интерфейс, разные реализации
// 4. ✅ АБСТРАКЦИИ - код работает с интерфейсами, а не с конкретными типами
//
// ПРЕИМУЩЕСТВА:
// 1. ЗАКРЫТ для изменения - интерфейс и калькулятор не меняются при добавлении новых фигур
// 2. ОТКРЫТ для расширения - новые фигуры добавляются через реализацию интерфейса Shape
// 3. Полиморфизм - один интерфейс, разные реализации
// 4. Легкость тестирования - тестируем только новые классы
// 5. Безопасность - нет риска сломать существующий функционал

// ✅ OCP: Базовый интерфейс - ЗАКРЫТ для изменения
// 💡 ПРЕИМУЩЕСТВО: Этот интерфейс никогда не меняется при добавлении новых фигур
// 🎯 РЕЗУЛЬТАТ: Стабильная основа для всех фигур
interface Shape {
    calculateArea(): number;
    calculatePerimeter(): number;
}

// ✅ OCP: Конкретные фигуры - ОТКРЫТЫ для расширения
// 💡 ПРЕИМУЩЕСТВО: Каждый класс реализует интерфейс Shape и может быть добавлен без изменения существующего кода
// 🎯 РЕЗУЛЬТАТ: Легкость добавления новых типов
class Circle implements Shape {
    constructor(private radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    // ✅ OCP: Можем расширить функционал класса
    // 💡 ПРЕИМУЩЕСТВО: Дополнительные методы не нарушают принцип
    // 🎯 РЕЗУЛЬТАТ: Гибкость без изменения интерфейса
    getInfo(): string {
        return `Circle: radius=${this.radius}`;
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
// 💡 ПРЕИМУЩЕСТВО: Просто создаем новый класс, реализующий интерфейс Shape
// 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости соблюдается
class Triangle implements Shape {
    constructor(private base: number, private height: number, private side1: number, private side2: number) {}

    calculateArea(): number {
        return (this.base * this.height) / 2;
    }

    calculatePerimeter(): number {
        return this.base + this.side1 + this.side2;
    }
}

// ✅ OCP: Калькулятор работает с любыми фигурами - ЗАКРЫТ для изменения
// 💡 ПРЕИМУЩЕСТВО: Этот класс НИКОГДА не меняется при добавлении новых фигур!
// 🎯 РЕЗУЛЬТАТ: Он работает с интерфейсом Shape, а не с конкретными типами
class ShapeCalculator {
    // ✅ OCP: Метод работает с абстракцией Shape
    // 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретные типы фигур
    // 🎯 РЕЗУЛЬТАТ: Полиморфизм работает автоматически
    calculate(shapes: Shape[]): {area: number, perimeter: number}[] {
        return shapes.map(shape => ({
            area: shape.calculateArea(),
            perimeter: shape.calculatePerimeter(),
        }));
    }

    // ✅ OCP: Легко добавляем новые методы без изменения существующих
    // 💡 ПРЕИМУЩЕСТВО: Расширяемость без изменения кода
    // 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости соблюдается
    getTotalArea(shapes: Shape[]): number {
        return shapes.reduce((total, shape) => total + shape.calculateArea(), 0);
    }
}

// ✅ OCP: Использование - новые фигуры добавляются без изменения существующего кода
// 💡 ПРЕИМУЩЕСТВО: Калькулятор работает с любыми объектами, реализующими интерфейс Shape
// 🎯 РЕЗУЛЬТАТ: Гибкость и расширяемость
const calculator = new ShapeCalculator();

const _circle = new Circle(5);
const _rectangle = new Rectangle(4, 6);
const _triangle = new Triangle(4, 6, 5, 7);

calculator.calculate([_circle, _rectangle, _triangle]);

// ✅ ДЕМОНСТРАЦИЯ: Легкость добавления новых фигур
// 💡 ПРЕИМУЩЕСТВО: Можно добавить Square без изменения существующего кода
// 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости работает
class Square implements Shape {
    constructor(private side: number) {}
    
    calculateArea(): number {
        return this.side * this.side;
    }
    
    calculatePerimeter(): number {
        return 4 * this.side;
    }
}

// ✅ Новая фигура работает без изменения существующего кода
const _square = new Square(5);
calculator.calculate([_circle, _rectangle, _triangle, _square]);

export {}


