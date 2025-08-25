// ✅ ХОРОШО: Соблюдение DIP - классы зависят от абстракций, а не от конкретных реализаций
//
// 🔄 ОСНОВНАЯ ИДЕЯ DIP:
// 1. ✅ ВЫСОКОУРОВНЕВЫЕ МОДУЛИ НЕ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - GoodShapeCalculator зависит от интерфейса Shape (абстракция)
//    - НЕ зависит от конкретных классов Circle, Rectangle
//
// 2. ✅ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые модули: GoodShapeCalculator зависит от Shape
//    - Низкоуровневые модули: Circle, Rectangle реализуют Shape
//
// ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - классы зависят от абстракций
// 2. Легкость тестирования - можно легко заменить зависимости
// 3. Простота расширения - добавление новых типов не требует изменения существующего кода

// ✅ DIP: Абстракция (интерфейс) - высокоуровневые модули зависят от неё
interface Shape {
    getArea(): number;
    getInfo(): string;
}

// ✅ DIP: Конкретные реализации - низкоуровневые модули реализуют абстракцию
class Circle implements Shape {
    constructor(private radius: number) {}

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    getArea(): number {
        return this.width * this.height;
    }

    getInfo(): string {
        return `Rectangle: ${this.width}x${this.height}`;
    }
}

// ✅ DIP: Высокоуровневый модуль зависит от абстракции
class ShapeCalculator {
    // ✅ DIP: Зависимость от абстракции, а не от конкретных классов
    constructor(private shapes: Shape[]) {}

    // ✅ DIP: Метод работает с абстракцией Shape, а не с конкретными типами
    calculateAllAreas(): number[] {
        return this.shapes.map(shape => shape.getArea());
    }

    displayAllInfo(): void {
        this.shapes.forEach(shape => {
            console.log(`${shape.getInfo()} - Area: ${shape.getArea().toFixed(2)}`);
        });
    }

    findLargestShape(): Shape | null {
        if (this.shapes.length === 0) return null;
        
        return this.shapes.reduce((largest, current) => {
            return current.getArea() > largest.getArea() ? current : largest;
        });
    }
}

// Использование - демонстрация правильного применения DIP

// Создание фигур (в реальном приложении это делается через DI контейнер)
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// ✅ DIP: Высокоуровневый модуль работает с абстракциями
const calculator = new ShapeCalculator([circle, rectangle]);

calculator.displayAllInfo();

const largestShape = calculator.findLargestShape();

const areas = calculator.calculateAllAreas();

export {};
