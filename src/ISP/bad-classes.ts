// ❌ ПЛОХО: Нарушение ISP - толстый интерфейс, который заставляет классы реализовывать ненужные методы
//
// ПРОБЛЕМЫ:
// 1. Толстый интерфейс - содержит слишком много методов
// 2. Принудительная реализация - классы должны реализовывать ненужные методы
// 3. Нарушение принципа единственной ответственности - интерфейс делает всё
// 4. Сложность тестирования - нужно тестировать ненужные методы
// 5. Нарушение принципа подстановки - классы не могут правильно реализовать все методы

// ❌ НАРУШЕНИЕ ISP: Толстый универсальный интерфейс, который делает всё
interface Shape {
    // Основные методы для всех фигур
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
    
    // Метод подходит только для круга
    getDiametr(): number;

    // Метод подходит только для прямоугольника
    getDiagonal(): number;
}

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
    getDiagonal() {
        return 0;
    }
}

// ❌ ПРОБЛЕМА: Прямоугольник тоже должен реализовывать ненужные методы
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
    getDiametr() {
        return 0;
     }
 
     getDiagonal() {
        return Math.sqrt(this.width * this.width + this.height * this.height);
    }
   
}


// Применение
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
};

const ispBadCircleData = CreateShapeFactory.circle(10);
const ispBadRectangleData = CreateShapeFactory.rectangle(4, 6);

export {}
