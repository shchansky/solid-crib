// ❌ ПЛОХО: Нарушение ISP - толстый интерфейс, который заставляет классы реализовывать ненужные методы
//
// 🔀 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ ISP:
// 1. ❌ КЛИЕНТЫ ЗАВИСЯТ ОТ МЕТОДОВ, КОТОРЫЕ НЕ ИСПОЛЬЗУЮТ
//    - Circle вынужден реализовывать getDiagonal(), который ему не нужен
//    - Rectangle вынужден реализовывать getDiametr(), который ему не нужен
//
// 2. ❌ ТОЛСТЫЙ УНИВЕРСАЛЬНЫЙ ИНТЕРФЕЙС
//    - Один интерфейс пытается покрыть все возможные методы
//    - Нарушение принципа единственной ответственности
//
// 3. ❌ ПРИНУДИТЕЛЬНАЯ РЕАЛИЗАЦИЯ НЕНУЖНЫХ МЕТОДОВ
//    - Классы должны реализовывать методы, которые не имеют смысла
//    - Возвращают бессмысленные значения (0, null, undefined)
//
// ПРОБЛЕМЫ:
// 1. Толстый интерфейс - содержит слишком много методов
// 2. Принудительная реализация - классы должны реализовывать ненужные методы
// 3. Нарушение принципа единственной ответственности - интерфейс делает всё
// 4. Сложность тестирования - нужно тестировать ненужные методы
// 5. Нарушение принципа подстановки - классы не могут правильно реализовать все методы

// ❌ НАРУШЕНИЕ ISP: Толстый универсальный интерфейс, который делает всё
// 💡 ЧТО НЕ ТАК: Интерфейс содержит методы, которые не нужны всем реализующим классам
// 🎯 КАК ИСПРАВИТЬ: Разделить на несколько специализированных интерфейсов
interface Shape {
    // ✅ Основные методы для всех фигур - это нормально
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
    
    // ❌ ПРОБЛЕМА: Метод подходит только для круга
    // 💡 ЧТО НЕ ТАК: Rectangle не может иметь диаметр
    // 🎯 РЕШЕНИЕ: Вынести в отдельный интерфейс CircleShape
    getDiametr(): number;

    // ❌ ПРОБЛЕМА: Метод подходит только для прямоугольника
    // 💡 ЧТО НЕ ТАК: Circle не может иметь диагональ
    // 🎯 РЕШЕНИЕ: Вынести в отдельный интерфейс RectangleShape
    getDiagonal(): number;
}

// ❌ НАРУШЕНИЕ ISP: Круг вынужден реализовывать ненужные методы
// 💡 ПРОБЛЕМА: Circle должен реализовывать getDiagonal(), который ему не нужен
// 🎯 РЕЗУЛЬТАТ: Возвращает бессмысленное значение 0
class Circle implements Shape {
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
       return this.radius * 2;
    }

    // ❌ НАРУШЕНИЕ ISP: Круг не может правильно реализовать этот метод, который ему не нужен
    // 💡 ПРОБЛЕМА: Возвращает бессмысленное значение
    // 🎯 РЕЗУЛЬТАТ: Нарушение принципа подстановки Лисков
    getDiagonal() {
        return 0; // ❌ Бессмысленное значение для круга
    }
}

// ❌ ПРОБЛЕМА: Прямоугольник тоже должен реализовывать ненужные методы
// 💡 ПРОБЛЕМА: Rectangle должен реализовывать getDiametr(), который ему не нужен
// 🎯 РЕЗУЛЬТАТ: Возвращает бессмысленное значение 0
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

    // ❌ НАРУШЕНИЕ ISP: Прямоугольник не может правильно реализовать этот метод, который ему не нужен
    // 💡 ПРОБЛЕМА: Возвращает бессмысленное значение
    // 🎯 РЕЗУЛЬТАТ: Нарушение принципа подстановки Лисков
    getDiametr() {
        return 0; // ❌ Бессмысленное значение для прямоугольника
     }
 
     getDiagonal() {
        return Math.sqrt(this.width * this.width + this.height * this.height);
    }
}

// ❌ НАРУШЕНИЕ ISP: Фабрика создает объекты с ненужными полями
// 💡 ПРОБЛЕМА: Каждый объект содержит поля, которые ему не нужны
// 🎯 РЕЗУЛЬТАТ: Избыточность данных и путаница
class CreateShapeFactory {
    // Фабричная функция для круга
    static circle(radius: number) {
        const circle = new Circle(radius);
        return {
            area: circle.getArea(),
            perimeter: circle.getPerimeter(),
            info: circle.getInfo(),
            diameter: circle.getDiametr(),
            diagonal: circle.getDiagonal(), // ❌ Ненужное поле для круга
        };
    }
    
    // Фабричная функция для прямоугольника
    static rectangle(width: number, height: number) {
        const rectangle = new Rectangle(width, height);
        return {
            area: rectangle.getArea(),
            perimeter: rectangle.getPerimeter(),
            info: rectangle.getInfo(),
            diameter: rectangle.getDiametr(), // ❌ Ненужное поле для прямоугольника
            diagonal: rectangle.getDiagonal(),
        };
    }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Избыточность данных
// 💡 ПРОБЛЕМА: Объекты содержат ненужные поля
// 🎯 РЕЗУЛЬТАТ: Путаница и избыточность
const ispBadCircleData = CreateShapeFactory.circle(10);
const ispBadRectangleData = CreateShapeFactory.rectangle(4, 6);

// ❌ ПРОБЛЕМА: Нельзя легко определить, какие поля действительно нужны
// console.log(isBadCircleData.diagonal); // 0 - бессмысленное значение
// console.log(isBadRectangleData.diameter); // 0 - бессмысленное значение

export {}
