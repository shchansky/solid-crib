// ✅ ХОРОШО: Соблюдение ISP - тонкие интерфейсы, которые содержат только нужные методы
//
// 🔀 ОСНОВНАЯ ИДЕЯ ISP:
// 1. ✅ КЛИЕНТЫ НЕ ЗАВИСЯТ ОТ МЕТОДОВ, КОТОРЫЕ НЕ ИСПОЛЬЗУЮТ
//    - Circle реализует только CircleShape с нужными методами
//    - Rectangle реализует только RectangleShape с нужными методами
//
// 2. ✅ ТОНКИЕ СПЕЦИАЛИЗИРОВАННЫЕ ИНТЕРФЕЙСЫ
//    - Каждый интерфейс отвечает за одну область
//    - Четкое разделение ответственности
//
// 3. ✅ ДОБРОВОЛЬНАЯ РЕАЛИЗАЦИЯ НУЖНЫХ МЕТОДОВ
//    - Классы реализуют только методы, которые имеют смысл
//    - Нет бессмысленных реализаций
//
// ПРЕИМУЩЕСТВА:
// 1. Тонкие интерфейсы - содержат только необходимые методы
// 2. Добровольная реализация - классы реализуют только нужные интерфейсы
// 3. Соблюдение принципа единственной ответственности - каждый интерфейс отвечает за одну область
// 4. Легкость тестирования - тестируем только нужные методы
// 5. Гибкость - классы могут реализовывать только нужные интерфейсы

// ✅ ISP: Базовый интерфейс для всех фигур - только основные методы
// 💡 ПРЕИМУЩЕСТВО: Общие методы для всех фигур
// 🎯 РЕЗУЛЬТАТ: Стабильная основа для всех фигур
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}

// ✅ ISP: Расширенный интерфейс для круга - только методы, специфичные для круга
// 💡 ПРЕИМУЩЕСТВО: Специализированный интерфейс с нужными методами
// 🎯 РЕЗУЛЬТАТ: Circle реализует только то, что ему нужно
interface CircleShape extends Shape {
    getDiametr(): number; // ✅ Только для круга
}

// ✅ ISP: Расширенный интерфейс для прямоугольника - только методы, специфичные для прямоугольника
// 💡 ПРЕИМУЩЕСТВО: Специализированный интерфейс с нужными методами
// 🎯 РЕЗУЛЬТАТ: Rectangle реализует только то, что ему нужно
interface RectangleShape extends Shape {
    getDiagonal(): number; // ✅ Только для прямоугольника
}

// ✅ ISP: Круг реализует только нужные интерфейсы
// 💡 ПРЕИМУЩЕСТВО: Не нужно реализовывать ненужные методы
// 🎯 РЕЗУЛЬТАТ: Чистая и понятная реализация
class Circle implements CircleShape {
    constructor(private radius: number) {}

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }

    getDiametr() {
       return this.radius * 2; // ✅ Осмысленная реализация для круга
    }
}

// ✅ ISP: Прямоугольник реализует только нужные интерфейсы
// 💡 ПРЕИМУЩЕСТВО: Не нужно реализовывать ненужные методы
// 🎯 РЕЗУЛЬТАТ: Чистая и понятная реализация
class Rectangle implements RectangleShape {
    constructor(private width: number, private height: number) {}

    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }

    getInfo() {
        return `Rectangle: ${this.width}x${this.height}`;
    }

    getDiagonal() {
        return Math.sqrt(this.width * this.width + this.height * this.height); // ✅ Осмысленная реализация для прямоугольника
    }
}

// ✅ ISP: Фабричные функции создают объекты только с нужными методами
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Нет избыточности данных
class IspGoodCreateShapeFactory {
     static getCircleData(radius: number) {
        const circle = new Circle(radius);
        return {
            area: circle.getArea(),
            perimeter: circle.getPerimeter(),
            info: circle.getInfo(),
            diameter: circle.getDiametr(), // ✅ Только нужные поля для круга
        };
    }

    static getRectangleData(width: number, height: number) {
        const rectangle = new Rectangle(width, height);
        return {
            area: rectangle.getArea(),
            perimeter: rectangle.getPerimeter(),
            info: rectangle.getInfo(),
            diagonal: rectangle.getDiagonal(), // ✅ Только нужные поля для прямоугольника
        };
    }
}

// ✅ ДЕМОНСТРАЦИЯ ПРЕИМУЩЕСТВ: Нет избыточности данных
// 💡 ПРЕИМУЩЕСТВО: Каждый объект содержит только релевантные поля
// 🎯 РЕЗУЛЬТАТ: Четкая структура данных
const ispGoodCircleData1 = IspGoodCreateShapeFactory.getCircleData(10);
const ispGoodRectangleData1 = IspGoodCreateShapeFactory.getRectangleData(4, 6);

// ✅ ДЕМОНСТРАЦИЯ: Легкость добавления новых типов
// 💡 ПРЕИМУЩЕСТВО: Можно легко добавить Triangle с собственным интерфейсом
// 🎯 РЕЗУЛЬТАТ: Расширяемость без изменения существующих интерфейсов
interface TriangleShape extends Shape {
    getHeight(): number; // ✅ Только для треугольника
}

class Triangle implements TriangleShape {
    constructor(private side1: number, private side2: number, private side3: number) {}
    
    getArea() {
        const s = (this.side1 + this.side2 + this.side3) / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }
    
    getPerimeter() {
        return this.side1 + this.side2 + this.side3;
    }
    
    getInfo() {
        return `Triangle: ${this.side1},${this.side2},${this.side3}`;
    }
    
    getHeight() {
        return (2 * this.getArea()) / this.side1; // ✅ Осмысленная реализация для треугольника
    }
}

export {}





