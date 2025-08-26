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
// 3. ✅ АБСТРАКЦИИ НЕ ЗАВИСЯТ ОТ ДЕТАЛЕЙ
//    - Интерфейс Shape не знает о конкретных реализациях
//    - Абстракция стабильна и редко изменяется
//
// 4. ✅ ДЕТАЛИ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Circle и Rectangle реализуют интерфейс Shape
//    - Конкретные классы зависят от абстракции
//
// ПРЕИМУЩЕСТВА:
// 1. Слабая связанность - классы зависят от абстракций
// 2. Легкость тестирования - можно легко заменить зависимости
// 3. Простота расширения - добавление новых типов не требует изменения существующего кода
// 4. Полиморфизм - код работает с любыми объектами, реализующими интерфейс
// 5. Инверсия зависимостей - зависимости направлены к абстракциям

// ✅ DIP: Абстракция (интерфейс) - высокоуровневые модули зависят от неё
// 💡 ПРЕИМУЩЕСТВО: Интерфейс определяет контракт, но не знает о деталях реализации
// 🎯 РЕЗУЛЬТАТ: Стабильная абстракция, которая редко изменяется
interface Shape {
    getArea(): number;
    getInfo(): string;
}

// ✅ DIP: Конкретные реализации - низкоуровневые модули реализуют абстракцию
// 💡 ПРЕИМУЩЕСТВО: Каждый класс реализует интерфейс Shape
// 🎯 РЕЗУЛЬТАТ: Все фигуры можно использовать одинаково через интерфейс
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
// 💡 ПРЕИМУЩЕСТВО: Класс не знает о конкретных типах фигур
// 🎯 РЕЗУЛЬТАТ: Можно работать с любыми объектами, реализующими Shape
class ShapeCalculator {
    // ✅ DIP: Зависимость от абстракции, а не от конкретных классов
    // 💡 ПРЕИМУЩЕСТВО: Зависимости передаются извне (инъекция зависимостей)
    // 🎯 РЕЗУЛЬТАТ: Легко тестировать с мок-объектами
    constructor(private shapes: Shape[]) {}

    // ✅ DIP: Метод работает с абстракцией Shape, а не с конкретными типами
    // 💡 ПРЕИМУЩЕСТВО: Полиморфизм - работает с любыми фигурами
    // 🎯 РЕЗУЛЬТАТ: Не нужно знать конкретный тип фигуры
    calculateAllAreas(): number[] {
        return this.shapes.map(shape => shape.getArea());
    }

    findLargestShape(): Shape | null {
        if (this.shapes.length === 0) return null;
        
        return this.shapes.reduce((largest, current) => {
            return current.getArea() > largest.getArea() ? current : largest;
        });
    }

    // ✅ DIP: Легко добавить новые методы без изменения существующих
    // 💡 ПРЕИМУЩЕСТВО: Расширяемость без изменения кода
    // 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости соблюдается
    getTotalArea(): number {
        return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
    }
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Легкость тестирования
// 💡 ПРЕИМУЩЕСТВО: Можно создать мок-объекты для тестирования
// 🎯 РЕЗУЛЬТАТ: Изолированное тестирование компонентов
class MockShape implements Shape {
    constructor(private area: number, private info: string) {}
    
    getArea(): number { return this.area; }
    getInfo(): string { return this.info; }
}

// Использование - демонстрация правильного применения DIP

// Создание фигур (в реальном приложении это делается через DI контейнер)
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

// ✅ DIP: Высокоуровневый модуль работает с абстракциями
// 💡 ПРЕИМУЩЕСТВО: Не нужно знать конкретные типы
// 🎯 РЕЗУЛЬТАТ: Гибкость и расширяемость
const calculator = new ShapeCalculator([circle, rectangle]);

const largestShape = calculator.findLargestShape();

const areas = calculator.calculateAllAreas();

// ✅ ДЕМОНСТРАЦИЯ: Легкость добавления новых типов
// 💡 ПРЕИМУЩЕСТВО: Можно добавить Triangle без изменения ShapeCalculator
// 🎯 РЕЗУЛЬТАТ: Принцип открытости/закрытости соблюдается
class Triangle implements Shape {
    constructor(private side1: number, private side2: number, private side3: number) {}
    
    getArea(): number {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }
    
    getInfo(): string {
        return `Triangle: ${this.side1},${this.side2},${this.side3}`;
    }
}

// ✅ Новая фигура работает без изменения существующего кода
const triangle = new Triangle(3, 4, 5);
const calculatorWithTriangle = new ShapeCalculator([circle, rectangle, triangle]);

export {};
