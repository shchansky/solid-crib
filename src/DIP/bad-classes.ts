// ❌ ПЛОХО: Нарушение DIP - классы зависят от конкретных реализаций, а не от абстракций
//
// 🔄 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ DIP:
// 1. ❌ ВЫСОКОУРОВНЕВЫЕ МОДУЛИ ЗАВИСЯТ ОТ НИЗКОУРОВНЕВЫХ
//    - BadShapeCalculator (высокоуровневый) зависит от Circle, Rectangle, Triangle (низкоуровневые)
//    - BadShapeCalculator создает конкретные объекты: new Circle(), new Rectangle(), new Triangle()
//
// 2. ❌ НЕ ОБА ТИПА ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Высокоуровневые модули: BadShapeCalculator зависит от FileStorage, DatabaseStorage (конкретные)
//    - Низкоуровневые модули: Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//
// 3. ❌ АБСТРАКЦИИ ЗАВИСЯТ ОТ ДЕТАЛЕЙ (их просто нет!)
//    - Нет интерфейсов Shape, Storage, Display
//    - Все зависимости направлены к конкретным классам
//
// 4. ❌ ДЕТАЛИ НЕ ЗАВИСЯТ ОТ АБСТРАКЦИЙ
//    - Circle, Rectangle, Triangle НЕ реализуют общий интерфейс
//    - FileStorage, DatabaseStorage НЕ реализуют общий интерфейс
//
// ПРОБЛЕМЫ:
// 1. Жесткая связанность - классы зависят от конкретных классов
// 2. Нарушение принципа инверсии зависимостей - зависимости направлены к конкретным реализациям
// 3. Сложность тестирования - нельзя легко заменить зависимости
// 4. Нарушение принципа открытости/закрытости - изменения в зависимостях влияют на основной класс
// 5. Сложность расширения - добавление новых типов требует изменения существующего кода

// ❌ НАРУШЕНИЕ DIP: Конкретные классы для разных типов фигур
// 🔄 ПРОБЛЕМА: Нет общего интерфейса - детали не зависят от абстракций

class Circle {
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
}

class Rectangle {
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
}

interface ShapeData {
    circledata: { radius: number };
    rectangledata: { width: number; height: number };
}


// ❌ НАРУШЕНИЕ DIP: Класс зависит от конкретных реализаций
// 🔄 ПРОБЛЕМА: Высокоуровневый модуль зависит от низкоуровневых
class BadShapeCalculator {
    // ❌ ПРОБЛЕМА: Зависимость от конкретных классов
    // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль зависит от низкоуровневых
    private badCircle: Circle;
    private badRectangle: Rectangle;

    constructor({circledata : {radius}, rectangledata : {width, height}} : ShapeData) {
        // ❌ НАРУШЕНИЕ DIP: Создание конкретных зависимостей внутри класса
        // 🔄 НАРУШЕНИЕ: Высокоуровневый модуль создает низкоуровневые модули и зависит от них
        this.badCircle = new Circle(radius);
        this.badRectangle = new Rectangle(width, height);
    }

    calculateCircleArea(): number {
        return this.badCircle.getArea();
    }

    calculateRectangleArea(): number {
        return this.badRectangle.getArea();
    }
}

export {}

